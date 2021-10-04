import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";
import { LineProgressBar } from "@frogress/line";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { AiFillFire } from "react-icons/ai";
/**@util */
import { getStyles } from "../../util";
/**@config */
import { API_KEY } from "../../config.json";
/**@components */
import List from "../../components/List";
import Companies from "../../components/Compaies";
import Reviews from "../../components/Reviews";
/**@styles */
import "react-circular-progressbar/dist/styles.css";
/**@types */
import Movies from "../../types/Movies";
/**@reducers */
import {} from "../../reducers/video";

interface MoviePageProps {
  item: MovieDetail;
  reviews: Array<any>;
  similars: Movies;
}

const MoviePage = ({ item, reviews, similars }: MoviePageProps) => {
  return (
    <article className="overflow-x-hidden">
      <Head>
        <title>{item.title}</title>
      </Head>
      <section className="relative">
        <img
          alt="head_img"
          className="filter brightness-50"
          loading="lazy"
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path}`}
        />
        <div
          className="
        static flex p-1 gap-3 w-full lg:gap-10 lg:text-white lg:p-x5vw lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:absolute"
        >
          <img
            className="rounded-lg w-60 h-96"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
          />
          {/* <div className="absolute -bottom-20 w-11/12 right-0 rounded-md bg-white flex flex-col sm:static sm:bg-none"> */}
          <div className="flex flex-col">
            <h2 className="text-base mb-2 md:text-2xl">
              {item.title} ({item.release_date || "예정"})<br />
              <span className="italic">{item.tagline}</span>
            </h2>

            <h3>{item.adult && 19}</h3>
            <h3 className="text-xs mb-2 lg:text-sm">{item.overview}</h3>
            <ul className="flex gap-3 mb-2 text-xs lg:text-sm">
              {item.genres.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
            <div className="flex gap-3 items-center mb-2">
              <div className="w-16 h-16">
                <CircularProgressbarWithChildren
                  value={item.vote_average}
                  maxValue={10}
                  styles={getStyles(item.vote_average)}
                >
                  <AiFillFire />
                  <strong>{item.vote_average}</strong>
                </CircularProgressbarWithChildren>
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                <LineProgressBar percent={item.vote_count} />
                <LineProgressBar percent={item.vote_average} />
                <LineProgressBar percent={item.revenue} />
              </div>
            </div>

            <div className="flex gap-3 flex-grow text-sm lg:text-base">
              <a href={item.homepage} rel="noreferrer" target="_blank">
                공식 홈페이지
              </a>
            </div>
          </div>
        </div>
      </section>

      {item.production_companies.length ? (
        <section className="my-6 border-gray-500 border-2 py-4">
          <Companies items={item.production_companies} />
        </section>
      ) : null}

      {reviews.length ? (
        <section className="my-6 border-gray-500 border-2">
          <Reviews items={reviews} />
        </section>
      ) : null}

      {similars.results.length ? (
        <section className="my-6 border-gray-500 border-2">
          <List movies={similars} />
        </section>
      ) : null}
    </article>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const detail = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
  );

  const reviews = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&page=1`
  );

  const similars = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`
  );

  console.log(similars);

  return {
    props: {
      item: detail.data,
      reviews: reviews.data.results,
      similars: similars.data,
    },
  };
};

export default MoviePage;
