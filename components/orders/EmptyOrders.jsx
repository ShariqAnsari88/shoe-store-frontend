import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function EmptyOrders() {
  return (
    <div className="flex flex-1 my-auto h-[90%] w-full">
      <div className="flex flex-1 gap-5 justify-center items-center flex-col">
        <FontAwesomeIcon size="10x" icon={faInbox} />
        <h2 className="">Все още нямате направени поръчки.</h2>
        <Link
              href="/"
              className="py-4 px-8 rounded-full bg-neonGreen text-offWhite text-lg font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Продължи пазаруването
            </Link>

      </div>
    </div>
  );
}

export default EmptyOrders;
