import { scrapStyles } from "./Scrap.css";

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
    <article className={scrapStyles.root}>
      <div className={scrapStyles.dateWrapper}>
        <time>{updatedAt || createdAt}</time>
        {updatedAt ? <span>(Edited)</span> : null}
      </div>
      <div className={scrapStyles.body}>{children}</div>
    </article>
  );
};
