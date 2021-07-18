import React from "react";
import { FaBeer } from "react-icons/fa";
import DarkModeToogle from "../button/DarkModeToogle";

const Lnb = () => {
  return (
    <ul className="absolute bg-white w-full rounded-b-md">
   
    </ul>
  );
};

const Gnb = () => {
  const enterGnb = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <nav className="flex w-full py-3">
      <ul className="flex flex-1">
        <li className="relative flex-1 text-center" onMouseEnter={enterGnb}>
          gnb
          <Lnb />
        </li>
        <li className="relative flex-1 text-center" onMouseEnter={enterGnb}>
          gnb
          <Lnb />
        </li>
        <li className="relative flex-1 text-center" onMouseEnter={enterGnb}>
          gnb
          <Lnb />
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
