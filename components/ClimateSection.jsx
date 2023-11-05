import React from "react";
import ClimateIcon from "./svg/ClimateIcon";
import Link from "next/link";

function ClimateSection(props) {
  const { bgColor } = props;

  return (
    <div
      className={`bg-offWhite absolute z-10 m-auto left-0 right-0 -top-8 shadow-md rounded-full flex w-16 h-16 items-center justify-center
     `}
    >
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://climate.stripe.com/gJpCUa"
        className="p-4 flex flex-row items-center justify-center hover:cursor-pointer hover:opacity-20 transition duration-300 ease-in-out gap-4"
      >
        <ClimateIcon />
      </Link>
    </div>
  );
}

export default ClimateSection;
