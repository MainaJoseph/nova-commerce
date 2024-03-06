"use client";

import { useState } from "react";
import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  const [pinnedReviews, setPinnedReviews] = useState<string[]>([]);

  const togglePin = (reviewId: string) => {
    if (pinnedReviews.includes(reviewId)) {
      setPinnedReviews(pinnedReviews.filter((id) => id !== reviewId));
    } else {
      setPinnedReviews([...pinnedReviews, reviewId]);
    }
  };

  //Calculate the time the user rated the product
  const calculateTimeDifference = (createdAt: Date) => {
    const currentTime = moment.utc();
    const duration = moment.duration(currentTime.diff(moment.utc(createdAt)));
    const minutes = duration.asMinutes();
    if (minutes < 1) {
      return "A few seconds";
    } else if (minutes < 60) {
      return `${Math.floor(minutes)} minute${
        Math.floor(minutes) === 1 ? "" : "s"
      }`;
    } else {
      return `${Math.floor(minutes / 60)} hour${
        Math.floor(minutes / 60) === 1 ? "" : "s"
      }`;
    }
  };

  if (product.reviews.length === 0) return null;
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <Avatar src={review?.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  {/* <div className="font-extralight italic">
                    {calculateTimeDifference(review.createdAt)} ago
                  </div> */}

                  {/* Display time */}
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
