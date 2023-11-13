import HeroBanner from "../HeroBanner";
import ProductCard from "../ProductCard";

import SubscribeDialog from "../SubscribeDialog";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "next-i18next";
import ClimateSection from "../ClimateSection";
import Wrapper from "../Wrapper";

export default function HomePage({ shirts, productsNoShirt }) {
  const { t } = useTranslation("common");

  return (
    <>
      <ToastContainer />
      <SubscribeDialog />
      <Wrapper>
        <>
        <HeroBanner />
        <div className="bg-offWhite relative flex flex-col flex-1 p-6 mb-12 rounded-md gap-6 bg-opacity-90">
          <div className="rounded-md z-1 text-center">
            <h2 className="text-darkBlack p-4 rounded-md uppercase sm:text-[32px] my-6 text-[24px] font-semibold">
              {t("uncensored_collection")}
            </h2>
          </div>

          {shirts && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6">
              {shirts?.data?.map((product) => (
                <ProductCard
                  key={product?.id}
                  data={product}
                  border="border-0"
                />
              ))}
            </div>
          )}
        </div>
        {productsNoShirt && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 my-12 md:gap-6">
            {productsNoShirt?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        )}
        </>
      </Wrapper>
      <ClimateSection />
    </>
  );
}
