import React from "react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import axios from "axios";

interface Props {
  theme: string;
}

const List = ({ theme }: Props) => {
  const search = async (theme: string) => {
    const { data } = await axios.get("http://localhost:3001/vseeker");
    console.log(data);
    
  };

  useEffect(() => {
    search(theme);
  }, []);

  return (
    <section className="flex flex-col gap-2 p-3">
      <h3 className="pl-2 border-l-4 border-red-500 ">das</h3>
      <ul className="flex overflow-x-scroll">
        <li className="p-1">
          <img
            className="h-40 w-32 flex-shrink rounded-md"
            src="https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&amp;quality=80&amp;ratio=16-9&amp;resize=aspectfill"
          />
        </li>
        <li className="p-1">
          <img
            className="h-40 w-32 flex-shrink rounded-md"
            src="https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&amp;quality=80&amp;ratio=16-9&amp;resize=aspectfill"
          />
        </li>
        <li className="p-1">
          <img
            className="h-40 w-32 flex-shrink rounded-md"
            src="https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&amp;quality=80&amp;ratio=16-9&amp;resize=aspectfill"
          />
        </li>
        <li className="p-1">
          <img
            className="h-40 w-32 flex-shrink rounded-md"
            src="https://cdn.onebauer.media/one/empire-images/articles/5ca1ec3f133d503e3a486a2e/avengers-russian-crop.jpg?format=jpg&amp;quality=80&amp;ratio=16-9&amp;resize=aspectfill"
          />
        </li>
      </ul>
    </section>
  );
};

export default List;
