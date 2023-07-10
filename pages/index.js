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
      <HeroBanner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[#F1F0F1] text-[28px] md:text-[34px] mb-5 font-normal leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-[#F1F0F1] text-md md:text-xl font-normal">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
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
