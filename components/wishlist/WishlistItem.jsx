import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "@/store/wishlistSlice";

export default function WishlistItem(props) {
  const dispatch = useDispatch();

  if (!props.wishlistItem) return null;

  const imageSrc =
    props.wishlistItem.attributes?.image?.data[0]?.attributes?.url;
  return (
    <div
      className="relative hover:scale-105 transition-all transition-property: all
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
    transition-duration: 150ms z-0 bg-black rounded-md"
    >
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
          dispatch(removeFromWishlist({ id: props.wishlistItem.id }))
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
  );
}
