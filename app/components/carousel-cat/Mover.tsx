import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "../Container";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
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

  const cardTexts = [
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
  ];

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

  return (
    <div className="w-full max-w-screen-xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50 z-10"></div>
      <Container>
        <Carousel
          opts={{ align: "start" }}
          className="w-11/12 md:w-4/5 lg:w-3/4 relative z-20"
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-1">
                  <Card className={`cursor-pointer ${cardColors[index]}`}>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="w-full h-full relative overflow-hidden transform scale-y-[1]">
                        <Image
                          src={cardImages[index]}
                          alt={cardTexts[index]}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center py-2 text-sm">
                  {cardTexts[index]}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-slate-400 hover:bg-slate-200">
            <AiFillCaretLeft />
          </CarouselPrevious>
          <CarouselNext className="bg-slate-400 hover:bg-slate-200">
            <AiFillCaretRight />
          </CarouselNext>
        </Carousel>
      </Container>
    </div>
  );
}
