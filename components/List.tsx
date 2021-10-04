import React, { memo, useCallback } from "react";
import { useRouter } from "next/router";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
/**@types */
import Movies from "../types/Movies";
import TvShows from "../types/TvShows";
import { Cast } from "../types/CombinedCredits";
/**@util */
import { getStyles, toSummary } from "../util";
/**@components */
import ListBtns from "./ListBtns";
import Videos from "../types/Video";

interface ListProps {
  theme?: string;
  movies?: Movies;
  tvShows?: TvShows;
  videos?: Videos;
  cast?: Array<Cast>;
}

const List = ({ theme, movies, tvShows, videos, cast }: ListProps) => {
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
        {movies && movies.results.length
          ? movies.results.map((item) => (
              <li className="relative" key={item.id}>
                <div className="w-52 overflow-hidden rounded-md">
                  <img
                    alt="poster"
                    className="poster h-4/5 w-full "
                    loading="lazy"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    onClick={() => goDetail(item.id, "movie")}
                  />
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
                  {item.title && toSummary(item.title)}
                </h4>
                <h4 className="font-bold my-2 text-sm text-center">
                  {item.release_date}
                </h4>
              </li>
            ))
          : null}
        {tvShows && tvShows.results.length
          ? tvShows.results.map((item) => (
              <li className="relative" key={item.id}>
                <div className="w-52 overflow-hidden rounded-md">
                  <img
                    alt="poster"
                    className="poster h-4/5 w-full "
                    loading="lazy"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    onClick={() => goDetail(item.id, "tvShow")}
                  />
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
                </h4>
                <h4 className="font-bold my-2 text-sm text-center">
                  {item.first_air_date}
                </h4>
              </li>
            ))
          : null}

        {videos && videos.results.length
          ? videos.results.map((item) => (
              <li className="relative" key={item.id}>
                <div className="w-52 overflow-hidden rounded-md">
                  <img
                    alt="poster"
                    className="poster h-4/5 w-full"
                    loading="lazy"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    onClick={() => goDetail(item.id, "tvShow")}
                  />
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
              <li className="relative" key={item.id}>
                <div className="w-52 overflow-hidden rounded-md">
                  <img
                    alt="poster"
                    className="poster h-4/5 w-full "
                    loading="lazy"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    onClick={() => goDetail(item.id)}
                  />
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
