import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../wrapper";
/**@components */
import List from "../components/List";
import Searched from "../components/Searched";
/**@types */
import { RootState } from "../reducers/root";
/**@reducers */
import {
  getWhatsPopulars,
  getTrends,
  getMulti,
  getNowPlayings,
  getFreeToWatches,
} from "../reducers/video";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import Videos from "../types/Video";

interface IProps {
  backdropPath: string;
  popular: Videos;
  nowPaying: Videos;
  trend: Videos;
}

const Home: NextPage<IProps> = ({
  backdropPath,
  popular,
  nowPaying,
  trend,
}) => {
  const { multi } = useSelector((root: RootState) => root.video);

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("");

  const inputKeyword = (e: ChangeEvent<HTMLInputElement>): void =>
    setKeyword(() => e.target.value);

  const search = useCallback(
    (): AsyncThunkAction<any, string, {}> => dispatch(getMulti(keyword)),
    [keyword, dispatch]
  );

  useEffect(() => {
    if (!localStorage.getItem("lang")) localStorage.setItem("lang", "ko-KR");
    if (keyword) search();
  }, [keyword, search]);

  return (
    <article className="overflow-x-hidden">
      <Head>
        <title>Home</title>
      </Head>
      <section className="relative">
        <h1 className="absolute animate-reverse-one-ping text-3xl my-4 text-center w-full z-10 md:my-10">
          Video Seeker
        </h1>
        <h2 className="absolute animate-reverse-one-ping text-xl my-14 text-center w-full z-10 md:my-24">
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
            className="focus:outline-none w-4/6 rounded-md p-1 text-black"
            value={keyword}
            onChange={inputKeyword}
          />
          {keyword && <Searched multi={multi!} />}
        </div>
      </section>
      <List theme="What's Popular" videos={popular} />
      <List theme="Now Playing" videos={nowPaying} />
      <List theme="Trend" videos={trend} />
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

    const { whatsPopulars, nowPlayings, trends } = store.getState().video;

    const arr = [
      ...whatsPopulars!.results,
      ...nowPlayings!.results,
      ...trends!.results,
    ];

    const random = Math.floor(Math.random() * arr.length);

    return {
      props: {
        backdropPath: arr[random].backdrop_path,
        popular: whatsPopulars,
        nowPaying: nowPlayings,
        trend: trends,
      },
    };
  }
);

export default Home;
