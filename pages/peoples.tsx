import { useState, ChangeEvent, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../wrapper";
/**@types */
import { RootState } from "../reducers/root";
import Peoples from "../types/Peoples";
/**@reducers */
import { getPeoples } from "../reducers/video";

interface PeoplesProps {
  peoples: Peoples;
}

const PeoplesPage: NextPage<any> = ({ peoples }: PeoplesProps) => {
  const store = useSelector((root: RootState) => root.video);

  const dispatch = useDispatch();

  const router = useRouter();

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword) search(keyword);
  }, [keyword]);

  useEffect(()=>{
    console.log(store);
    router.replace("/peoples");
  },[store]);

  const inputKeyword = (e: ChangeEvent<HTMLInputElement>): void =>
    setKeyword(() => e.target.value);

  const search = async (keyword: string): Promise<any> =>
    dispatch(getPeoples(1));


  const test = () => {
    dispatch(getPeoples(2));
  }

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
        {peoples.results.map((item) => (
          <div
            key={item.id}
            className="shadow-md rounded-b-md"
            onClick={() => router.push(`/peoples/${item.id}`)}
          >
            <div className="overflow-hidden rounded-t-md">
              {item.profile_path ? (
                <img
                  className="poster"
                  src={`https://www.themoviedb.org/t/p/w235_and_h235_face/${item.profile_path}`}
                />
              ) : (
                <img
                  className="poster"
                  src={`https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png`}
                />
              )}
            </div>
            <strong className="block text-center">{item.name}</strong>
          </div>
        ))}
      </section>
      <section className="flex justify-center my-4">
        <button>Pre</button>
        {peoples.page}/{peoples.total_pages}
        <button onClick={test}>Next</button>
      </section>
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getPeoples(1));
    const { peoples } = store.getState().video;
    return {
      props: {
        peoples
      },
    };
  }
);

export default PeoplesPage;
