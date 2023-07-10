import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { handlePayment } from "@/pages/api/checkout/payments";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCreditCard,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { getUser } from "@/store/contexts/userContext";
import { useAppSelector } from "@/store/hooks";
import { selectUserAddress } from "@/store/userSlice";
import AddressForm from "@/components/profile/AddressForm";
import { fetchDataFromApi } from "@/utils/api";


const Cart = (props) => {
  const router = useRouter();
  const user = props.user.username;
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const addressInfo = useAppSelector(selectUserAddress);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  const makePayment = async (e) =>
    dispatch(
      handlePayment({
        paymentMethod: e.target.name,
        products: cartItems,
        addressInfo,
        user,
        totalPrice: subTotal
      })
    ).then((e) => {
      if (e.error) router.replace("/failed");
      else router.replace("/success");
    });


  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[#EEEEEE] text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-[#EEEEEE] text-lg font-bold">
                  Cart Items
                </div>
                <div className="mb-10">
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
                </div>

                <AddressForm />
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-[#EEEEEE] text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-#393646/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-normal text-[#EEEEEE]">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-normal text-[#EEEEEE]">
                      {subTotal} лв.
                    </div>
                  </div>
                  <div className="text-[#EEEEEE] text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* BUTTON START */}
                <div className="flex space-x-3 flex-row justify-between">
                  <button
                    name="arrive"
                    className={`w-full py-4 rounded-md ${
                      !addressInfo ? "bg-[#393646]/[0.5]" : "bg-[#393646]"
                    } text-[#EEEEEE] text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center`}
                    onClick={(e) => {
                      if (!addressInfo) setShowError(true);
                      else makePayment(e);
                    }}
                  >
                    Pay on arrival
                    <FontAwesomeIcon icon={faTruckArrowRight} />
                  </button>
                  <button
                    name="card"
                    className={`w-full py-4 rounded-md ${
                      !addressInfo ? "bg-[#393646]/[0.5]" : "bg-[#393646]"
                    } text-[#EEEEEE] text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center`}
                    onClick={(e) => {
                      if (!addressInfo) setShowError(true);
                      else makePayment(e);
                    }}
                  >
                    Pay with card
                    <FontAwesomeIcon icon={faCreditCard} />
                  </button>
                </div>
                {showError && (
                  <div className="text-red-600 mt-1">
                    Please enter your address information.
                  </div>
                )}
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px]">
            <FontAwesomeIcon
              color="#EEEEEE"
              icon={faCartShopping}
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

export default Cart;

export async function getServerSideProps(ctx) {
  const user = getUser(ctx);

  return {
    props: { user },
  };
}
