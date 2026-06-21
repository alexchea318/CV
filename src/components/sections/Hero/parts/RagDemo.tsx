"use client";

import { useRagDemo } from "@/hooks/useRagDemo";
import { ragDemo } from "@/content/site";
import { cx } from "@/lib/cx";
import styles from "./rag-demo.module.scss";

/** Hero "live RAG demo": an animated chat driven declaratively by useRagDemo. */
export function RagDemo() {
  const { messages } = useRagDemo();
  return (
    <div className={styles.rag}>
      <div className={styles.rag__head}>
        <span className={styles.rag__dot} />
        <span className={styles.rag__live}>{ragDemo.liveLabel}</span>
        <span className={styles.rag__src}>just-ai</span>
      </div>
      <div className={styles.rag__thread}>
        {messages.map((m, i) => {
          if (m.kind === "user") return <div key={i} className={styles["msg--user"]}>{m.text}</div>;
          if (m.kind === "bot") return <div key={i} className={styles["msg--bot"]}>{m.text}</div>;
          if (m.kind === "retrieving") {
            return (
              <div key={i} className={styles.rag__retrieving}>
                <span className={styles.rag__pulse} />
                {m.label}
              </div>
            );
          }
          return (
            <div key={i} className={styles.rag__sources}>
              {m.chips.map((c, j) => (
                <span key={j} className={cx(styles.rag__chip, c.shown && styles["rag__chip--shown"])}>
                  {c.text}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
