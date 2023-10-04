import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const options = ["en", "it", "bg"];

export default function LanguageSwitcher() {
  const { locale } = useRouter();

  return (
    <div className="flex gap-10 justify-center items-center">
      {options.map((option, index) => (
        <Link
          href="/"
          locale={option}
          className={`transition ease-in-out border-[1px] w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-500/[0.5] ${
            option === locale ? "bg-neonGreen" : null
          }`}
          key={`${option}-${index}`}
        >
          {option.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
