import React, { useState, useEffect } from "react";
import shopImage from "/public/favicon.ico";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistItems } from "@/store/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const wishlistItems = useAppSelector(selectWishlistItems);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  return (
    <header
      className={`border-b-[2px] border-neonGreen w-full h-[50px] md:h-[80px] bg-[#181516] flex items-center justify-between z-20 sticky transition-transform duration-300 ${show}`}
    >
      <div className="flex justify-between items-center w-full px-4">
        <Link href="/">
          <h1 className="md:text-[38px] text-[26px] font-hearthLess">Troyka Wear</h1>
          {/* <Image alt="img" src={shopImage} className="w-[70px] md:w-[100px]" /> */}
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-0 text-black">
          {/* Icon start */}
          <Link href="/profile">
            <div className="text-[#EEEEEE] border-[#D8E3E7] w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-white/[0.05] cursor-pointer relative">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Link>
          <Link href="/wishlist">
            <div className="text-[#EEEEEE] border-[#D8E3E7] w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-[#EEEEEE]/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
              {wishlistItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-[#B22222] absolute top-1 left-5 md:left-7 text-[#EEEEEE] text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {wishlistItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/* Icon start */}
          <Link href="/cart">
            <div className="text-[#EEEEEE] border-[#D8E3E7] w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-[#EEEEEE]/[0.05] cursor-pointer relative">
              <FontAwesomeIcon icon={faCartShopping} />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-[#B22222] absolute top-1 left-5 md:left-7 text-[#EEEEEE] text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-#393646/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                color="#EEEEEE"
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                color="#EEEEEE"
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </div>
    </header>
  );
};

export default Header;

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies.jwt) {
    user = cookies.user;
  }

  return {
    props: {
      user,
      cookies,
    },
  };
}
