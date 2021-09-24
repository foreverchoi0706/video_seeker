import { useState, ChangeEvent, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { wrapper } from "./_app";
import axios, { AxiosResponse } from "axios";
/**@config */
import { API_KEY } from "../config.json";
/**@components */
import List from "../components/common/List";
/**@types */
import Movie from "../types/Movie";
import TvShow from "../types/TvShow";
import { useDispatch } from "react-redux";
import Searches from "../components/list/Searches";
/**@reducers */
import { GET_TREND } from "../reducers/video";

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
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("");

  const [res, setRes] = useState<Array<Movie> | null>([]);

  useEffect(() => {
    if (keyword) search();
  }, [keyword]);

  const inputKeyword = (e: ChangeEvent<HTMLInputElement>): void =>
    setKeyword(() => e.target.value);

  const search = async (): Promise<any> => {
    dispatch({
      type: "SEARCH",
      payload: keyword,
    });
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    );
    console.log(res);

    setRes(res?.data.results);
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

        <div className="absolute bottom-5 w-full flex flex-col items-center justify-center">
          <input
            type="text"
            className="focus:outline-none w-4/6 rounded-md p-1"
            value={keyword}
            onChange={inputKeyword}
          />
          {keyword && <Searches items={res} />}
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
