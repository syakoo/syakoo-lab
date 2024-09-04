import { bigStyles } from "./big.css";

type BigProps = {
  children: React.ReactNode;
};

export const Big: React.FC<BigProps> = ({ children }) => {
  return <p className={bigStyles}>{children}</p>;
};
