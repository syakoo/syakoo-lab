import type React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import {
  containerFooterStyle,
  containerHeaderStyle,
  containerMainStyle,
  containerStyle,
} from "./HeaderFooterTemplate.css";

type HeaderFooterTemplateProps = {
  children: React.ReactNode;
};

export const HeaderFooterTemplate: React.FC<HeaderFooterTemplateProps> = ({
  children,
}) => (
  <div className={containerStyle}>
    <div className={containerHeaderStyle}>
      <Header />
    </div>
    <div className={containerMainStyle}>{children}</div>
    <div className={containerFooterStyle}>
      <Footer />
    </div>
  </div>
);
