import styles from "./scrap.module.css";

type ScrapProps = {
  createdAt: string;
  updatedAt?: string;
  children: React.ReactNode;
};

export const Scrap: React.FC<ScrapProps> = ({
  children,
  createdAt,
  updatedAt,
}) => {
  return (
    <article
      className={`${styles.root} overflow-hidden rounded-100 bg-background-secondary p-100`}
    >
      <div className="flex items-center gap-50 text-50 text-text-primary">
        <time>{updatedAt || createdAt}</time>
        {updatedAt ? <span>(Edited)</span> : null}
      </div>
      <div className={styles.body}>{children}</div>
    </article>
  );
};
