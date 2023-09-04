import React, { useMemo, useState } from "react";
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
import Divider from "@/components/Divider";
import Image from "next/image";

const Cart = (props) => {
  const router = useRouter();
  const user = props.user.username;
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const addressInfo = useAppSelector(selectUserAddress);
  const { cartItems } = useSelector((state) => state.cart);
  const deliveryPrice = 5;

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
        totalPrice: subTotal,
      })
    ).then((e) => {
      if (e.error) router.replace("/");
      else router.replace("/");
    });

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-offWhite text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Вашата количка
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-offWhite text-lg font-bold">Продукти</div>
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
                <div className="text-offWhite text-lg font-bold">Резюме</div>

                <div className="p-5 my-5 bg-#393646/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-normal text-offWhite">
                      Междинна сума
                    </div>
                    <div className="text-md md:text-lg font-normal text-offWhite">
                      {subTotal} лв
                    </div>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-normal text-offWhite">
                      Стойност на доставка
                    </div>
                    <div
                      className={`text-md md:text-lg font-normal text-neonGreenLighter ${
                        subTotal >= 50 && "line-through"
                      }`}
                    >
                      {deliveryPrice} лв
                    </div>
                  </div>
                  <div className="text-offWhite text-sm md:text-md py-5 border-t mt-5">
                  <div className=" text-offWhite text-xl rounded-md flex flex-row items-center gap-2 mb-6">
                    <Image
                      className="w-20"
                      alt="img"
                      width={600}
                      height={600}
                      src="/speedy-logo.jpeg"
                    />
                  </div>
                    Междинната сума отразява общата цена на вашата поръчка,
                    включително мита и данъци, преди всички приложими отстъпки.
                    Не включва разходи за доставка и международна транзакционни
                    такси.
                  </div>
                </div>

                {/* BUTTON START */}
                <div className="flex space-x-3 flex-row justify-between">
                  <button
                    name="arrive"
                    className={`transition ease-in-out w-full py-4 rounded-md ${
                      !addressInfo ? "bg-neonGreen/[0.5]" : "bg-neonGreen"
                    } text-offWhite text-md font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center`}
                    onClick={(e) => {
                      е.preventDefault()
                      if (!addressInfo) setShowError(true);
                      else makePayment(e);
                    }}
                  >
                    Наложен платеж
                    <FontAwesomeIcon icon={faTruckArrowRight} />
                  </button>
                  <button
                    name="card"
                    className={`transition ease-in-out w-full py-4 rounded-md ${
                      !addressInfo ? "bg-neonGreen/[0.5]" : "bg-neonGreen"
                    } text-offWhite text-md font-medium active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!addressInfo) setShowError(true);
                      else makePayment(e);
                    }}
                  >
                    Плати с карта
                    <FontAwesomeIcon icon={faCreditCard} />
                  </button>
                </div>
                {showError && (
                  <div className="text-red-600 mt-1">
                    Моля добавете адрес за доставка!
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
              Вашата количка е празна
            </span>
            <span className="text-offWhite text-center mt-4">
              Изглежда, че не сте добавили нищо в количката си.
              <br />
              Разгледайте най-добрите категории.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-neonGreen text-offWhite text-lg font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Продължи пазаруването
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
