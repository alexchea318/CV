import styles from "./cursor.module.scss";

/** Custom-cursor DOM markers. Animation is driven by useCursor (via useInteractions). */
export function Cursor() {
  return (
    <>
      <div data-cursor-ring className={styles.cursor__ring} />
      <div data-cursor-dot className={styles.cursor__dot} />
    </>
  );
}
