import { useState, useEffect, ChangeEvent } from "react";
import Head from "next/head";
import axios from "axios";
/**@components */
import List from "../components/common/List";
/**@types */
import Movie from "../types/Movie";
import TvShow from "../types/TvShow";
import { GetStaticProps } from "next";

interface HomeProps {
  backdropPath: string;
  whatsPopular: Array<Movie>;
  freeToWatch: Array<Movie>;
  trend: Array<Movie | TvShow>;
}

const Home = ({
  backdropPath,
  whatsPopular,
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
        <h1 className="absolute animate-reverse-one-ping text-3xl my-10 text-white text-center w-full z-10">Video Seeker</h1>
        <h2 className="absolute animate-reverse-one-ping text-xl my-24 text-white text-center w-full z-10">The Awesome Media Delivery Site</h2>
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
      <List theme="What's Popular" items={whatsPopular} />
      <List theme="Free To Watch" items={freeToWatch} />
      <List theme="Trend" items={trend} />
    </article>
  );
};

export const getStaticProps = async () => {
  const whatsPopular = await axios.get(
    "https://api.themoviedb.org/3/list/1?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
  );
  const freeToWatch = await axios.get(
    "https://api.themoviedb.org/3/list/2?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
  );
  const trend = await axios.get(
    "https://api.themoviedb.org/3/trending/all/day?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
  );

  const arr = [
    ...whatsPopular.data.items,
    ...freeToWatch.data.items,
    ...trend.data.results,
  ];
  const random = Math.floor(Math.random() * arr.length);

  return {
    props: {
      backdropPath: arr[random].backdrop_path,
      whatsPopular: whatsPopular.data.items,
      freeToWatch: freeToWatch.data.items,
      trend: trend.data.results,
    },
  };
};

export default Home;
