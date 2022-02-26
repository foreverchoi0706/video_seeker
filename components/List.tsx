import React, { memo, useCallback } from "react";
import { useRouter } from "next/router";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { RiMovieLine } from "react-icons/ri";
/**@types */
import { Cast } from "../types/CombinedCredits";
/**@util */
import { getStyles, toSummary } from "../util";
/**@components */
import ListBtns from "./ListBtns";
import Videos from "../types/Video";
import { nanoid } from "nanoid";

interface ListProps {
  theme?: string;
  videos?: Videos;
  cast?: Array<Cast>;
}

const List = ({ theme, videos, cast }: ListProps) => {
  const router = useRouter();

  const goDetail = useCallback((id: number, div?: string) => {
    router.push(`/${div}/${id}`);
  }, []);

  return (
    <section className="flex flex-col gap-2 my-10 px-3 relative">
      <h3 className="flex font-bold text-lg items-center md:text-2xl">
        {theme}
        <ListBtns theme={theme!} />
      </h3>
      <ul className="flex gap-3 overflow-x-scroll">
        {videos && videos.results.length
          ? videos.results.map((item) => (
              <li className="relative" key={nanoid()}>
                <div className="w-52 overflow-hidden rounded-md">
                  {item.poster_path ? (
                    <img
                      alt="poster"
                      className="poster"
                      loading="lazy"
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                      onClick={() =>
                        goDetail(item.id, item.title ? "movie" : "tvShow")
                      }
                    />
                  ) : (
                    <RiMovieLine
                      style={{
                        height: "310px",
                      }}
                      className=" poster w-full"
                      color="darkgrey"
                      onClick={() =>
                        goDetail(item.id, item.title ? "movie" : "tvShow")
                      }
                    />
                  )}
                </div>
                <div className="absolute -right-3 text-white bottom-12 w-10 h-10 z-10">
                  <CircularProgressbarWithChildren
                    background={true}
                    value={item.vote_average}
                    maxValue={10}
                    styles={getStyles(item.vote_average)}
                  >
                    <strong>{item.vote_average.toFixed(1)}</strong>
                  </CircularProgressbarWithChildren>
                </div>
                <h4 className="font-bold my-2 text-sm text-center">
                  {item.name && toSummary(item.name)}
                  {item.title && toSummary(item.title)}
                </h4>
                <h4 className="font-bold my-2 text-sm text-center">
                  {item.first_air_date}
                  {item.release_date}
                </h4>
              </li>
            ))
          : null}

        {cast && cast.length
          ? cast.map((item) => (
              <li className="relative" key={nanoid()}>
                <div className="w-52 overflow-hidden rounded-md">
                  {item.poster_path ? (
                    <img
                      alt="poster"
                      className="poster"
                      loading="lazy"
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                      onClick={() =>
                        goDetail(item.id, item.title ? "movie" : "tvShow")
                      }
                    />
                  ) : (
                    <RiMovieLine
                      style={{
                        height: "310px",
                      }}
                      className=" poster w-full"
                      color="darkgrey"
                      onClick={() =>
                        goDetail(item.id, item.title ? "movie" : "tvShow")
                      }
                    />
                  )}
                </div>
                <div className="absolute -right-3 text-white bottom-12 w-10 h-10 z-10">
                  <CircularProgressbarWithChildren
                    background={true}
                    value={item.vote_average}
                    maxValue={10}
                    styles={getStyles(item.vote_average)}
                  >
                    <strong>{item.vote_average.toFixed(1)}</strong>
                  </CircularProgressbarWithChildren>
                </div>
                <h4 className="font-bold my-2 text-sm text-center">
                  {item.name && toSummary(item.name)}
                  {item.title && toSummary(item.title)}
                </h4>
                <h4 className="font-bold my-2 text-sm text-center">
                  {item.first_air_date}
                  {item.release_date}
                </h4>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export default memo(List);
