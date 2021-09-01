import React, { MouseEventHandler, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { FaBeer } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
/**@components */
import DarkModeToogle from "../toggle/DarkModeToogle";

const Lnb = () => {
  return <ul className="absolute bg-white w-full rounded-b-md"></ul>;
};

const Gnb = () => {
  const dispatch = useDispatch();

  const enterGnb = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget.value);
  };

  const search = () => {
    dispatch({
      type: "TEST",
      payload: "test",
    });
  };

  return (
    <nav className="flex w-full py-3 items-center">
      <ul className="flex flex-1">
        <li
          className="relative flex-1 text-center text-white"
          onMouseEnter={enterGnb}
        >
          Movies
          <Lnb />
        </li>
        <li
          className="relative flex-1 text-center text-white"
          onMouseEnter={enterGnb}
        >
          TV Shows
          <Lnb />
        </li>
        <li
          className="relative flex-1 text-center text-white"
          onMouseEnter={enterGnb}
        >
          People
          <Lnb />
        </li>
      </ul>
      <BsSearch
        className="cursor-pointer text-white mx-4 text-xl"
        onClick={search}
      />
    </nav>
  );
};

export default Gnb;
