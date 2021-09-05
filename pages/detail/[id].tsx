import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";
import { LineProgressBar } from "@frogress/line";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiFillFire } from "react-icons/ai";
import { dateToString, getStyles } from "../../utilities/common";

interface DetailProps {
  item: MovieDetail;
  reviews: Array<any>;
}

const Detail = ({ item, reviews }: DetailProps) => {
  const router = useRouter();
  return (
    <article>
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
        static flex p-1 gap-3 lg:gap-10 lg:text-white lg:p-x5vw  lg:top-1/2  lg:left-1/2  lg:transform  lg:-translate-x-1/2  lg:-translate-y-1/2 w-full lg:absolute"
        >
          <img
            className="rounded-lg w-60 h-96"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
          />
          <div className="flex flex-col justify-between">
            <h2 className="text-base mb-2 md:text-2xl">
              {item.title} ({item.release_date})<br />
              <span className="italic">{item.tagline}</span>
            </h2>

            <h3>{item.adult && 19}</h3>
            <h3 className="text-xs mb-2 lg:text-sm">{item.overview}</h3>
            <ul className="flex gap-3 mb-2 text-xs lg:text-sm">
              {item.genres.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
            <ul className="flex gap-3 items-center">
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
            </ul>
          </div>
        </div>
      </section>

      <section className="p-1">
        <ul className=" grid grid-cols-3 justify-items-center gap-3">
          {item.production_companies
            .filter((item) => item.logo_path)
            .map((item) => (
              <li key={item.id}>
                <img
                  alt={item.name}
                  src={`https://www.themoviedb.org/t/p/h60/${item.logo_path}`}
                />
              </li>
            ))}
        </ul>
      </section>

      <section className="p-1">
        <h2></h2>
        <ul className="h-96 overflow-y-scroll rounded-md ">
          {reviews.map((item) => (
            <li key={item.id} className="p-3 my-3 ">
              <h3 className="font-bold">
                {item.author} -<span>{dateToString(item.created_at)}</span>
              </h3>
              <div>{item.content}</div>
              <div>{item.author_details.rating}</div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR`
  );

  const reviews = await axios.get(
    `https://api.themoviedb.org/3/movie/283995/reviews?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&page=1`
  );

  return {
    props: {
      item: result.data,
      reviews: reviews.data.results,
    },
  };
};

export default Detail;
