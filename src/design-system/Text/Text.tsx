import React from "react";
import { textStyle } from "./Text.css";

export const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className={textStyle}>{children}</p>;
};
