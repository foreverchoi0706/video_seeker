import { useRouter } from "next/router";
import React, { useCallback } from "react";
/**@types */
import Multi from "../../types/Muti";

interface SearchesProps {
  multi : Multi | null;
}

const Searches = ({ multi }: SearchesProps) => {
  
  const router = useRouter();

  const goDetail = useCallback((id: number) => {
    router.push(`/detail/${id}`);
  }, []);

  return (
    <div className="absolute w-full flex justify-center z-50 top-7">
      <ul className="bg-white w-4/6 grid grid-cols-auto-75 gap-2 justify-around py-2 rounded-b-md md:grid-cols-auto-150">
        {multi?.results.length
          ? multi.results.map((item) => (
              <li key={item.id} onClick={() => goDetail(item.id)}>
                {item.poster_path ? (
                  <img
                    alt="poster"
                    className="poster"
                    loading="lazy"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                  />
                ) : (
                  <img
                    className="poster w-full h-full"
                    alt="poster"
                    src="https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg"
                  />
                )}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Searches;
