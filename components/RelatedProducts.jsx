import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { useTranslation } from "next-i18next";

const RelatedProducts = ({ products }) => {
  const { t } = useTranslation("product_details");
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
      <div className="text-offWhite text-2xl font-normal mb-5">
        {t("recommended")}
      </div>
      <Carousel
        infiniteLoop={true}
        responsive={responsive}
        containerClass="-mx-[10px] w-full"
        itemClass="p-[10px]"
      >
        {products?.data?.map((product) => (
          <ProductCard isCarouselCard key={product?.id} data={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
