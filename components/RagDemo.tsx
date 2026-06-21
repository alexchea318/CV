"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/components/lang";
import { ragDemo } from "@/content/site";

const userCss =
  "align-self:flex-end;max-width:86%;background:#17150f;color:#f3ebdd;border-radius:14px 14px 4px 14px;padding:9px 13px;font-family:var(--font-sans);font-size:13.5px;line-height:1.45;";
const botCss =
  "align-self:flex-start;max-width:92%;background:rgba(23,21,15,.05);color:#17150f;border-radius:14px 14px 14px 4px;padding:9px 13px;font-family:var(--font-sans);font-size:13.5px;line-height:1.45;";
const chipCss =
  "font-family:var(--font-mono),monospace;font-size:10.5px;color:#8e4ec6;background:rgba(142,78,198,.1);border:1px solid rgba(142,78,198,.28);border-radius:6px;padding:2px 8px;opacity:0;transform:translateY(5px);transition:opacity .3s ease,transform .3s cubic-bezier(.16,1,.3,1);";

const ink = (a: number) => `rgba(23,21,15,${a})`;

/** Hero "live RAG demo": an animated, looping chat that types a question,
 *  retrieves sources, then types an answer. Restarts on language change and
 *  degrades to a single static exchange under prefers-reduced-motion. */
export function RagDemo() {
  const { lang } = useLang();
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mk = (css: string, txt?: string) => {
      const e = document.createElement("div");
      e.style.cssText = css;
      if (txt != null) e.textContent = txt;
      return e;
    };

    if (reduced) {
      const d = ragDemo.items[0];
      thread.innerHTML = "";
      thread.appendChild(mk(userCss, d.q[lang]));
      const sw = mk("display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;");
      d.src.forEach((s) => {
        const c = mk(chipCss, s);
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
        sw.appendChild(c);
      });
      thread.appendChild(sw);
      thread.appendChild(mk(botCss, d.a[lang]));
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        timer = setTimeout(() => (cancelled ? reject(new Error("cancelled")) : resolve()), ms);
      });
    const type = async (node: HTMLElement, text: string, sp: number) => {
      node.textContent = "";
      for (let i = 0; i < text.length; i++) {
        node.textContent += text[i];
        await wait(sp);
      }
    };

    let i = 0;
    (async function run() {
      try {
        while (!cancelled) {
          const d = ragDemo.items[i % ragDemo.items.length];
          thread.innerHTML = "";
          const u = mk(userCss);
          thread.appendChild(u);
          await type(u, d.q[lang], 28);
          await wait(420);
          const rl = mk(
            "align-self:flex-start;display:flex;align-items:center;gap:7px;font-family:var(--font-mono),monospace;font-size:11px;color:rgba(23,21,15,.45);",
          );
          rl.appendChild(mk("width:7px;height:7px;border-radius:50%;background:#8e4ec6;animation:axc-pulse 1s ease-in-out infinite;"));
          rl.appendChild(mk("", ragDemo.retrieving[lang]));
          thread.appendChild(rl);
          await wait(560);
          const sw = mk("display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;");
          thread.appendChild(sw);
          for (const s of d.src) {
            const c = mk(chipCss, s);
            sw.appendChild(c);
            await wait(130);
            c.style.opacity = "1";
            c.style.transform = "translateY(0)";
          }
          await wait(420);
          rl.remove();
          const b = mk(botCss);
          thread.appendChild(b);
          await type(b, d.a[lang], 15);
          await wait(2800);
          i++;
        }
      } catch {
        /* cancelled */
      }
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [lang]);

  return (
    <div
      style={{
        flex: "0 1 410px",
        width: "100%",
        maxWidth: 430,
        background: "rgba(255,253,247,.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${ink(0.12)}`,
        borderRadius: 16,
        padding: "16px 16px 18px",
        boxShadow: "0 24px 60px rgba(23,21,15,.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 13, borderBottom: `1px solid ${ink(0.08)}`, marginBottom: 14 }}>
        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#30a46c" }} />
        <span className="mono" style={{ fontSize: 10.5, letterSpacing: ".07em", color: ink(0.5) }}>{ragDemo.liveLabel}</span>
        <span className="mono" style={{ marginLeft: "auto", fontSize: 10.5, color: ink(0.32) }}>just-ai</span>
      </div>
      <div ref={threadRef} style={{ display: "flex", flexDirection: "column", gap: 11, minHeight: 196 }} />
    </div>
  );
}
