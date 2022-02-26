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
import { getMovies, searchMovies } from "../reducers/video";

interface MoviesPageProps {
  movies: Videos;
  div: string;
}

const MoviesPage: NextPage<any> = ({ movies, div }: MoviesPageProps) => {
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
    (page: number) => router.replace(`/movies?page=${page}`),
    []
  );

  const search = async (keyword: string): Promise<any> =>
    dispatch(searchMovies(keyword));

  return (
    <article className="w-full">
      <Head>
        <title>Movies</title>
      </Head>
      <section className="relative flex justify-center my-4">
        <input
          className="w-2/3 border-2 border-gray-500"
          type="text"
          placeholder="keyword"
          onChange={inputKeyword}
        />
        {keyword && <Searched movies={searched} />}
      </section>
      <section className="grid-cols-auto-150 grid w-full gap-4 py-3 justify-center md:grid-cols-auto-235">
        {movies.results.map((item) => (
          <Poster key={nanoid()} item={item} div="movie" />
        ))}
      </section>
      <Remote list={movies} goPage={goPage} />
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;

    await store.dispatch(
      getMovies({
        page: page!.toString(),
        div: "popular",
      })
    );

    const { movies } = store.getState().video;
    return {
      props: {
        movies,
        page,
        div: "popular",
      },
    };
  }
);

export default MoviesPage;
