import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { getUser } from "@/store/contexts/userContext";
import { setUserInfo } from "@/store/userSlice";
import { fetchDataFromApi } from "@/utils/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home({ products, userData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserInfo(userData));
  }, []);

  return (
    <main>
      <h1 className="text-neonGreenLighter md:text-[126px] drop-shadow-[2px_12px_5px_rgb(51,255,20,0.4)] my-24 text-center font-hearthLess text-[46px]">OMNE TRIUM PERFECTUM</h1>
      <HeroBanner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[#F1F0F1] text-[28px] md:text-[34px] mb-5 font-normal leading-tight">
            Разгледай най-новите продукти
          </div>
          <div className="text-[#F1F0F1] text-md md:text-xl font-normal">
            Лека междинна подметка Nike ZoomX е комбинирана с увеличен стек
            височини, за да се осигури омекотяване по време на продължителни
            участъци от бягане.
          </div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
        {/* products grid end */}
      </Wrapper>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const products = await fetchDataFromApi("/api/products?populate=*");

  const userData = getUser(ctx);

  return {
    props: { products, userData },
  };
}
