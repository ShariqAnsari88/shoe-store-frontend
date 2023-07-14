import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border text-[#EEEEEE] border-[#EEEEEE] mx-auto flex flex-col">
          <div className="text-2xl font-bold text-[#EEEEEE]">
            Неуспешно плащане!
          </div>
          <div className="text-base mt-5 text-[#EEEEEE]">
            За всяко запитване, свързано с продукт, изпратете имейл до
          </div>
          <div className="underline text-[#EEEEEE]">threeoyka@gmail.com</div>

          <Link href="/" className="font-bold mt-5 text-[#EEEEEE]">
            Продължи пазаруването
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Failed;
