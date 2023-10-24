import useCurrency from "@/hooks/useCurrency";
import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
const ProductCard = ({ data: { attributes: p, id }, isCarouselCard }) => {
  const discount = getDiscountedPricePercentage(p.original_price, p.price);

  const router = useRouter();
  const { locale } = router;
  const { currency } = useCurrency();

  return (
    <Link
      href={{ pathname: `/product/${p.slug}` }}
      locale={locale}
      className={`${isCarouselCard ? "h-[500px] w-[450px]" : ""} transform
     overflow-hidden bg-[#181516] duration-200 md:hover:scale-105 cursor-pointer`}
    >
      <div
        className={` ${
          isCarouselCard && "w-[250px] h-[470px]"
        } border-[2px] border-white`}
      >
        <Image
         className="bg-cover"
          width={isCarouselCard ? 250 : 400}
          height={isCarouselCard ? 200 : 400}
          src={p.thumbnail.data.attributes.url}
          alt={p.name ?? "No Photo"}
        />
        <div className="justify-end flex-col p-4 text-offWhite/[0.9]">
          <h2 className="text-lg text-neonGreenLighter font-bold">{p.name}</h2>
          <div className="flex items-center justify-between flex-row sm:flex-row text-black/[0.5]">
            <div className="flex flex-row">
              <p className="mr-2 text-lg font-normal">
                {p.price} {currency}
              </p>

              {discount > 0 && (
                <p className="text-base font-normal line-through">
                  {p.original_price} {currency}
                </p>
              )}
            </div>
            {p.original_price && (
              <>
                {discount > 0 && (
                  <div className="flex justify-betwee">
                    <p className="text-base font-semibold rounded-md bg-orange-400 p-[5px] text-white">
                      -{discount}%
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
