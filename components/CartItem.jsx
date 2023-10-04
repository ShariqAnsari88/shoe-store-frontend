import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  const router = useRouter()
  const { locale } = router
  const p = data.attributes;
  const slug =  p.categories.data[0].attributes.slug
  const isAccessory = slug.includes('aksesoari-1') || slug.includes('accessori-2') || slug.includes('accessories-1')  
  const currency = locale !== 'bg' ? '€' : 'ЛВ'

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
          width={120}
          height={120}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-normal text-offWhite/[0.8]">
            {p.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-normal text-offWhite/[0.5] block md:hidden">
            {p.subtitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-normal text-offWhite/[0.5] mt-2">
            {p.price} {currency}.
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-normal text-offWhite/[0.5] hidden md:block">
          {p.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-offWhite/[0.5] text-sm md:text-md">
           {!isAccessory && <div className="flex items-center gap-1">
              <div className="font-normal">Size:</div>
              <select
                className="text-black rounded-md border-offWhite border-[2px] cursor-pointer"
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {p.size.data.map((item, i) => {              
                  return (
                    <option
                      key={i}
                      value={item.size}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}
                    >
                      {item.size}
                    </option>
                  );
                })}
              </select>
            </div>}

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="text-black rounded-md border-offWhite border-[2px] cursor-pointer"
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => dispatch(removeFromCart({ id: data.id, selectedSize: data.selectedSize }))}
            className="cursor-pointer transition ease-in-out text-offWhite/[0.5] hover:text-offWhite text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
