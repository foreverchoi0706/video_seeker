import { wrapper } from "./_app";
import { useState, ChangeEvent, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import axios from "axios";
/**@config */
import config from "../config.json";
/**@types */
import People from "../types/People";
/**@reducers */
import { GET_PEOPLES } from "../reducers/video";

interface PeoplesProps {
  peoples: Array<People>;
}

const Peoples: NextPage<any> = ({ peoples }: PeoplesProps) => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword) search(keyword);
  }, [keyword]);

  const inputKeyword = (e: ChangeEvent<HTMLInputElement>): void =>
    setKeyword(() => e.target.value);

  const search = async (keyword: string): Promise<any> =>
    dispatch(GET_PEOPLES(keyword));

  return (
    <article className="w-full">
      <Head>
        <title>Peoples</title>
      </Head>
      <section className="flex justify-center my-4">
        <input
          className="w-2/3 border-2 border-gray-500"
          type="text"
          placeholder="keyword"
          onChange={inputKeyword}
        />
      </section>
      <section className="grid grid-cols-auto-235 w-full gap-4 py-3 justify-center">
        {peoples.map((item) => (
          <div key={item.id} className="shadow-md rounded-b-md">
            <div className="overflow-hidden rounded-t-md">
              <img
                className="poster"
                src={`https://www.themoviedb.org/t/p/w235_and_h235_face/${item.profile_path}`}
              />
            </div>
            <strong className="block text-center">{item.name}</strong>
          </div>
        ))}
      </section>
      <section className="flex justify-center my-4">1/2/3/4/5</section>
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const poeples = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${config.API_KEY}&language=en-US&page=1`
    );
    return {
      props: {
        peoples: poeples.data.results,
      },
    };
  }
);

export default Peoples;
