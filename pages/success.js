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
        <div className="max-w-[600px] rounded-lg p-5 border border-offWhite mx-auto flex flex-col">
          <div className="text-2xl font-bold text-offWhite">
            Благодаря, че пазарувахте с нас!
          </div>
          <div className="text-lg font-bold mt-2 text-offWhite">
            Вашата поръчка е успешна.
          </div>
          <div className="text-base mt-5 text-offWhite">
            За всяко запитване, свързано с продукт, изпратете имейл до
          </div>
          <div className="underline text-offWhite">threeoyka@gmail.com</div>

          <Link href="/" className="font-bold mt-5 text-offWhite">
            Продължи пазаруването
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;
