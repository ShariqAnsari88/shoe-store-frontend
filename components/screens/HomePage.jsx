import Image from "next/image";
import HeroBanner from "../HeroBanner";
import ProductCard from "../ProductCard";
import Wrapper from "../Wrapper";
import SubscribeDialog from "../SubscribeDialog";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "next-i18next";

export default function HomePage({ products, shirts, bandanas }) {
  const { t } = useTranslation("common");

  console.log(bandanas);
  return (
    <>
      <ToastContainer />
      <SubscribeDialog />
      <HeroBanner />
      <Wrapper>
        <div className="bg-offWhite flex flex-col flex-1 p-6 my-12 rounded-md gap-6 bg-opacity-90">
          <div className="rounded-md z-1 text-center ">
            <p className="text-darkBlack p-4 rounded-md uppercase text-[24px] md:text-[28px] font-semibold">
              {t("uncensored_collection")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6">
            {shirts?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} border="border-0" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 my-12 md:gap-6">
          {bandanas?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
      </Wrapper>
    </>
  );
}
