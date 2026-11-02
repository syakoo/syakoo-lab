type BigProps = {
  children: React.ReactNode;
};

export const Big: React.FC<BigProps> = ({ children }) => {
  return <p className="text-400 my-300 font-bold">{children}</p>;
};
