"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "../Container";
import Image from "next/image";

export function Mover() {
  const cardImages = [
    "/phones.jpg",
    "/tv.jpg",
    "/apliance.png",
    "/beauty.jpg",
    "/fashion.jpg",
    "/computing.jpg",
    "/super.jpg",
    "/sporting.jpg",
    "/auto.jpeg",
    "/others.jpg",
  ];

  const cardTexts = React.useMemo(
    () => [
      "Phone & Tablets",
      "TVs & Audio",
      "Appliances",
      "Health and Beauty",
      "Fashion",
      "Computing",
      "Supermarket",
      "Sporting",
      "Automobile",
      "Others",
    ],
    []
  );

  const cardCategories = React.useMemo(
    () => [
      "phones",
      "tv",
      "appliances",
      "beauty",
      "fashion",
      "computing",
      "supermarket",
      "sporting",
      "automobile",
      "others",
    ],
    []
  );

  // Define an array of background colors
  const cardColors = [
    "bg-slate-100",
    "bg-blue-400",
    "bg-amber-200",
    "bg-red-200",
    "bg-gray-200",
    "bg-orange-400",
    "bg-gray-200",
    "bg-slate-500",
    "bg-red-200",
    "bg-yellow-200",
  ];

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(
    (categoryText: string) => {
      const index = cardTexts.indexOf(categoryText);
      if (index !== -1) {
        const category = cardCategories[index];
        let currentQuery = {};

        if (params) {
          currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery = {
          ...currentQuery,
          category: encodeURIComponent(categoryText), // Encode the category name
        };

        const url = queryString.stringifyUrl(
          {
            url: "/",
            query: updatedQuery,
          },
          {
            skipNull: true,
          }
        );

        router.push(url);
      }
    },
    [router, params, cardCategories, cardTexts]
  );

  return (
    <div className="w-full max-w-screen-xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50 z-10"></div>
      <Container>
        <Carousel
          opts={{ align: "start" }}
          className="w-11/12 md:w-4/5 lg:w-5/6 xl:w-3/4 relative z-20"
        >
          <CarouselContent>
            {cardTexts.map((text, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-1">
                  <div
                    className={`cursor-pointer ${cardColors[index]}`}
                    style={{
                      transition: "transform 0.3s",
                      transform: "scale(1)",
                    }} // Add transition for smooth effect
                    onClick={() => handleClick(text)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    } // Scale up on hover
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    } // Reset on hover out
                  >
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="w-full h-full relative overflow-hidden">
                        <Image
                          src={cardImages[index]}
                          alt={text} // Use `text` instead of `cardTexts[index]`
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </CardContent>
                  </div>
                </div>
                <div className="text-center py-2 text-sm">{text}</div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-slate-400 hover:bg-slate-200" />
          <CarouselNext className="bg-slate-400 hover:bg-slate-200" />
        </Carousel>
      </Container>
    </div>
  );
}
