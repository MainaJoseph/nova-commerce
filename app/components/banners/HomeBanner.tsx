import Image from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface BannerProps {
    onNext: () => void; // Define the onNext prop as a function with no arguments
    onPrevious: () => void; // Define the onPrevious prop as a function with no arguments
  }

  const HomeBanner: React.FC<BannerProps> = ({ onNext, onPrevious }) => {
  return (
    <div className="relative bg-gradient-to-r from-amber-500 to-amber-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-evenly relative">
        <div className="mb-8 md:mb-0 text-center flex-1">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Summer Sale
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy Discounts on selected items
          </p>
          <p className="text-2xl md:5xl text-black font-bold">GET UPTO 50% OFF</p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            fill
            alt="Banner Image"
            className="object-contain"
          />
        </div>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">
        <button onClick={onPrevious}>
          <FaArrowCircleLeft size={30} />
        </button>
      </div>
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black">
        <button onClick={onNext}>
          <FaArrowCircleRight size={30} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default HomeBanner;
