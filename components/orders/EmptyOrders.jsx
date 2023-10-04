import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

function EmptyOrders() {
  const { t } = useTranslation(["profile", "buttons"]);
  return (
    <div className="flex flex-1 my-auto h-[100%] w-full">
      <div className="flex flex-1 gap-5 justify-center items-center flex-col">
        <FontAwesomeIcon size="10x" icon={faInbox} />
        <h2 className="text-center">{t("no_orders")}</h2>
        <Link
          href="/"
          className="py-4 px-8 rounded-full bg-neonGreen text-offWhite text-lg font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
        >
          {t("continue", { ns: "buttons" })}
        </Link>
      </div>
    </div>
  );
}

export default EmptyOrders;
