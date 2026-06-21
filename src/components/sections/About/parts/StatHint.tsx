"use client";

import { useState } from "react";
import styles from "../about.module.scss";

/** Small "?" badge that reveals the full degree name on hover (desktop) or tap. */
export function StatHint({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={styles.hint}>
      <button
        type="button"
        aria-label={text}
        data-cursor
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className={styles.hint__btn}
      >
        ?
      </button>
      {open && (
        <span role="tooltip" className={styles.hint__tip}>
          {text}
        </span>
      )}
    </span>
  );
}
