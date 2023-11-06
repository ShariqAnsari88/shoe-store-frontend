import React from "react";
import slideImage1 from "../public/carousel_images/carousel_1-min.jpg";
import slideImage2 from "../public/carousel_images/carousel_2-min.jpg";
import slideImage3 from "../public/carousel_images/carousel_3-min.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "@material-tailwind/react";

import Image from "next/image";

const HeroBanner = () => {
  const images = [slideImage1, slideImage2, slideImage3];

  return (
    <div
      className={`text-white mt-12 text-[20px] flex sm:h-[600px] min-w-[400px] h-[400px] mx-auto mb-12`}
    >
      <Carousel
        loop
        autoplay
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {images.map((item, index) => (
          <Image
            alt="img"
            key={index}
            src={item}
            className={`sm:h-[600px] h-[350px] object-contain`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
