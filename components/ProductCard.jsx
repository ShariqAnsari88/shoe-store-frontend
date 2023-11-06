import useCurrency from "@/hooks/useCurrency";
import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

const ProductCard = ({
  data: { attributes: p, id },
  isCarouselCard,
  border,
  dropShadow,
}) => {
  const { t } = useTranslation("common");
  const discount = getDiscountedPricePercentage(p.original_price, p.price);
  const router = useRouter();
  const { locale } = router;
  const { currency } = useCurrency();

  const disabled = p.outOfStock;

  return (
    <Link
      href={{ pathname: `/product/${p.slug}` }}
      locale={locale}
      className={`${isCarouselCard && "h-[500px] w-[450px]"} 
      relative
     overflow-hidden
    bg-darkBlack
     transition 
     ease-in-out duration-300
     drop-shadow-2xl
     ${
       disabled
         ? "hover:scale-1 pointer-events-none cursor-auto"
         : "sm:hover:scale-105 hover:-translate-y-5"
     }
     cursor-pointer
     `}
    >
      {disabled && (
        <div
          className="
       absolute 
       z-10 
       inset-0
       flex 
       flex-1
       flex-col
       items-center
       justify-center
      text-white
       font-bold
       top-50"
        >
          <div className="bg-black p-2 text-center">{t("out_of_stock")}</div>
        </div>
      )}
      <div
        className={` ${isCarouselCard && "sm:w-[250px] sm:min-h-[500px]"} ${
          border ?? "sm:border-[2px] sm:border-white"
        }
        
        `}
      >
        {disabled && <div className="inset-0 absolute bg-white opacity-50" />}
        <Image
          className={`bg-cover bg-white`}
          width={isCarouselCard ? 250 : 400}
          height={isCarouselCard ? 250 : 400}
          src={p.thumbnail.data.attributes.url}
          alt={p.name ?? "No Photo"}
        />
        <div className="justify-end flex-col p-4 text-offWhite/[0.9]">
          <h2 className="text-lg text-transparent  bg-clip-text bg-gradient-to-r from-[#0ba360] to-[#3cba92] font-bold">
            {p.name}
          </h2>
          <div className="flex items-center justify-between flex-row sm:flex-row text-black/[0.5]">
            <div className="flex flex-row">
              <p className="mr-2 text-lg font-semibold">
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
                  <div className="flex justify-between">
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
