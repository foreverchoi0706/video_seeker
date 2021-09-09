import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
/**@components */
import DarkModeToogle from "../button/DarkModeToogle";
import LaguageTooggle from "../button/LaguageTooggle";

const Lnb = () => {
  return <ul className="absolute bg-white w-full rounded-b-md"></ul>;
};

const Gnb = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "TEST",
    });
  });

  const enterGnb = (e: React.MouseEvent<HTMLLIElement>) => {};

  return (
    <nav className="flex items-center p-3 w-full">
      <ul className="flex flex-1 justify-between">
        <li className="relative text-center text-white" onMouseEnter={enterGnb}>
          Movies
          <Lnb />
        </li>
        <li className="relative text-center text-white" onMouseEnter={enterGnb}>
          TV Shows
          <Lnb />
        </li>
        <li className="relative text-center text-white" onMouseEnter={enterGnb}>
          People
          <Lnb />
        </li>
        <li className="flex items-center gap-3">
          <LaguageTooggle />
          <DarkModeToogle />
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
