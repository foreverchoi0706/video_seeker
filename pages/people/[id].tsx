import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";
import { LineProgressBar } from "@frogress/line";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { AiFillFire } from "react-icons/ai";
import wrapper from "../../wrapper";
/**@utilities */
import { getStyles } from "../../utilities/common";
/**@config */
import { API_KEY } from "../../config.json";
/**@components */
import List from "../../components/common/List";
import Companies from "../../components/list/Compaies";
import Reviews from "../../components/list/Reviews";
/**@styles */
import "react-circular-progressbar/dist/styles.css";
/**@types */
import Movie from "../../types/Movie";
/**@reducers */
import { getPeople } from "../../reducers/video";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/root";
import { useEffect } from "react";

interface DetailProps {
  item: MovieDetail;
  reviews: Array<any>;
  similars: Array<Movie>;
}

const Detail = ({}) => {
  const { people } = useSelector((root: RootState) => root.video);


  return <article className="overflow-x-hidden">
    {JSON.stringify(people)}
  </article>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;
    if (id) {
      await store.dispatch(getPeople(id.toString()));
      return {
        props: {},
      };
    } else {
    }
    return {
      props: {},
    };
  }
);

export default Detail;
