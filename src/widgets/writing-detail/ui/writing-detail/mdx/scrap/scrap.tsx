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
      className={`${styles.root} rounded-100 bg-background-secondary overflow-hidden p-100`}
    >
      <div className="text-50 text-text-primary flex items-center gap-50">
        <time>{updatedAt || createdAt}</time>
        {updatedAt ? <span>(Edited)</span> : null}
      </div>
      <div className={styles.body}>{children}</div>
    </article>
  );
};
