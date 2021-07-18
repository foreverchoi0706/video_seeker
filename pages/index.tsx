import axios from "axios";
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import { useCallback } from "react";
//components
import Layout from "../components/common/Layout";
import List from "../components/common/List";

interface Props {
  data: string;
}

const Home = ({ data }: Props) => {
  const clickBtn = useCallback((e) => {}, []);

  return (
    <Layout>
      <article className="overflow-x-hidden">
        <Head>
          <title>video-seeker</title>
        </Head>
        <section className="relative">
          <img
            onClick={clickBtn}
            src="https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&amp;quality=80&amp;ratio=16-9&amp;resize=aspectfill"
          />
          <div className="absolute bottom-5 w-full flex justify-center">
            <input
              type="text"
              className="focus:outline-none w-4/6 rounded-md p-1"
            />
          </div>
        </section>

        <List />
        <List />
        <List />
        <List />
      </article>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSideProps) => {
  const { data } = await axios.get(
    "https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&quality=80&width=960&height=540&ratio=16-9&resize=aspectfill"
  );
  return {
    props: {
      data,
    },
  };
};

export default Home;
