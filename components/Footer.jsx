import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import Image from "next/image";
import { useTranslation } from "next-i18next";
// bg-darkBlack
const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer className="flex justify-center md:flex-row flex-col items-center gap-2 bg-offWhite text-[#181516]">
      <Image
        alt="img"
        width={600}
        height={600}
        className="w-32 h-full"
        src="/logo-black.png"
      />
      <div className="md:min-w-[55%] pb-8">
        <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] pt-10">
          {/* LEFT START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
            {/* MENU START */}
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="text-darkBlack text-center md:text-left font-semibold uppercase text-sm cursor-pointer"
              >
                {t("become_partner")}
              </Link>
            </div>
            {/* MENU END */}

            {/* NORMAL MENU START */}
            <div className="flex gap-[50px]  md:gap-[75px] lg:gap-[100px] shrink-0">
              {/* MENU START */}
              <div className="flex flex-col gap-3 lg:text-center">
                <p className="text-darkBlack font-semibold uppercase text-sm">
                  {t("help")}
                </p>
                <Link
                  href="/contact"
                  className="text-darkBlack] text-sm text-darkBlack/[0.8] hover:text-darkBlack/[0.5] cursor-pointer"
                >
                  {t("contact_us")}
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
              onClick={() =>
                window.open("https://www.instagram.com/troykawear/")
              }
              className="w-10 h-10 rounded-full bg-darkBlack/[0.25] transition ease-in-out flex items-center justify-center text-black hover:text-darkBlack/[0.5] cursor-pointer"
            >
              <FaInstagram size={20} />
            </div>
          </div>
          {/* RIGHT END */}
        </Wrapper>
        <Wrapper className="flex justify-between mt-5 flex-col md:flex-row gap-[10px] md:gap-0">
          {/* LEFT START */}
          <p className="text-[12px] text-darkBlack/[0.8]  hover:text-darkBlack/[0.5] cursor-pointer mt-auto text-center md:text-left">
            {t("copyright")}
          </p>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div  className="flex flex-col gap-2 md:gap-1 text-center md:text-right flex-wrap justify-center">
            <a href="pdfs/Troyka_Wear_Returns.pdf" target="_blank" rel='noopener noreferrer' className="text-[12px] text-darkBlack hover:text-darkBlack/[0.5] cursor-pointer">
              {t("refund_policy")}
            </a>
            <a href="/pdfs/Troyka_Wear_Terms_Of_Service.pdf" target="_blank" rel='noopener noreferrer' className="text-[12px] text-darkBlack hover:text-darkBlack/[0.5] cursor-pointer">
              {t("terms_use")}
            </a>
            <a href="/pdfs/Troyka_Wear_Privacy_Policy.pdf" target='_blank' rel='noopener noreferrer' className="text-[12px] text-darkBlack hover:text-darkBlack/[0.5] cursor-pointer">
              {t("privacy_policy")}
            </a>
          </div>
          {/* RIGHT END */}
        </Wrapper>
      </div>
      {/* <Image width={600} height={600} className=" w-90 h-10" src="/troyka-eye.png"/> */}
    </footer>
  );
};

export default Footer;
