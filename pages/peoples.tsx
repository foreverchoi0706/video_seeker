import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../wrapper";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
/**@types */
import { RootState } from "../reducers/root";
import Peoples from "../types/Peoples";
/**@reducers */
import { getPeoples, searchPeoples } from "../reducers/video";
import Searched from "../components/list/Searched";

const MAX = 6;

const getNav = (page: number, total_pages: number): Array<number> => {
  const half = MAX / 2;
  if (page - half <= 0) {
    return Array.of(...new Array(MAX).keys());
  } else if (page >= total_pages - MAX) {
    return Array.of(...new Array(MAX).keys());
  } else {
    return new Array(MAX).fill(page).map((item, index) => {
      if (index + 1 == half) {
        return item;
      } else if (index + 1 < half) {
        return item + index - (half + 1);
      } else {
        return item + index - (half + 1);
      }
    });
  }
};

interface PeoplesProps {
  peoples: Peoples;
}

const PeoplesPage: NextPage<any> = ({ peoples }: PeoplesProps) => {
  const { searchedPeoples } = useSelector((root: RootState) => root.video);

  const dispatch = useDispatch();

  const router = useRouter();

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword) search(keyword);
  }, [keyword]);

  useEffect(() => {
    router.replace("/peoples");
  }, []);

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
        <title>Peoples</title>
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
            onClick={() => router.push(`/peoples/${item.id}`)}
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
        {peoples!.page > 1 && <GrFormPrevious className="cursor-pointer" />}
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
        <GrFormNext className="cursor-pointer" />
      </section>
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;

    if (page) {
      await store.dispatch(getPeoples(+page));
    } else {
      await store.dispatch(getPeoples(1));
    }
    const { peoples } = store.getState().video;
    return {
      props: {
        peoples,
      },
    };
  }
);

export default PeoplesPage;
