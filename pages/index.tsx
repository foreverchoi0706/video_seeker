import { ChangeEvent } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { useCallback } from "react";
//components
import Layout from "../components/common/Layout";
import List from "../components/common/List";

interface HomeProps {
  items: Array<any>;
}

const Modal = () => {};

const Home = ({ items }: HomeProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value);
  };

  const handleClick = useCallback((e) => {}, []);

  return (
    <article className="overflow-x-hidden">
      <Head>
        <title>video-seeker</title>
      </Head>
      <section className="relative">
        <img
          onClick={handleClick}
          src="https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&amp;quality=80&amp;ratio=16-9&amp;resize=aspectfill"
        />
        <div className="absolute bottom-5 w-full flex flex-col items-center">
          <input
            type="text"
            className="focus:outline-none w-4/6 rounded-md p-1"
            value={keyword}
            onChange={handleChange}
          />
          {keyword && (
            <div className="bg-red-500 absolute -bottom-5 w-4/6">
              dasdsad dasdsad Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Placeat deleniti sunt dignissimos commodi
              ducimus molestias ab porro animi similique eaque corporis
              inventore, at quidem deserunt natus consequatur omnis? Fuga,
              voluptatibus?
            </div>
          )}
        </div>
      </section>
      <List theme="What's Popular" items={items} />
      <List theme="Free To Watch" items={items} />
      <List theme="Trend" items={items} />
    </article>
  );
};

export const getServerSideProps = async (context: GetServerSideProps) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/list/1?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=ko-KR"
  );
  console.log(data);
  
  return {
    props: {
      items: data.items,
    },
  };
};

export default Home;
