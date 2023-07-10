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

const ProductDetails = ({ product, products }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const isWishlisted = useAppSelector((state) =>
    selectIsWishlisted(state, { ...product.data[0] })
  );
  const p = product?.data?.[0]?.attributes;


  const discount = getDiscountedPricePercentage(p.original_price, p.price);

  const notify = (buttonName) => {
    toast.success(`Success. Check your ${buttonName}!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[#EEEEEE] text-[34px] font-semibold mb-2 leading-tight">
              {p.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-[#EEEEEE] text-lg font-semibold mb-5">
              {p.subtitle}
            </div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="text-[rgb(238,238,238)] mr-2 text-lg font-semibold">
                {p.price} лв.
              </p>
              {p.original_price && (
                <>
                  {discount > 0 && (
                    <>
                      <p className="text-[#EEEEEE] text-base  font-medium line-through">
                        {p.original_price} лв.
                      </p>

                      <p className="ml-auto text-base font-medium text-green-500">
                        {discount}% off
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="text-[#EEEEEE]/[0.5] text-md font-medium">
              incl. of taxes
            </div>
            <div className="text-[#EEEEEE]/[0.5] text-md font-medium mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-[#EEEEEE] text-md font-semibold">
                  Select Size
                </div>
                <div className="text-[#EEEEEE]/[0.5] text-md font-medium cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`text-[#EEEEEE] border-[2px] border-[#393646] rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "cursor-pointer"
                        : "cursor-not-allowed bg-#393646/[0.1] opacity-50"
                    } ${
                      selectedSize === item.size
                        ? "border-[2px] border-[#D8E3E7]"
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
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
              {/* SHOW ERROR END */}
            </div>
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            <button
              name="cart"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#393646] text-[#F1F0F1] text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
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
              Add to Cart
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
              className="bg-[#EEEEEE] text-[#393646] w-full py-4 rounded-full border  border-[#393646] text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
            >
              Whishlist
              <FontAwesomeIcon
                icon={isWishlisted ? faHeartCircleCheck : faHeartCirclePlus}
                color={isWishlisted ? "#B22222" : "charcoal"}
              />
            </button>
            {/* WHISHLIST BUTTON END */}

            <div>
              <div className="text-[#EEEEEE] text-lg font-bold mb-5">
                Product Details
              </div>
              <div className="text-[#EEEEEE] markdown text-md mb-5">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
