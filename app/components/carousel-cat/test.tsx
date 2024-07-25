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
      "Home and Office",
      "Fashion",
      "Computing",
      "Supermarket",
      "Sporting",
      "Automobile",
      "Other",
    ],
    [],
  );

  const cardCategories = React.useMemo(
    () => [
      "Phone & Tablets",
      "TVs & Audio",
      "Appliances",
      "Health and Beauty",
      "Home and Office",
      "Fashion",
      "Computing",
      "Supermarket",
      "Sporting",
      "Automobile",
      "Other",
    ],
    [],
  );

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
          category: encodeURIComponent(categoryText),
        };

        const url = queryString.stringifyUrl(
          {
            url: "/",
            query: updatedQuery,
          },
          {
            skipNull: true,
          },
        );

        router.push(url);
      }
    },
    [router, params, cardCategories, cardTexts],
  );

  return (
    <div className="relative mx-auto w-full max-w-screen-xl overflow-hidden">
      <Container>
        <div className="hidden grid-cols-6 gap-4 lg:grid">
          {cardTexts.map((text, index) => (
            <div
              key={index}
              className={`cursor-pointer ${cardColors[index]} p-1`}
              style={{
                transition: "transform 0.3s",
                transform: "scale(1)",
              }}
              onClick={() => handleClick(text)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardContent
                className="flex aspect-square items-center justify-center p-6"
                style={{ borderRadius: "5px" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{ borderRadius: "5px" }}
                >
                  <Image
                    src={cardImages[index]}
                    alt={text}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
              <div className="py-2 text-center text-sm">{text}</div>
            </div>
          ))}
        </div>

        <Carousel
          opts={{ align: "start" }}
          className="relative block w-full lg:hidden"
        >
          <CarouselContent>
            {cardTexts.map((text, index) => (
              <CarouselItem key={index} className="basis-1/3 p-1">
                <div
                  className={`cursor-pointer ${cardColors[index]}`}
                  style={{
                    transition: "transform 0.3s",
                    transform: "scale(1)",
                  }}
                  onClick={() => handleClick(text)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardContent
                    className="flex aspect-square items-center justify-center p-6"
                    style={{ borderRadius: "5px" }}
                  >
                    <div
                      className="relative h-full w-full overflow-hidden"
                      style={{ borderRadius: "5px" }}
                    >
                      <Image
                        src={cardImages[index]}
                        alt={text}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </CardContent>
                </div>
                <div className="py-2 text-center text-sm">{text}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-slate-400 hover:bg-slate-200" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-slate-400 hover:bg-slate-200" />
        </Carousel>
      </Container>
    </div>
  );
}
