import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ data: { attributes: p, id } }) => {
  const discount = getDiscountedPricePercentage(p.original_price, p.price);

  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-[#181516] duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        className=" max-h-64 object-contain"
        width={500}
        height={500}
        src={p.thumbnail.data.attributes.url}
        alt={p.name ?? "No Photo"}
      />
      <div className="p-4 text-[#EEEEEE]/[0.9]">
        <h2 className="text-lg font-medium">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-normal">{p.price} лв.</p>

          {p.original_price && (
            <>
              {discount > 0 && (
                <>
                  <p className="text-base font-normal line-through">
                    {p.original_price} лв.
                  </p>
                  <p className="ml-auto text-base font-normal text-green-500">
                    {discount}% off
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
