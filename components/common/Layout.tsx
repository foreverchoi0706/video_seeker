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
      <header className="bg-black p-0 lg:p-x15vw">
        <Gnb />
      </header>
      <main className="flex p-0 lg:p-x15vw">{children}</main>
      <footer className="bg-black p-0 lg:p-x15vw">
        <Links />
      </footer>
    </>
  );
};

export default Layout;
