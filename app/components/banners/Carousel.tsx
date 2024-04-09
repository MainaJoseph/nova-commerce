"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Mover } from "../carousel-cat/Mover";

const Slider = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="relative bg-gradient-to-r from-amber-500 to-amber-700 mb-8">
            <div>
              <div className="mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-evenly relative">
                <div className="mb-8 md:mb-0 text-center flex-1">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Summer Sale
                  </h1>
                  <p className="text-lg md:text-xl text-white mb-2">
                    Enjoy Discounts on selected items
                  </p>
                  <p className="text-2xl md:5xl text-black font-bold">
                    GET UPTO 50% OFF
                  </p>
                </div>

                <div className="w-1/3 relative aspect-video">
                  <Image
                    src="/banner-image.png"
                    fill
                    alt="Banner Image"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="relative bg-gradient-to-r from-sky-400 to-sky-700 mb-8">
            <div>
              <div className="mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-evenly relative">
                <div className="mb-8 md:mb-0 text-center flex-1">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Best Deals
                  </h1>
                  <p className="text-lg md:text-xl text-white mb-2">
                    Shop with us to explore new Possibilities
                  </p>
                  <p className="text-2xl md:5xl text-yellow-500 font-bold">
                    GET UPTO 50% OFF
                  </p>
                </div>
                <div className="w-1/3 relative aspect-video">
                  <Image
                    src="/banner-image.png"
                    fill
                    alt="Banner Image"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center">
        <Mover />
      </div>
    </div>
  );
};

export default Slider;
