import { nanoid } from "nanoid";
import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getNav, MAX } from "../util";

interface RemoteProps {
  list: any;
  goPage: Function;
}

const Remote = ({ list, goPage }: RemoteProps) => {
  return (
    <section className="flex justify-center items-center gap-2 my-4">
      {list!.page >= MAX && (
        <button
          onClick={() => goPage(1)}
          className="border-2 border-gray-500 rounded-md px-2 text-sm"
        >
          1..
        </button>
      )}
      {list!.page > 1 && (
        <GrFormPrevious
          className="cursor-pointer"
          onClick={() => goPage(list.page - 1)}
        />
      )}
      {getNav(list.page, list.total_pages).map((item) => (
        <button
          key={nanoid()}
          onClick={() => goPage(item + 1)}
          className={`${
            item + 1 == list.page && "font-bold underline"
          } border-2 border-gray-500 rounded-md px-2 text-sm`}
        >
          {item + 1}
        </button>
      ))}
      {list!.page != 500 && (
        <GrFormNext
          className="cursor-pointer"
          onClick={() => goPage(list.page + 1)}
        />
      )}

      {list!.page < 500 - MAX && (
        <button
          onClick={() => goPage(500)}
          className="border-2 border-gray-500 rounded-md px-2 text-sm"
        >
          ..500
        </button>
      )}
    </section>
  );
};

export default Remote;
