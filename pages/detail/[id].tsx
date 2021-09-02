import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";

interface DetailProps {
  item: MovieDetail;
}

const Detail = ({ item }: DetailProps) => {
  const router = useRouter();
  return (
    <article>
      <Head>
        <title>{item.title}</title>
      </Head>
      <section className="relative">
        <img
          alt="head_img"
          className=""
          loading="lazy"
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path}`}
        />
        <div className="absolute flex gap-4 text-white ml-20 top-1">
          <img
            className="rounded-lg"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
          />
          <div>
            <h2>{item.title}</h2>
            <h3>{item.overview}</h3>
          </div>
        </div>
      </section>
    </article>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=a0d47ee72ddde5e72e4bbb4115a04d7e&language=en-US`
  );
  console.log(result.data);

  return {
    props: {
      item: result.data,
    },
  };
};

export default Detail;
