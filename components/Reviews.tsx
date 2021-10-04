import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CgBoy } from "react-icons/cg";
import { MdRateReview } from "react-icons/md";
import { dateToString } from "../util";

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
        {stars.map((item, index) =>
          item ? <BsStarFill key={index} /> : <BsStar key={index} />
        )}
      </div>
    );
  }
  return null;
};

const Reviews = ({ items }: ReviewsProps) => {
  return (
    <ul id="reviews" className="text-sm h-96 overflow-y-scroll rounded-md p-3 ">
      {items.map((item) => (
        <li key={item.id} className="p-3 my-3 rounded-md shadow-lg">
          <h3 className="font-bold flex items-center gap-1">
            <CgBoy />
            {item.author}
          </h3>
          <div>{item.content}</div>
          <strong className="flex items-center gap-1 text-right justify-end">
            {dateToString(item.created_at)}
            <MdRateReview />
          </strong>
          <Stars rating={item.author_details.rating} />
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
