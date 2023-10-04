import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistItems } from "@/store/wishlistSlice";
import WishlistItem from "@/components/wishlist/WishlistItem";
import Container from "@/components/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WishlistEmpty from "@/components/wishlist/WishlistEmpty";
import { useTranslation } from "next-i18next";

const Wishlist = () => {
  const { t } = useTranslation("wishlist");
  const wishlistItems = useAppSelector(selectWishlistItems);

  return (
    <Container>
      <div className="w-full md:py-20">
        <Wrapper>
          {wishlistItems.length > 0 && (
            <>
              {/* HEADING AND PARAGRAPH START */}
              <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-offWhite text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  {t("favourite")}
                </div>
              </div>
              {/* HEADING AND PARAGRAPH END */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS START */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
                    {wishlistItems.map((item) => (
                      <WishlistItem key={item.id} wishlistItem={item} />
                    ))}
                  </div>
                </div>
                {/* CART ITEMS END */}
              </div>
              {/* CART CONTENT END */}
            </>
          )}

          {/* This is empty screen */}
          {wishlistItems.length < 1 && <WishlistEmpty />}
        </Wrapper>
      </div>
    </Container>
  );
};

export default Wishlist;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "nav",
        "wishlist",
        "buttons",
      ])),
    },
  };
}
