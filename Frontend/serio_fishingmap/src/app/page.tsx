import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/map"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Map
          </a>
          <a
            href="/form"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            form
          </a>
        </div>
      </main>
    </div>
  );
}
