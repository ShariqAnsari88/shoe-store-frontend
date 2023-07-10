import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistItems } from "@/store/wishlistSlice";
import WishlistItem from "@/components/wishlist/WishlistItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Wishlist = () => {
  const wishlistItems = useAppSelector(selectWishlistItems)

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {wishlistItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[#EEEEEE] text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Your Favourites!
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlistItems.map((item) => (
                  <WishlistItem key={item.id} wishlistItem={item} />
                ))}
                </div>
              </div>
              {/* CART ITEMS END */}

            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {wishlistItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px]">
            <FontAwesomeIcon
              color="#EEEEEE"
              icon={faHeart}
              className="mb-10"
              size="10x"
            />
            <span className="text-[#EEEEEE] text-xl font-bold">
              Your cart is empty
            </span>
            <span className="text-[#EEEEEE] text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-[#393646] text-[#EEEEEE] text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Wishlist;
