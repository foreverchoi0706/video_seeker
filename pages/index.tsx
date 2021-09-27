import { useState, ChangeEvent, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import wrapper from "../wrapper";
/**@components */
import List from "../components/common/List";
/**@types */
import { RootState } from "../reducers/root";
import Movie from "../types/Movie";
import TvShow from "../types/TvShow";
import { useDispatch, useSelector } from "react-redux";
import Searched from "../components/list/Searched";
/**@reducers */
import {
  getWhatsPopulars,
  getTrends,
  getMulti,
  getNowPlayings,
  getFreeToWatches,
} from "../reducers/video";
import { AsyncThunkAction } from "@reduxjs/toolkit";

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
  const { multi } = useSelector((root: RootState) => root.video);

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (!localStorage.getItem("lang")) localStorage.setItem("lang", "ko-KR");
    if (keyword) search();
  }, [keyword]);

  const inputKeyword = (e: ChangeEvent<HTMLInputElement>): void =>
    setKeyword(() => e.target.value);

  const search = (): AsyncThunkAction<any, string, {}> =>
    dispatch(getMulti(keyword));

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
          {keyword && <Searched multi={multi} />}
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
    await Promise.all([
      store.dispatch(getWhatsPopulars()),
      store.dispatch(getNowPlayings()),
      store.dispatch(getFreeToWatches()),
      store.dispatch(getTrends()),
    ]);

    const { whatsPopulars, freeToWatches, nowPlayings, trends } =
      store.getState().video;

    // const arr = [
    //   ...whatsPopulars!.results,
    //   ...nowPlayings!.results,
    //   ...freeToWatches!.items,
    //   ...trends!.results,
    // ];

    //const random = Math.floor(Math.random() * arr.length);

    // return {
    //   props: {
    //     backdropPath: arr[random].backdrop_path,
    //     popular: whatsPopulars!.results,
    //     nowPaying: nowPlayings!.results,
    //     freeToWatch: freeToWatches!.items,
    //     trend: trends!.results,
    //   },
    // };

    const arr = [
      ...whatsPopulars!.results,
      ...nowPlayings!.results,

      ...trends!.results,
    ];

    const random = Math.floor(Math.random() * arr.length);

    return {
      props: {
        backdropPath: arr[random].backdrop_path,
        popular: whatsPopulars!.results,
        nowPaying: nowPlayings!.results,

        trend: trends!.results,
      },
    };
  }
);

export default Home;
