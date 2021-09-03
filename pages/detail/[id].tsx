import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";
import { LineProgressBar } from "@frogress/line";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiFillFire } from "react-icons/ai";

interface DetailProps {
  item: MovieDetail;
}

const Detail = ({ item }: DetailProps) => {
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
      </section>

      <section className="p-1">리뷰</section>
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
  console.log(result.data);

  return {
    props: {
      item: result.data,
    },
  };
};

export default Detail;
