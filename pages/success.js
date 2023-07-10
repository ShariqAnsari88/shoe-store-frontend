import React, { useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetCart } from "@/store/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(resetCart());
  }, []);

  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-[#EEEEEE] mx-auto flex flex-col">
          <div className="text-2xl font-bold text-[#EEEEEE]">Thanks for shopping with us!</div>
          <div className="text-lg font-bold mt-2 text-[#EEEEEE]">
            Your order has been placed successfully.
          </div>
          <div className="text-base mt-5 text-[#EEEEEE]">
            For any product related query, drop an email to
          </div>
          <div className="underline text-[#EEEEEE]">threeoyka@gmail.com</div>

          <Link href="/" className="font-bold mt-5 text-[#EEEEEE]">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;
