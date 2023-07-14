import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
// bg-[#EEEEEE]
const Footer = () => {
  return (
    <footer className="bg-[#393646] text-[#181516]  pt-14 pb-3">
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/contact"
              className="text-[#EEEEEE] font-normal font-medium uppercase text-sm cursor-pointer"
            >
              Стани партньор
            </Link>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="text-[#EEEEEE] font-normal font-medium uppercase text-sm">
                Помощ
              </div>
              <Link
                href="/contact"
                className="text-[#EEEEEE]] text-sm text-[#EEEEEE]/[0.5] hover:text-[#EEEEEE] cursor-pointer"
              >
                Свържи се с нас
              </Link>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <div
            onClick={() => window.open("https://facebook.com", "_blank")}
            className="w-10 h-10 rounded-full bg-[#EEEEEE]/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
          >
            <FaFacebookF size={20} />
          </div>
          <Link
            href="https://twitter.com"
            className="w-10 h-10 rounded-full bg-[#EEEEEE]/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
          >
            <FaTwitter size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full bg-[#EEEEEE]/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#EEEEEE]/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] text-[#EEEEEE]/[0.5] hover:text-white/[0.5] cursor-pointer text-center md:text-left">
          Съдържанието на този сайт е защитено с авторски права и принадлежи на
          © 2023 Troyka Wear.{" "}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-[#EEEEEE]/[0.5] hover:text-white/[0.5] cursor-pointer">
            Условия за продажба
          </div>
          <div className="text-[12px] text-[#EEEEEE]/[0.5] hover:text-white/[0.5] cursor-pointer">
            Условия за ползване
          </div>
          <div className="text-[12px] text-[#EEEEEE]/[0.5] hover:text-white/[0.5] cursor-pointer">
            Политика за поверителност
          </div>
        </div>
        {/* RIGHT END */}
      </Wrapper>
    </footer>
  );
};

export default Footer;
