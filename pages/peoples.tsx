import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../wrapper";
/**@components */
import Searched from "../components/Searched";
import Remote from "../components/Remote";
/**@types */
import { RootState } from "../reducers/root";
import Peoples from "../types/Peoples";
/**@reducers */
import { getPeoples, searchPeoples } from "../reducers/video";
import { nanoid } from "@reduxjs/toolkit";

interface PeoplesProps {
  peoples: Peoples;
  div: string;
}

const PeoplesPage: NextPage<any> = ({ peoples, div }: PeoplesProps) => {
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
        {keyword && <Searched peoples={searched} />}
      </section>
      <section className="grid-cols-auto-150 grid w-full gap-4 py-3 justify-center md:grid-cols-auto-235">
        {peoples!.results.map((item) => (
          <div
            key={nanoid()}
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
                  style={{
                    height: "235px",
                  }}
                  className="poster"
                  src="https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
                />
              )}
            </div>
            <strong className="block text-center">{item.name}</strong>
          </div>
        ))}
      </section>
      <Remote list={peoples} goPage={goPage} />
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

export default PeoplesPage;
