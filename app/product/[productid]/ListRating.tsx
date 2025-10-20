"use client";

import { useState } from "react";
import Avatar from "@/app/components/Avatar";
import { Rating } from "@mui/material";
import moment from "moment";
import {
  Star,
  MessageSquare,
  Clock,
  ThumbsUp,
  VerifiedIcon,
} from "lucide-react";

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

  // Calculate the time the user rated the product
  const calculateTimeDifference = (createdAt: Date) => {
    const currentTime = moment.utc();
    const duration = moment.duration(currentTime.diff(moment.utc(createdAt)));
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();

    if (minutes < 1) {
      return "Just now";
    } else if (minutes < 60) {
      return `${Math.floor(minutes)}m ago`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h ago`;
    } else if (days < 30) {
      return `${Math.floor(days)}d ago`;
    } else {
      return moment.utc(createdAt).format("MMM D, YYYY");
    }
  };

  // Calculate average rating
  const averageRating =
    product.reviews.reduce(
      (acc: number, review: any) => acc + review.rating,
      0,
    ) / product.reviews.length;

  // Count ratings by star
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) =>
      product.reviews.filter((review: any) => review.rating === star).length,
  );

  if (product.reviews.length === 0) return null;

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-orange-100 p-2">
            <Star className="h-6 w-6 fill-orange-500 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
        </div>

        {/* Rating Summary */}
        <div className="grid gap-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-orange-50/30 p-6 shadow-sm md:grid-cols-2">
          {/* Left: Average Rating */}
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 pb-6 md:border-b-0 md:border-r md:pb-0">
            <div className="text-6xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <Rating
              value={averageRating}
              readOnly
              precision={0.1}
              size="large"
            />
            <p className="text-sm text-gray-600">
              Based on {product.reviews.length} review
              {product.reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Right: Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = ratingCounts[index];
              const percentage =
                product.reviews.length > 0
                  ? (count / product.reviews.length) * 100
                  : 0;

              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-medium text-gray-700">
                    {star}{" "}
                    <Star className="inline h-3 w-3 fill-orange-400 text-orange-400" />
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm text-gray-600">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <MessageSquare className="h-5 w-5 text-orange-500" />
          All Reviews
        </h3>

        <div className="space-y-4">
          {product.reviews.map((review: any) => {
            return (
              <div
                key={review.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Avatar src={review?.user.image} />
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-0.5">
                        <VerifiedIcon className="h-3 w-3 fill-white text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">
                          {review?.user.name}
                        </h4>
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Verified Purchase
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Rating
                          value={review.rating}
                          readOnly
                          size="small"
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "#f97316",
                            },
                          }}
                        />
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {calculateTimeDifference(review.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Comment */}
                <div className="mt-4">
                  <p className="leading-relaxed text-gray-700">
                    {review.comment}
                  </p>
                </div>

                {/* Review Footer */}
                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
                  <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListRating;
