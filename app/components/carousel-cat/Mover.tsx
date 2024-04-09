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

export function Mover() {
  const cardTexts = [
    "Phone & Tablets",
    "TVs & Audio",
    "Appliances",
    "Heath and Beuty",
    "Fashion",
    "Computing",
    "Supermarket",
    "Spoting",
    "Automobile",
    "Others",
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <Container>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-11/12 md:w-4/5 lg:w-3/4"
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-1">
                  <Card className="cursor-pointer bg-amber-200">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center py-2">{cardTexts[index]}</div>
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
