import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";
import { LineProgressBar } from "@frogress/line";
/**@util */
/**@config */
import { API_KEY } from "../../config.json";
/**@components */
import List from "../../components/List";
import Companies from "../../components/Compaies";
import Reviews from "../../components/Reviews";
/**@styles */
import "react-circular-progressbar/dist/styles.css";
/**@types */
import Videos from "../../types/Video";
/**@reducers */

interface MoviePageProps {
  item: MovieDetail;
  reviews: Array<any>;
  similars: Videos;
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
       relative flex p-1 gap-3 w-full lg:gap-10  2xl:text-white 2xl:p-x5vw 2xl:top-1/2 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2 2xl:-translate-y-1/2 2xl:absolute"
        >
          <img
            className="hidden sm:inline rounded-lg w-60 h-96"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
          />
          <div className="text-center flex flex-col justify-between">
            <h2 className="text-base mb-2 md:text-2xl">
              {item.title}
              <span className="italic">{item.tagline}</span>
            </h2>

            <h3>{item.adult && 19}</h3>
            <h3 className="text-sm mb-2 lg:text-base">{item.overview}</h3>
            <ul className="flex justify-center gap-3 mb-2 text-xs lg:text-sm">
              {item.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <div className="flex gap-3 items-center mb-2">
              <div className="flex flex-col justify-center gap-3 flex-grow">
                <LineProgressBar percent={item.vote_average * 10} />
                <div className="p-4 grid gap-4 grid-cols-auto-150 justify-center">
                <div className="text-center sm:text-left">
                    <strong className="block">Release Date</strong>
                    {item.release_date}
                  </div>
                  <div className="text-center sm:text-left">
                    <strong className="block">Vote Count</strong>
                    {item.vote_count.toLocaleString(navigator.language)}
                  </div>
                  <div className="text-center sm:text-left">
                    <strong className="block">Revenue</strong>
                    {item.revenue.toLocaleString(navigator.language)}
                  </div>
                  <div className="text-center sm:text-left">
                    <strong className="block">Budget</strong>
                    {item.budget.toLocaleString(navigator.language)}
                  </div>
                  <div className="text-center sm:text-left">
                    <strong className="block">Runtime</strong>
                    {item.runtime} Minutes
                  </div>
                  <div className="text-center sm:text-left">
                    <strong className="block">Status</strong>
                    {item.status}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex gap-3 flex-grow text-sm lg:text-base">
              <a href={item.homepage} rel="noreferrer" target="_blank">
                Home Page
              </a>
            </div> */}
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
          <List videos={similars} />
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
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  const reviews = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&page=1`
  );

  const similars = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );

  return {
    props: {
      item: detail.data,
      reviews: reviews.data.results,
      similars: similars.data,
    },
  };
};

export default MoviePage;
