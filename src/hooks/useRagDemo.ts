"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/components/lang";
import { ragDemo } from "@/content/site";

export type RagChip = { text: string; shown: boolean };
export type RagMessage =
  | { kind: "user"; text: string }
  | { kind: "retrieving"; label: string }
  | { kind: "sources"; chips: RagChip[] }
  | { kind: "bot"; text: string };

export type RagState = { messages: RagMessage[] };

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => (signal.aborted ? reject(new Error("aborted")) : resolve()), ms);
    signal.addEventListener("abort", () => { clearTimeout(id); reject(new Error("aborted")); }, { once: true });
  });

export function useRagDemo(): RagState {
  const { lang } = useLang();
  const [messages, setMessages] = useState<RagMessage[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const d = ragDemo.items[0];
      setMessages([
        { kind: "user", text: d.q[lang] },
        { kind: "sources", chips: d.src.map((s) => ({ text: s, shown: true })) },
        { kind: "bot", text: d.a[lang] },
      ]);
      return;
    }

    const ac = new AbortController();
    const { signal } = ac;
    const set = (m: RagMessage[]) => { if (!signal.aborted) setMessages(m); };

    (async function run() {
      try {
        let i = 0;
        while (!signal.aborted) {
          const d = ragDemo.items[i % ragDemo.items.length];
          const q = d.q[lang];
          const a = d.a[lang];

          // type question
          for (let c = 0; c <= q.length; c++) {
            set([{ kind: "user", text: q.slice(0, c) }]);
            await wait(28, signal);
          }
          await wait(420, signal);
          set([{ kind: "user", text: q }, { kind: "retrieving", label: ragDemo.retrieving[lang] }]);
          await wait(560, signal);

          // reveal chips one by one
          const chips: RagChip[] = d.src.map((s) => ({ text: s, shown: false }));
          for (let k = 0; k < chips.length; k++) {
            await wait(130, signal);
            chips[k] = { ...chips[k], shown: true };
            set([
              { kind: "user", text: q },
              { kind: "retrieving", label: ragDemo.retrieving[lang] },
              { kind: "sources", chips: [...chips] },
            ]);
          }
          await wait(420, signal);

          // type answer (retrieving row removed)
          for (let c = 0; c <= a.length; c++) {
            set([
              { kind: "user", text: q },
              { kind: "sources", chips: [...chips] },
              { kind: "bot", text: a.slice(0, c) },
            ]);
            await wait(15, signal);
          }
          await wait(2800, signal);
          i++;
        }
      } catch {
        /* aborted */
      }
    })();

    return () => ac.abort();
  }, [lang]);

  return { messages };
}
