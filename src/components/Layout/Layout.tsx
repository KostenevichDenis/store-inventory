import React from "react";

import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer/Footer";


type LayoutProps = {
	children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};
