import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { dateToString } from "../../utilities/common";

interface StarsProps {
  rating: number;
}

interface ReviewsProps {
  items: Array<any>;
}

const Stars = ({ rating }: StarsProps) => {
  const [stars, setStars] = useState<Array<boolean>>(new Array(10).fill(false));

  useEffect(() => {
    if (rating) {
      setStars(
        new Array(Math.floor(rating / 2))
          .fill(true)
          .map((item, index) => (stars[index] = item))
      );
    }
  }, [rating]);

  if (rating) {
    return (
      <div className="flex gap-1">
        {stars.map((item) => (item ? <BsStarFill /> : <BsStar />))}
      </div>
    );
  }
  return null;
};

const Reviews = ({ items }: ReviewsProps) => {
  return (
    <ul className="h-96 overflow-y-scroll rounded-md p-3 ">
      {items.length
        ? items.map((item) => (
            <li key={item.id} className="p-3 my-3  rounded-md shadow-lg">
              <h3 className="font-bold">{item.author}</h3>
              <div>{item.content}</div>
              <strong className="block text-right">
                {dateToString(item.created_at)}
              </strong>
              <Stars rating={item.author_details.rating} />
            </li>
          ))
        : "No Write Reviews"}
    </ul>
  );
};

export default Reviews;