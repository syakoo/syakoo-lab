type BigProps = {
  children: React.ReactNode;
};

export const Big: React.FC<BigProps> = ({ children }) => {
  return <p className="my-300 font-bold text-400">{children}</p>;
};
