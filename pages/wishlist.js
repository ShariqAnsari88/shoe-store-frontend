import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistItems } from "@/store/wishlistSlice";
import WishlistItem from "@/components/wishlist/WishlistItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Wishlist = () => {
  const wishlistItems = useAppSelector(selectWishlistItems);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {wishlistItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-offWhite text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Твоите любими продукти!
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
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
        {wishlistItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px]">
            <FontAwesomeIcon
              color="#EEEEEE"
              icon={faHeart}
              className="my-10 w-20 md:w-40 flex flex-1"
            />
            <span className="text-offWhite text-xl font-bold">Празно</span>
            <span className="text-offWhite text-center mt-4">
              Изглежда, че не сте добавили любими продукти.
              <br />
              Разгледайте най-добрите категории.
            </span>
            <Link
              href="/"
              className="rounded-full py-4 px-8 bg-neonGreen text-offWhite text-lg font-medium transition ease-in-out active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Продължи пазаруването
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Wishlist;
