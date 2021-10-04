import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../wrapper";
import { nanoid } from "nanoid";
/**@components */
import Searched from "../components/Searched";
import Poster from "../components/Poster";
import Remote from "../components/Remote";
/**@types */
import { RootState } from "../reducers/root";
import Videos from "../types/Video";
/**@reducers */
import { getTvShows, searchTvShows } from "../reducers/video";

interface TvShowsPageProps {
  tvShows: Videos;
  div: string;
}

const TvShowsPage: NextPage<any> = ({ tvShows, div }: TvShowsPageProps) => {
  const { searched } = useSelector((root: RootState) => root.video);

  const dispatch = useDispatch();

  const router = useRouter();

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword) search(keyword);
  }, [keyword]);

  const inputKeyword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setKeyword(() => e.target.value),
    []
  );

  const goPage = useCallback(
    (page: number) => router.replace(`/tvShows?page=${page}`),
    []
  );

  const search = async (keyword: string): Promise<any> =>
    dispatch(searchTvShows(keyword));

  return (
    <article className="w-full">
      <Head>
        <title>Tv Shows</title>
      </Head>
      <section className="relative flex justify-center my-4">
        <input
          className="w-2/3 border-2 border-gray-500"
          type="text"
          placeholder="keyword"
          onChange={inputKeyword}
        />
        {keyword && <Searched tvShows={searched} />}
      </section>
      <section className="grid-cols-auto-150 grid w-full gap-4 py-3 justify-center md:grid-cols-auto-235">
        {tvShows.results.map((item) => (
          <Poster key={nanoid()} item={item} div="tvShow" />
        ))}
      </section>
      <Remote list={tvShows} goPage={goPage} />
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;

    await store.dispatch(
      getTvShows({
        page: page!.toString(),
        div: "popular",
      })
    );

    const { tvShows } = store.getState().video;
    return {
      props: {
        tvShows,
        page,
        div: "popular",
      },
    };
  }
);

export default TvShowsPage;
