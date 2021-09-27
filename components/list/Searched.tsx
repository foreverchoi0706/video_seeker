import { useRouter } from "next/router";
import React, { useCallback } from "react";
/**@types */
import Multi from "../../types/Muti";
import Peoples from "../../types/Peoples";

interface SearchedProps {
  multi?: Multi | null;
  peoples?: Peoples | null;
}

const Searched = ({ multi, peoples }: SearchedProps) => {
  const router = useRouter();

  return (
    <div className="absolute w-full flex justify-center z-50 top-7">
      <ul className="bg-white w-4/6 grid grid-cols-auto-75 gap-2 justify-around py-2 rounded-b-md md:grid-cols-auto-150">
        {multi &&
          multi.results.map((item) => (
            <li
              className="h-56"
              key={item.id}
              onClick={() => router.push(`/detail/${item.id}`)}
            >
              {item.poster_path ? (
                <img
                  alt="poster"
                  className="poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
              ) : (
                <div className="poster bg-gray-50 w-full h-full flex flex-col justify-center items-center text-center">
                  <strong>{item.original_title}</strong>
                  <strong>({item.release_date})</strong>
                </div>
              )}
            </li>
          ))}
        {peoples &&
          peoples.results.map((item) => (
            <li
              className="h-56"
              key={item.id}
              onClick={() => router.push(`/peoples/${item.id}`)}
            >
              {item.profile_path ? (
                <img
                  alt="poster"
                  className="poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.profile_path}`}
                />
              ) : (
                <div className="poster bg-gray-100  w-full h-full flex flex-col justify-center items-center text-center">
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
