type ListProps = {
  children: React.ReactNode;
};

export const List: React.FC<ListProps> = ({ children }) => {
  return (
    <ul className="my-100 ml-300 list-disc leading-[1.8] marker:text-text-secondary">
      {children}
    </ul>
  );
};
