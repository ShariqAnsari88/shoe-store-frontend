import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { getDiscountedPricePercentage } from "@/utils/helper";

export default function WishlistItem(props) {
  const dispatch = useDispatch();

  if (!props.wishlistItem) return null;

  const discount = getDiscountedPricePercentage(props.wishlistItem.attributes.original_price, props.wishlistItem.attributes.price);

  const imageSrc =
    props.wishlistItem.attributes?.image?.data[0]?.attributes?.url;
  return (
    <div     className="relative hover:scale-105 transition-all transition-property: all
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
    transition-duration: 150ms z-0 rounded-md border-2">
      <div>
        <a
          href={`/product/${props.wishlistItem.attributes.slug}`}
          className="rounded-md"
        >
          <Image
            alt="img"
            width={1000}
            height={1000}
            className="min-h-[350px] w-full h-full object-contain z-0 rounded-md"
            src={imageSrc}
          />
        </a>
        <button
          onClick={() =>
            dispatch(
              removeFromWishlist({ id: props.wishlistItem.id })
            )
          }
          className="bg-white px-1 rounded-md z-1 absolute top-2 right-2"
        >
          <FontAwesomeIcon
            icon={faHeartCircleMinus}
            color="#B22222"
            size="md"
          />
        </button>
      </div>
      <div className="p-4 text-offWhite/[0.9]">
      <h2 className="text-lg text-neonGreenLighter font-bold">
          {props.wishlistItem.attributes.name}
        </h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-normal">
            {props.wishlistItem.attributes.price} лв.
          </p>

          {props.wishlistItem.attributes.original_price && (
            <>
                         {discount > 0 && (
                    <>
                      <p className="text-offWhite text-base  font-medium line-through">
                        {props.wishlistItem.attributes.original_price} лв.
                      </p>

                      <p className="ml-auto text-base font-semibold bg-orange-400 rounded-md p-[5px]">
                        {discount}% off
                      </p>
                    </>
                  )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
