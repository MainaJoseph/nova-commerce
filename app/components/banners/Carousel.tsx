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
import { Sparkles, TrendingUp, Package, LucideIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// ============================================
// SLIDE DATA - Edit here to change slides
// ============================================
interface SlideData {
  id: number;
  badge: {
    text: string;
    icon: LucideIcon;
  };
  title: string;
  highlightedText: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  gradient: string;
  accentColor: string;
  textColor: string;
  image: string;
  imageAlt: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    badge: {
      text: "New Arrivals",
      icon: Sparkles,
    },
    title: "Discover",
    highlightedText: "Amazing Deals",
    description:
      "Exclusive products curated just for you. Shop the latest trends and elevate your style.",
    ctaPrimary: "Up to 50% Off",
    ctaSecondary: "Shop Now",
    gradient: "from-orange-400 via-orange-500 to-orange-600",
    accentColor: "text-yellow-300",
    textColor: "text-orange-600",
    image: "/banner-image.png",
    imageAlt: "New Arrivals",
  },
  {
    id: 2,
    badge: {
      text: "Trending Now",
      icon: TrendingUp,
    },
    title: "Premium",
    highlightedText: "Collection",
    description:
      "Explore handpicked items that define quality and innovation. Your next favorite is here.",
    ctaPrimary: "Limited Time",
    ctaSecondary: "Explore",
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
    accentColor: "text-cyan-300",
    textColor: "text-blue-600",
    image: "/banner-image.png",
    imageAlt: "Premium Collection",
  },
  {
    id: 3,
    badge: {
      text: "Best Sellers",
      icon: Package,
    },
    title: "Customer",
    highlightedText: "Favorites",
    description:
      "Join thousands of satisfied customers. These products are loved for a reason.",
    ctaPrimary: "Top Rated",
    ctaSecondary: "View All",
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    accentColor: "text-pink-200",
    textColor: "text-purple-600",
    image: "/banner-image.png",
    imageAlt: "Best Sellers",
  },
];

// Autoplay configuration
const AUTOPLAY_DELAY = 4000; // 4 seconds

// ============================================
// COMPONENT
// ============================================
const Slider = () => {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true }),
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="w-full"
        style={{ borderRadius: "10px" }}
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent>
          {slidesData.map((slide) => {
            const BadgeIcon = slide.badge.icon;

            return (
              <CarouselItem
                key={slide.id}
                className={`relative bg-gradient-to-br ${slide.gradient} overflow-hidden`}
                style={{ borderRadius: "10px" }}
              >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="relative">
                  <div className="md:py-15 mx-auto flex flex-col items-center justify-between gap-6 px-8 py-12 md:flex-row">
                    {/* Text Content */}
                    <div className="z-10 flex-1 space-y-3 text-center md:text-left">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                        <BadgeIcon className="h-5 w-5 text-white" />
                        <span className="text-sm font-semibold text-white">
                          {slide.badge.text}
                        </span>
                      </div>

                      <h1 className="mb-4 text-5xl font-bold leading-tight text-white md:text-7xl">
                        {slide.title}
                        <br />
                        <span className={slide.accentColor}>
                          {slide.highlightedText}
                        </span>
                      </h1>

                      <p className="mb-6 max-w-lg text-lg text-white/90 md:text-xl">
                        {slide.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                        <div
                          className={`bg-white ${slide.textColor} rounded-full px-8 py-4 text-xl font-bold shadow-lg`}
                        >
                          {slide.ctaPrimary}
                        </div>
                        <button className="group rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:shadow-lg">
                          <span className="group-hover:text-gray-800">
                            {slide.ctaSecondary}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative z-10 h-64 w-full flex-1 md:h-96">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-black/20 to-transparent"></div>
                      <Image
                        src={slide.image}
                        fill
                        alt={slide.imageAlt}
                        className="object-contain drop-shadow-2xl"
                        priority={slide.id === 1}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Progress Dots */}
        <div className="mt-6 flex justify-center gap-2 pb-4">
          {slidesData.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              } `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      <div className="mt-8 flex justify-center pl-5 lg:p-0">
        <Mover />
      </div>
    </div>
  );
};

export default Slider;
