"use client"


import React, { useState } from "react";
import HomeBanner from "./HomeBanner";
import HomeBanner2 from "./HomeBanner2";

const banners = [HomeBanner, HomeBanner2]; // Store components, not instances

const Carousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((currentBanner + 1) % banners.length);
  };

  const previousBanner = () => {
    setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
  };

  const BannerComponent = banners[currentBanner];

  return (
    <div className="carousel-container">
      <BannerComponent onNext={nextBanner} onPrevious={previousBanner} />
    </div>
  );
};

export default Carousel;
