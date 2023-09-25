// NOTE: レイアウトと UI・機能を混ぜないほうが拡張性としては高いが現状はこれしか使わないのでまとめる。
import type React from "react";
// NOTE: これもやりすぎ
import "@/globalStyle.css";
import "ress";
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
