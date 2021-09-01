import React, { useRef, MouseEvent } from "react";
import { useRouter } from "next/router";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";

const DISTANCE: number = -162;

const LIMIT: number = 13;

const MIN: number = 0;

interface ListProps {
  theme: string;
  items: Array<any>;
}

const toSummary = (text: string) => {
  if (text.length > LIMIT) {
    return `${text.slice(0, LIMIT)}...`;
  }
  return text;
};

const List = ({ theme, items }: ListProps) => {

  const router = useRouter();

  const count = useRef<number>(MIN);

  const refUl = useRef<HTMLUListElement | null>(null);

  const slide = (e: MouseEvent<SVGElement>) => {
    if (refUl.current) {
      const { style } = refUl.current;
      switch (e.currentTarget.id) {
        case "left":
          count.current--;
          break;
        case "right":
          count.current++;
          break;
      }
      style.transform = `translateX(${DISTANCE * count.current}px)`;
      style.transitionDuration = "0.5s";
    }
  };

  const goDetail = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <section className="flex flex-col gap-2 my-10 px-3 relative">
      <h3 className="font-bold text-2xl">{theme}</h3>
      <ul ref={refUl} className="flex gap-3 overflow-visible">
        {items && items.length
          ? items.map((item) => (
              <li className="poster flex-shrink-0" key={item.id}>
                <img
                  className="cursor-pointer h-4/5 w-full rounded-md"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                  onClick={() => goDetail(item.id)}
                />
                <h4 className="font-bold text-sm">{toSummary(item.title)}</h4>
                <h5 className="flex font-bold items-center text-sm">
                  <MdNewReleases className="inline mr-1" />
                  {item.release_date}
                </h5>
              </li>
            ))
          : null}
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
