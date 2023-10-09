/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import slideImage1 from "../public/carousel_images/carousel_1.jpg";
import slideImage2 from "../public/carousel_images/carousel_2.jpg";
import slideImage3 from "../public/carousel_images/carousel_3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const HeroBanner = () => {
  return (
    <div className={`text-white mt-12 text-[20px] flex sm:h-[600px] min-w-[400px] h-[400px] mx-auto my-4`}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="bg-transparent absolute left-5 top-[50%] translate-y-[-50%] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-#393646 z-10 flex items-center justify-center cursor-pointer hover:opacity-100"
          >
            <FontAwesomeIcon size="xl" icon={faAngleLeft} />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute  
          text-white 
            right-5 
            top-[50%] 
            translate-y-[-50%] 
            w-[30px] md:w-[50px] 
            h-[30px] md:h-[50px] 
            bg-#393646 
            z-10 
            flex 
            items-center 
            justify-center 
            cursor-pointer 
            hover:opacity-90"
          >
            <FontAwesomeIcon size="xl" icon={faAngleRight} />
          </div>
        )}
      >
        <div>
          <Image
            alt="img"
            src={slideImage1}
            className={`sm:h-[600px] h-[350px] object-contain`}
          />
        </div>

        <div>
          <Image
            alt="img"
            src={slideImage2}
            className={`sm:h-[600px] h-[350px]  object-contain`}
          />
        </div>

        <div>
          <Image
            alt="img"
            src={slideImage3}
            className={`sm:h-[600px] h-[350px]  object-contain`}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
