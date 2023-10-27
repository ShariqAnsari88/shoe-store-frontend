import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToWishlist } from "@/store/wishlistSlice";
import { useAppSelector } from "@/store/hooks";
import { selectIsWishlisted } from "@/store/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeartCircleCheck,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/components/Container";
import ImageSelector from "@/components/product/ImageSelector";
import Exclaimer from "@/components/Exclaimer";

const ProductDetails = ({ product, products }) => {
  const { t } = useTranslation(["product_details", "buttons", "common"]);
  const dispatch = useDispatch();
  const { productSlider, slug, outOfStock } = product.data[0].attributes;

  const isAccessory = slug.includes("band");

  const [selectedSize, setSelectedSize] = useState(
    isAccessory ? "M" : undefined
  );

  const [showError, setShowError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const hasSlider = productSlider && productSlider?.data?.length > 0;
  const isWishlisted = useAppSelector((state) =>
    selectIsWishlisted(state, { ...product.data[0] })
  );
  const p = product?.data?.[0]?.attributes;

  const discount = getDiscountedPricePercentage(p.original_price, p.price);

  const notify = (buttonName) => {
    toast.success(
      `${t("success", { ns: "buttons" })} ${
        buttonName === "wishlist"
          ? t("your_favourite_products", { ns: "buttons" })
          : t("your_cart", { ns: "buttons" })
      }!`,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  return (
    <Container>
      <div className="w-full py-12">
        <ToastContainer />
        <Wrapper>
          <div
            id="wrapperGrid"
            className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]"
          >
            {/* left column start */}
            <div className="flex gap-2 w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel
                selected={selectedImage}
                sliderImages={productSlider?.data}
                image={p.image.data[0]}
              />
              {hasSlider && (
                <ImageSelector
                  selected={selectedImage}
                  onSelect={setSelectedImage}
                  images={productSlider.data}
                />
              )}
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1] py-3">
              {/* PRODUCT TITLE */}
              <div className="text-neonGreenLighter text-[34px] font-semibold mb-2 leading-tight">
                {p.name}
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="text-[rgb(238,238,238)] mr-2 text-2xl font-semibold">
                  {t("price", { count: p.price })}
                </p>
                {p.original_price && (
                  <>
                    {discount > 0 && (
                      <>
                        <p className="text-offWhite text-base  font-medium line-through">
                          {t("price", { count: p.original_price })}
                        </p>

                        <p className="ml-auto text-base font-semibold bg-orange-400 rounded-md p-[5px]">
                          {t("off", { count: discount })}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="text-offWhite/[0.5] text-md font-medium mb-20">
                {t("taxes")}
              </div>

              {/* PRODUCT SIZE RANGE START */}
              {!isAccessory && (
                <div className="mb-10">
                  {/* HEADING START */}
                  <div className="flex justify-between mb-2">
                    <div className="text-offWhite text-md font-semibold">
                      {t("choose_size")}
                    </div>
                  </div>
                  {/* HEADING END */}

                  {/* SIZE START */}
                  <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                    {p.size.data.map((item, i) => (
                      <div
                        key={i}
                        className={`border-[2px] text-md border-neonGreen rounded-md text-center py-3 font-medium ${
                          item.enabled
                            ? "cursor-pointer"
                            : "cursor-not-allowed bg-#393646/[0.1] opacity-50"
                        } ${
                          selectedSize === item.size
                            ? "border-[2px] bg-neonGreenLighter text-darkBlack"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedSize(item.size);
                          setShowError(false);
                        }}
                      >
                        {item.size}
                      </div>
                    ))}
                  </div>
                  {/* SIZE END */}

                  {/* SHOW ERROR START */}
                  {showError && (
                    <div className="text-errorYellow mt-1">{t("error")}</div>
                  )}
                  {/* SHOW ERROR END */}
                </div>
              )}
              {/* PRODUCT SIZE RANGE END */}

              {/* ADD TO CART BUTTON START */}
              <div className="flex justify-between gap-2 mb-12">
              <button
                name="cart"
                className={`
                flex
                flex-1
                items-center 
                justify-center 
                gap-2 
                p-4 
                text-md
                rounded-full 
                bg-neonGreen  
                text-[#F1F0F1] 
                font-medium 
                transition 
                ease-in-out 
                active:scale-95 
                hover:opacity-75
                ${outOfStock && 'pointer-events-none'}
                `}
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById("wrapperGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    dispatch(
                      addToCart({
                        ...product?.data?.[0],
                        selectedSize,
                        oneQuantityPrice: p.price,
                      })
                    );
                    notify("cart");
                  }
                }}
              >
                {t("add_cart", { ns: "buttons" })}
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WHISHLIST BUTTON START */}
              <button
                name="wishlist"
                onClick={() => {
                  dispatch(
                    addToWishlist({
                      ...product?.data?.[0],
                      selectedSize,
                      oneQuantityPrice: p.price,
                    })
                  );
                  notify("wishlist");
                }}
                className="
                bg-offWhite
                text-neonGreen
                flex-1
                transition 
                ease-in-out 
                p-4 
                rounded-full 
              border-neonGreen 
                font-medium 
                active:scale-95 
                flex items-center 
                justify-center 
                gap-2 
                hover:opacity-75"
              >
                {isWishlisted
                  ? t("remove_wishlist", { ns: "buttons" })
                  : t("add_wishlist", { ns: "buttons" })}
                <FontAwesomeIcon
                  icon={isWishlisted ? faHeartCircleCheck : faHeartCirclePlus}
                  color={isWishlisted ? "#B22222" : "charcoal"}
                />
              </button>
              </div>
              <Exclaimer />
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-offWhite text-lg font-bold mb-5">
                  {t("details")}
                </div>
                <div className="text-offWhite markdown text-md mb-5">
                  <ReactMarkdown>{p.description}</ReactMarkdown>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>

          <RelatedProducts products={products} />
        </Wrapper>
      </div>
    </Container>
  );
};

export default ProductDetails;

export async function getServerSideProps({ params: { slug }, locale }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}&locale=${locale}`
  );

  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}&locale=${locale}`
  );

  return {
    props: {
      product,
      products,
      ...(await serverSideTranslations(locale, [
        "product_details",
        "buttons",
        "footer",
        "nav",
        "common",
      ])),
    },
  };
}
