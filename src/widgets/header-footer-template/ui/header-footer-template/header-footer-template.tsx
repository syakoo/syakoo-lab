import type React from "react";

import { Footer } from "./footer/footer";
import { Header } from "./header/header";

type HeaderFooterTemplateProps = {
  children: React.ReactNode;
};

export const HeaderFooterTemplate: React.FC<HeaderFooterTemplateProps> = ({
  children,
}) => (
  <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]">
    <div className="sticky top-0 z-100">
      <Header />
    </div>
    <div>{children}</div>
    <div>
      <Footer />
    </div>
  </div>
);
