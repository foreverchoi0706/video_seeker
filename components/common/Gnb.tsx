import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
/**@components */
import DarkModeToogle from "../button/DarkModeToogle";
import LaguageTooggle from "../button/LaguageTooggle";

interface LnbProps {
  type: string;
}

const initialHovered = {
  movies: false,
  tvShows: false,
  peoples: false,
};

const Lnb = ({ type }: LnbProps) => {
  return (
    <ul className="absolute w-full bg-white top-9 z-50 text-black">
      {type == "movies" && (
        <>
          <li>인기</li>
          <li>현재 상영중</li>
          <li>개봉 예정</li>
          <li>높은 평점</li>
        </>
      )}
      {type == "tvShows" && (
        <>
          <li>인기</li>
          <li>현재 상영중</li>
          <li>개봉 예정</li>
          <li>높은 평점</li>
        </>
      )}
    </ul>
  );
};

const Gnb = () => {
  const [hovered, setHovered] = useState(initialHovered);

  const enterGnb = (e: React.MouseEvent<HTMLLIElement>) => {
    setHovered({
      ...initialHovered,
      [e.currentTarget.id]: true,
    });
  };

  return (
    <nav className="flex items-center py-3">
      <ul className="flex w-full text-white">
        <li className="relative text-center flex-1">
          <strong
            id="movies"
            className="cursor-pointer"
            onMouseEnter={enterGnb}
          >
            MOVIES
          </strong>
          {hovered.movies && <Lnb type="movies" />}
        </li>
        <li className="relative text-center flex-1">
          <strong
            id="tvShows"
            className="cursor-pointer"
            onMouseEnter={enterGnb}
          >
            TV SHOWS
          </strong>
          {hovered.tvShows && <Lnb type="tvShows" />}
        </li>
        <li className="relative text-center flex-1">
          <strong
            id="peoples"
            className="cursor-pointer"
            onMouseEnter={enterGnb}
          >
            PEOPLES
          </strong>
          {hovered.peoples && <Lnb type="peoples" />}
        </li>
        {/* <li className="flex items-center gap-3">
          <LaguageTooggle />
          <DarkModeToogle />
        </li> */}
      </ul>
    </nav>
  );
};

export default Gnb;
