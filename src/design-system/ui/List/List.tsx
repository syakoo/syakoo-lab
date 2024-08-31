import { listStyles } from "./List.css";

type ListProps = {
  children: React.ReactNode;
};

export const List: React.FC<ListProps> = ({ children }) => {
  return <ul className={listStyles.root}>{children}</ul>;
};
