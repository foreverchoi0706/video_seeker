import Gnb from "./Gnb";
import React, { ReactElement } from "react";
import { FaBlogger, FaGithub } from "react-icons/fa";
import { GiHumanTarget } from "react-icons/gi";

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <header>
        <Gnb />
      </header>
      <main>{children}</main>
      <footer className="py-3 bg-red-33 min-">
        <ul className="flex justify-around text-center">
          <li className="cursor-pointer">
            <FaGithub size={33} onClick={() => (window.location.href = "")} />
          </li>
          <li className="cursor-pointer">
            <FaBlogger size={33} onClick={() => (window.location.href = "")} />
          </li>
          <li className="cursor-pointer">
            <GiHumanTarget
              size={33}
              onClick={() => (window.location.href = "")}
            />
          </li>
        </ul>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
