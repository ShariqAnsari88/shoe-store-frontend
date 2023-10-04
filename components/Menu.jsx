import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { useTranslation } from "next-i18next";

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  const { t } = useTranslation("nav");

  const navItems = [
    { id: 1, name: t("home"), url: "/" },
    { id: 2, name: t("about"), url: "/about" },
    { id: 3, name: t("category"), subMenu: true },
    { id: 4, name: t("contact"), url: "/contact" },
  ];

  return (
  <ul className="hidden md:flex item-center gap-3 font-semibold text-[18px] ">
      {navItems.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />

                {showCatMenu && (
                  <ul className="bg-offWhite absolute top-6 left-0 min-w-[250px] px-1 py-1 text-[#181516] shadow-lg">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-#393646/[0.03] rounded-md">
                            {c.name}
                            <span className="opacity-50 text-sm">
                              {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
