import React, { memo, useCallback } from "react";
import { useRouter } from "next/router";
import { MdNewReleases } from "react-icons/md";
/**@types */
import Movie from "../../types/Movie";
import TvShow from "../../types/TvShow";

const LIMIT: number = 13;

interface ListProps {
  theme: string;
  items: Array<any>;
}

const toSummary = (text: string) => {
  if (text && text.length > LIMIT) {
    return `${text.slice(0, LIMIT)}...`;
  }
  return text;
};

const List = ({ theme, items }: ListProps) => {
  const router = useRouter();

  const goDetail = useCallback((id: number) => {
    router.push(`/detail/${id}`);
  }, []);

  return (
    <section className="flex flex-col gap-2 my-10 px-3 relative">
      <h3 className="font-bold text-2xl">{theme}</h3>
      <ul className="flex gap-3 overflow-x-scroll">
        {items && items.length
          ? items.map((item) => (
              <li className="poster flex-shrink-0 rounded-md" key={item.id}>
                <img
                  alt="poster"
                  className="cursor-pointer h-4/5  w-full"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                  onClick={() => goDetail(item.id)}
                />
                <h4 className="font-bold text-sm">
                  {toSummary(item.title)}
                  {toSummary(item.name)}
                </h4>
                <h5 className="flex font-bold items-center text-sm">
                  <MdNewReleases className="inline mr-1" />
                  {item.release_date}
                  {item.first_air_date}
                </h5>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export default memo(List);
