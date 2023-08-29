import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ data: { attributes: p, id }, isCarouselCard }) => {
  const discount = getDiscountedPricePercentage(p.original_price, p.price);

  return (
    <Link
      href={`/product/${p.slug}`}
      className={`transform ${
        isCarouselCard ? null : "border-2"
      } overflow-hidden bg-[#181516] duration-200 hover:scale-105 cursor-pointer flex flex-col justify-between`}
    >
      <Image
        className="object-contain"
        width={500}
        height={500}
        src={p.thumbnail.data.attributes.url}
        alt={p.name ?? "No Photo"}
      />
      <div className=" p-4 text-offWhite/[0.9]">
        <h2 className="text-lg text-neonGreenLighter font-bold">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-normal">{p.price} лв.</p>

          {p.original_price && (
            <>
              {discount > 0 && (
                <>
                  <p className="text-base font-normal line-through">
                    {p.original_price} лв.
                  </p>
                  <p className="ml-auto text-base font-semibold rounded-md bg-orange-400 p-[5px] text-white">
                    -{discount}%
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
