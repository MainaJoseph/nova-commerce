"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/input/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Star, MessageSquare, Send, Sparkles } from "lucide-react";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };

  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const currentRating = watch("rating");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("Please select a rating");
    }

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const ratingData = {
      ...data,
      userId: user?.id,
      product: product,
      createdAt: currentTime,
    };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating Submitted Successfully!");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  const deliveredOrder = user?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered",
  );

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id;
  });

  if (userReview || !deliveredOrder) return null;

  const ratingLabels: { [key: number]: string } = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-orange-50/30 to-white shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Share Your Experience
              </h2>
              <p className="text-sm text-orange-100">
                Help others make informed decisions
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6 sm:p-8">
          {/* Rating Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
              <label className="text-lg font-semibold text-gray-900">
                Rate this product
              </label>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-orange-200 bg-white p-6 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50/50">
              <Rating
                size="large"
                value={currentRating}
                onChange={(event, newValue) => {
                  setCustomValue("rating", newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHoverRating(newHover);
                }}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#f97316",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#fb923c",
                  },
                  fontSize: "3rem",
                }}
              />

              {/* Rating Label */}
              <div className="text-center">
                {(hoverRating > 0 || currentRating > 0) && (
                  <div className="animate-fade-in">
                    <p className="text-xl font-bold text-orange-600">
                      {ratingLabels[hoverRating || currentRating]}
                    </p>
                    <p className="text-sm text-gray-600">
                      {hoverRating || currentRating} out of 5 stars
                    </p>
                  </div>
                )}
                {!hoverRating && !currentRating && (
                  <p className="text-sm text-gray-500">
                    Click to rate this product
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              <label className="text-lg font-semibold text-gray-900">
                Your Review
              </label>
            </div>

            <div className="relative">
              <textarea
                id="comment"
                {...register("comment", {
                  required: "Please write a comment",
                })}
                disabled={isLoading}
                placeholder="Share your thoughts about this product..."
                rows={5}
                className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.comment
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-orange-500"
                } `}
              />
              {errors.comment && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.comment.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-orange-600 hover:to-orange-700 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 disabled:hover:scale-100`}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span>Submit Review</span>
              </>
            )}
          </button>

          {/* Helper Text */}
          <p className="text-center text-xs text-gray-500">
            Your review will be visible to all customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddRating;
