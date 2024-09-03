import { listStyles } from "./list.css";

type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li className={listStyles.item}>{children}</li>;
};
