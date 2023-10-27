import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

function EmptyOrders() {
  const { t } = useTranslation(["profile", "buttons"]);
  return (
    <div className="flex flex-1 my-auto h-[full] w-full">
      <div className="flex flex-1 flex-col justify-center items-center">
        <FontAwesomeIcon
         size="10x"
          className="mb-10"
          icon={faInbox}
        />
        <h3 className="text-center">{t("no_orders")}</h3>
        <Link
          href="/"
          className="py-4 px-8 rounded-full bg-gradient-to-r from-[#0ba360] to-[#3cba92] text-offWhite font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
        >
          {t("continue", { ns: "buttons" })}
        </Link>
      </div>
    </div>
  );
}

export default EmptyOrders;
