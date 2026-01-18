type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li className="marker:text-text-secondary">{children}</li>;
};
