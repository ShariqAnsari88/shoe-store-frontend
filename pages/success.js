import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetCart } from "@/store/cartSlice";
import { deleteDataFromApi, fetchDataFromApi } from "@/utils/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Success = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["order"]);

  useEffect(() => {
    const deleteUnpaidOrder = async () => {
      const res = await fetchDataFromApi(`/api/orders?populate=*`);

      let orderNotPaid = res?.data.find((item) => !item?.attributes?.isPaid && item.attributes.paymentMethod === 'card')

      if (orderNotPaid) {
        await deleteDataFromApi(`/api/orders/${orderNotPaid?.id}`);
        console.info("...DELETED");
      } else {
        console.info("....NO UNPAID ORDERS")
      }
      return;
    };

    deleteUnpaidOrder();

    dispatch(resetCart());
  }, []);

  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-offWhite mx-auto flex flex-col">
          <div className="text-2xl font-bold text-offWhite">
            {t("title_success")}
          </div>
          <div className="text-lg font-bold mt-2 text-offWhite">
            {t("order_success")}
          </div>
          <div className="text-base mt-5 text-offWhite">
            {t("title_success")}
          </div>
          <div className="underline text-offWhite">troyka@gmail.com</div>

          <Link
            href="/"
            className="font-bold mt-5 bg-gradient-to-r from-[#0ba360] to-[#3cba92] p-2 w-52 hover:opacity-75 text-center rounded-md text-offWhite"
          >
            {t("continue_shopping")}
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;

export async function getStaticProps(ctx) {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["order"])),
    },
  };
}
