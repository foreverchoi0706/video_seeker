import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../wrapper";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
/**@components */
import Searched from "../components/Searched";
/**@types */
import { RootState } from "../reducers/root";
import Peoples from "../types/Peoples";
/**@reducers */
import { getPeoples, searchPeoples } from "../reducers/video";
/**@util */
import { MAX, getNav } from "../util";

interface MoviesPageProps {
  peoples: Peoples;
  page: number;
}

const MoviesPage: NextPage<any> = ({ peoples, page }: MoviesPageProps) => {
  const { searchedPeoples } = useSelector((root: RootState) => root.video);

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

  const search = async (keyword: string): Promise<any> =>
    dispatch(searchPeoples(keyword));

  const goPage = useCallback(
    (page: number) => router.replace(`/peoples?page=${page}`),
    []
  );

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
        {keyword && <Searched peoples={searchedPeoples} />}
      </section>
      <section className="grid-cols-auto-150 grid w-full gap-4 py-3 justify-center md:grid-cols-auto-235">
        {peoples!.results.map((item) => (
          <div
            key={item.id}
            className="shadow-md rounded-b-md"
            onClick={() => router.push(`/people/${item.id}`)}
          >
            <div className="overflow-hidden rounded-t-md">
              {item.profile_path ? (
                <img
                  loading="lazy"
                  className="poster"
                  src={`https://www.themoviedb.org/t/p/w235_and_h235_face/${item.profile_path}`}
                />
              ) : (
                <img
                  loading="lazy"
                  className="poster"
                  src="https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
                />
              )}
            </div>
            <strong className="block text-center">{item.name}</strong>
          </div>
        ))}
      </section>
      <section className="flex justify-center items-center gap-2 my-4">
        {peoples!.page >= MAX && (
          <button
            onClick={() => goPage(1)}
            className="border-2 border-gray-500 rounded-md px-2 text-sm"
          >
            1..
          </button>
        )}
        {peoples!.page > 1 && (
          <GrFormPrevious
            className="cursor-pointer"
            onClick={() => goPage(+page - 1)}
          />
        )}
        {getNav(peoples!.page, peoples!.total_pages).map((item, index) => (
          <button
            key={index}
            onClick={() => goPage(item + 1)}
            className={`${
              item + 1 == peoples!.page && "font-bold underline"
            } border-2 border-gray-500 rounded-md px-2 text-sm`}
          >
            {item + 1}
          </button>
        ))}
        <GrFormNext
          className="cursor-pointer"
          onClick={() => goPage(+page + 1)}
        />
        <button
          onClick={() => goPage(500)}
          className="border-2 border-gray-500 rounded-md px-2 text-sm"
        >
          ..500
        </button>
      </section>
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;

    await store.dispatch(getPeoples(page!.toString()));

    const { peoples } = store.getState().video;
    return {
      props: {
        peoples,
        page,
      },
    };
  }
);

export default MoviesPage;
