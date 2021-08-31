import React, { MouseEvent } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useRef } from "react";

interface ListProps {
  theme: string;
}

const List = ({ theme }: ListProps) => {
  let count: number = 1;

  const refUl = useRef<HTMLUListElement | null>(null);

  useEffect(() => {}, []);

  const slide = (e: MouseEvent<SVGElement>) => {
    const distance = 162 * count * -1;
    console.log(count);
    if (refUl.current) {
      const { style } = refUl.current;
      switch (e.currentTarget.id) {
        case "left":
          count--;
          style.transform = `translateX(${distance}px)`;
          break;
        case "right":
          count++;
          style.transform = `translateX(${distance}px)`;
          break;
      }
      style.transitionDuration = "0.5s";
    }
  };

  return (
    <section className="flex flex-col gap-2 relative p-4">
      <h3 className="font-bold text-2xl pl-2">{theme}</h3>
      <ul ref={refUl} className="flex gap-3 overflow-visible">
        {new Array(10).fill(1).map((item, index) => (
          <li className="poster flex-shrink-0" key={index}>
            <img
              className="cursor-pointer h-4/5 w-full rounded-md"
              loading="lazy"
              src="https://www.themoviedb.org/t/p/w220_and_h330_face/iXbWpCkIauBMStSTUT9v4GXvdgH.jpg"
            />
            <h4>Title</h4>
            <h5>Sub Title</h5>
          </li>
        ))}
      </ul>
      <AiFillCaretLeft
        id="left"
        className="poster_btn left-1"
        onClick={slide}
      />
      <AiFillCaretRight
        id="right"
        className="poster_btn right-1"
        onClick={slide}
      />
    </section>
  );
};

export default List;
