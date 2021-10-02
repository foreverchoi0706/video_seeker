import { useRouter } from "next/router";
import { useCallback } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
/**@types */
import { Movie } from "../types/Movies";
import { TvShow } from "../types/TvShows";
/**@util */
import { getStyles, toSummary } from "../util";

interface PosterProps {
  // item: Movie | TvShow;
  item: any;
}

const Poster = ({ item }: PosterProps) => {
  const router = useRouter();

  const goDetail = useCallback((id: number) => {
    router.push(`/detail/${id}`);
  }, []);

  return (
    <div className="relative shadow-xl rounded-md">
      <div className="m-2 overflow-hidden rounded-md">
        <img
          alt="poster"
          className="poster h-4/5 w-full "
          loading="lazy"
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
          onClick={() => goDetail(item.id)}
        />
      </div>
      <div className="absolute -right-1 text-white bottom-12 w-10 h-10 z-10">
        <CircularProgressbarWithChildren
          background={true}
          value={item.vote_average}
          maxValue={10}
          styles={getStyles(item.vote_average)}
        >
          <strong>{item.vote_average.toFixed(1)}</strong>
        </CircularProgressbarWithChildren>
      </div>
      <h5 className="font-bold my-2 text-sm text-center">
        {item.title ? toSummary(item.title) : ""}
        {item.name ? toSummary(item.name) : ""}
      </h5>
      <h5 className="font-bold my-2 text-sm text-center">
        {item.release_date}
        {item.first_air_date}
      </h5>
    </div>
  );
};

export default Poster;
