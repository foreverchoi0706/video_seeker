import React from "react";
import { useRouter } from "next/router";
/**@types */
import Videos from "../types/Video";
import Movies from "../types/Movies";
import TvShows from "../types/TvShows";
import Peoples from "../types/Peoples";

interface SearchedProps {
  multi?: Videos;
  movies?: Movies;
  tvShows?: TvShows;
  peoples?: Peoples;
}

const Searched = ({ multi, movies, tvShows, peoples }: SearchedProps) => {
  const router = useRouter();

  return (
    <div className="absolute w-full flex justify-center z-50 top-7">
      <ul className="bg-white w-4/6 grid grid-cols-auto-75 gap-2 justify-around py-2 rounded-b-md md:grid-cols-auto-150">
        {multi &&
          multi.results.map((item) => (
            <li
              className=""
              key={item.id}
              onClick={() =>
                router.push(
                  `/${item.original_title ? "movie" : "tvShow"}/${item.id}`
                )
              }
            >
              {item.poster_path ? (
                <img
                  alt="poster"
                  className="poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
              ) : (
                <div className="poster bg-gray-50 w-full h-full flex flex-col justify-center items-center text-center text-xs">
                  <strong>{item.original_title}</strong>
                  <strong>{item.name}</strong>
                  <strong>
                    {item.release_date && `(${item.release_date})`}
                  </strong>
                  <strong>
                    {item.first_air_date && `(${item.first_air_date})`}
                  </strong>
                </div>
              )}
            </li>
          ))}
        {movies &&
          movies.results.map((item) => (
            <li key={item.id} onClick={() => router.push(`/movie/${item.id}`)}>
              {item.poster_path ? (
                <img
                  alt="poster"
                  className="poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
              ) : (
                <div className="poster bg-gray-100  w-full h-full flex flex-col justify-center items-center text-center text-xs">
                  <strong>{item.title}</strong>
                  <strong>({item.release_date})</strong>
                </div>
              )}
            </li>
          ))}
        {tvShows &&
          tvShows.results.map((item) => (
            <li key={item.id} onClick={() => router.push(`/tvShow/${item.id}`)}>
              {item.poster_path ? (
                <img
                  alt="poster"
                  className="poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
              ) : (
                <div className="poster bg-gray-100  w-full h-full flex flex-col justify-center items-center text-center text-xs">
                  <strong>{item.name}</strong>
                  <strong>
                    {item.first_air_date && `(${item.first_air_date})`}
                  </strong>
                </div>
              )}
            </li>
          ))}
        {peoples &&
          peoples.results.map((item) => (
            <li key={item.id} onClick={() => router.push(`/people/${item.id}`)}>
              {item.profile_path ? (
                <img
                  alt="poster"
                  className="poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.profile_path}`}
                />
              ) : (
                <div className="poster bg-gray-100  w-full h-full flex flex-col justify-center items-center text-center text-xs">
                  <strong>{item.name}</strong>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Searched;
