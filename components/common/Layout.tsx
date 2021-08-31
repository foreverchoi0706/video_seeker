import React, { ReactElement } from "react";
/** @components */
import Gnb from "./Gnb";
import Links from "./Links";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Gnb />
      </header>
      <main>{children}</main>
      <footer>
        <Links />
      </footer>
    </>
  );
};

export default Layout;
