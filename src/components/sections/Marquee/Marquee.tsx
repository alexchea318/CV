import { marquee } from "@/content/site";
import styles from "./marquee.module.scss";

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden || undefined} className={styles.marquee__row}>
      {marquee.map((phrase, i) => (
        <span key={i} className={styles.marquee__cell}>
          <span>{phrase}</span>
          <span
            className={i % 2 === 0 ? styles["marquee__star--violet"] : styles["marquee__star--red"]}
          >
            ✳
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.marquee__track}>
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
