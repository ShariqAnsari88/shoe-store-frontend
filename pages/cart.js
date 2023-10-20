import React, { memo, useMemo, useState } from "react";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { handlePayment } from "@/pages/api/checkout/payments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCreditCard,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { getUser } from "@/store/contexts/userContext";
import { useAppSelector } from "@/store/hooks";
import { selectUserAddress, selectUserCredentials } from "@/store/userSlice";
import AddressForm from "@/components/profile/AddressForm";
import Divider from "@/components/Divider";
import Image from "next/image";
import Container from "@/components/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SelectAddress from "@/components/cart/SelectAddress";
import CredentialsForm from "@/components/profile/CredentialsForm";
import OfficeAddressForm from "@/components/profile/OfficeAddressForm";

const Cart = (props) => {
  const user = props.user.username;
  const { t } = useTranslation(["cart", "buttons"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const currency = locale !== "bg" ? "€" : "ЛВ";
  const [showError, setShowError] = useState(false);
  const addressInfo = useAppSelector(selectUserAddress);
  const credentialsInfo = useAppSelector(selectUserCredentials);
  const { cartItems } = useSelector((state) => state.cart);
  const [deliveryOption, setDeliveryOption] = useState("home");
  const deliveryPrice = deliveryOption === 'office' ? 5 : 7.50;

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  const calculateTotal = () => {
    if (locale === "bg") {
      return subTotal >= 50 ? subTotal : subTotal + deliveryPrice;
    } else {
      subTotal >= 25 ? subTotal : subTotal + deliveryPrice;
    }
  };

  const handleDeliveryOption = (option) => {
    if (!option) return;
    setDeliveryOption(option);
  };

  const makePayment = async (event) => {
    dispatch(
      handlePayment({
        paymentMethod: event.target.name,
        products: cartItems,
        addressInfo,
        user,
        totalPrice: calculateTotal(),
      })
    );
  };

  return (
    <Container>
      <div className="w-full md:py-20">
        <Wrapper>
          {cartItems.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-offWhite text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  {t("your_cart")}
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS START */}
                <div className="flex-[2]">
                  <div className="text-offWhite text-lg font-bold">
                    {t("products", { ns: "cart" })}
                  </div>
                  <div className="mb-10">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} data={item} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-6">
                    <SelectAddress
                      onSelect={handleDeliveryOption}
                      selected={deliveryOption}
                    />
                    <div className="flex flex-col gap-6">
                    <CredentialsForm />
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                    <AddressForm disabled={deliveryOption === "office"} />
                    <OfficeAddressForm disabled={deliveryOption === "home"} />
                    </div>
                    </div>
                  </div>
                </div>

                {/* CART ITEMS END */}

                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="text-offWhite text-lg font-bold">
                    {t("summary")}
                  </div>

                  <div className="p-5 my-5 bg-#393646/[0.05] rounded-xl">
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-normal text-offWhite">
                        {t("subtotal")}
                      </div>
                      <div className="text-md md:text-lg font-normal text-offWhite">
                        {subTotal} {currency}
                      </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-normal text-offWhite">
                        {t("shipping")}
                      </div>
                      <div
                        className={`text-md md:text-lg font-normal text-neonGreenLighter ${
                          subTotal >= 50 && "line-through"
                        }`}
                      >
                        {deliveryPrice} {currency}
                      </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                      <div className="uppercase text-md md:text-lg font-normal text-offWhite">
                        {t("total")}
                      </div>
                      <div className="uppercase text-md md:text-lg font-normal text-offWhite">
                        {calculateTotal()} {currency}
                      </div>
                    </div>
                    <Divider />
                    <div className="text-offWhite text-sm md:text-md py-5 mt-5">
                      <div className=" text-offWhite text-xl rounded-md flex flex-row items-center gap-2 mb-6">
                        <Image
                          className="w-20"
                          alt="img"
                          width={600}
                          height={600}
                          src="/speedy-logo.jpeg"
                        />
                      </div>
                      {t("shipping_description")}
                    </div>
                  </div>

                  {/* BUTTON START */}
                  <div className="flex space-x-3 flex-row justify-between">
                    <button
                      name="arrive"
                      className={`transition ease-in-out w-full py-4 rounded-md ${
                        !addressInfo || !credentialsInfo ? "disabled pointer-events-none" : "bg-neonGreen"
                      } text-offWhite text-md font-medium active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center`}
                      onClick={(e) => {
                        if (!addressInfo) setShowError(true);
                        else makePayment(e);
                      }}
                    >
                      {t("pay_arrival", { ns: "buttons" })}
                      <FontAwesomeIcon icon={faTruckArrowRight} />
                    </button>
                    <button
                      name="card"
                      className={`transition ease-in-out w-full py-4 rounded-md ${
                        !addressInfo || !credentialsInfo  ? "disabled pointer-events-none" : "bg-neonGreen"
                      } text-offWhite text-md font-medium active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center`}
                      onClick={(e) => {
                        if (!addressInfo) setShowError(true);
                        else makePayment(e);
                      }}
                    >
                      {t("pay_card", { ns: "buttons" })}
                      <FontAwesomeIcon icon={faCreditCard} />
                    </button>
                  </div>
                  {showError && (
                    <div className="text-errorYellow mt-1">
                      {t("address_error", { ns: "forms" })}
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
                className="my-10 w-20 md:w-40 flex flex-1"
              />
              <span className="text-offWhite text-xl font-bold">
                {t("empty")}
              </span>
              <span className="text-offWhite text-center max-w-md mt-4">
                {t("empty_description")}
              </span>
              <Link
                href="/"
                className="py-4 px-8 rounded-full bg-neonGreen text-offWhite text-lg font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
              >
                {t("continue", { ns: "buttons" })}
              </Link>
            </div>
          )}
        </Wrapper>
      </div>
    </Container>
  );
};

export default memo(Cart);

export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const user = getUser(ctx);

  return {
    props: {
      user,
      ...(await serverSideTranslations(locale, [
        "cart",
        "footer",
        "nav",
        "buttons",
        "forms",
      ])),
    },
  };
}
