import { useState, ChangeEvent } from "react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { wrapper } from "./_app";
import axios from "axios";
/**@components */
import List from "../components/common/List";
/**@types */
import Movie from "../types/Movie";
import TvShow from "../types/TvShow";

interface HomeProps {
  backdropPath: string;
  popular: Array<Movie>;
  nowPaying: Array<Movie>;
  freeToWatch: Array<Movie>;
  trend: Array<Movie | TvShow>;
}

const Home: NextPage<any> = ({
  backdropPath,
  popular,
  nowPaying,
  freeToWatch,
  trend,
}: HomeProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value);
  };

  return (
    <article className="overflow-x-hidden">
      <Head>
        <title>Home</title>
      </Head>
      <section className="relative">
        <h1 className="absolute animate-reverse-one-ping text-3xl my-4 text-white text-center w-full z-10 md:my-10">
          Video Seeker
        </h1>
        <h2 className="absolute animate-reverse-one-ping text-xl my-14 text-white text-center w-full z-10 md:my-24">
          The Awesome Media Delivery Site
        </h2>
        <img
          alt="head_img"
          className="filter brightness-50"
          loading="eager"
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdropPath}`}
        />

        <div className="absolute bottom-5 w-full flex flex-col items-center">
          <input
            type="text"
            className="focus:outline-none w-4/6 rounded-md p-1"
            value={keyword}
            onChange={handleChange}
          />
        </div>
      </section>
      <List theme="What's Popular" items={popular} />
      <List theme="Now Playing" items={nowPaying} />
      <List theme="Free To Watch" items={freeToWatch} />
      <List theme="Trend" items={trend} />
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const popular = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR&page=1`
    );
    const nowPaying = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR&page=1"
    );
    const freeToWatch = await axios.get(
      "https://api.themoviedb.org/3/list/2?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
    );
    const trend = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
    );

    const arr = [
      ...popular.data.results,
      ...nowPaying.data.results,
      ...freeToWatch.data.items,
      ...trend.data.results,
    ];

    const random = Math.floor(Math.random() * arr.length);
    return {
      props: {
        backdropPath: arr[random].backdrop_path,
        popular: popular.data.results,
        nowPaying: nowPaying.data.results,
        freeToWatch: freeToWatch.data.items,
        trend: trend.data.results,
      },
    };
  }
);

export default Home;
