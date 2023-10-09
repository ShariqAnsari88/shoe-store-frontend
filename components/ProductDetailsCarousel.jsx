import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";

const ProductDetailsCarousel = ({ image, sliderImages, selected }) => {
  return (
    <div className="text-[20px] text-neonGreenLighter w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Image
        className="rounded-md"
        width={800}
        height={600}
        key={image.id}
        src={image.attributes.url}
        alt={image.attributes.name}
      />
    </div>
  );
};

export default ProductDetailsCarousel;
