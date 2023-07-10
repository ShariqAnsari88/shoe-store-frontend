import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const ProductDetailsCarousel = ({ images }) => {
    return (
        <div className="text-[#EEEEEE] text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                {images?.map((img) => (
                    <Image
                    width={1920}
                    height={1080}
                        key={img.id}
                        src={img.attributes.url}
                        alt={img.attributes.name}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default ProductDetailsCarousel;
