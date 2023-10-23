import Image from "next/image";
import HeroBanner from "../HeroBanner";
import ProductCard from "../ProductCard";
import Wrapper from "../Wrapper";
import SubscribeDialog from "../SubscribeDialog";
import { ToastContainer } from "react-toastify";

export default function HomePage({ products }) {

    return (
      <>
        <ToastContainer />
        <SubscribeDialog />
        <HeroBanner />
        <Wrapper>
          <div className="p-4 rounded-md bg-offWhite z-1 text-center my-[50px] md:my-[80px]">
            <p className="text-darkBlack text-[24px] md:text-[28px] mb-5 font-semibold leading-tight">
              Разгледай най-новите продукти
            </p>
            <p className="text-darkBlack text-md md:text-md font-normal max-w-[60%] mx-auto ">
              Лека междинна подметка Nike ZoomX е комбинирана с увеличен стек
              височини, за да се осигури омекотяване по време на продължителни
              участъци от бягане.
            </p>
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        </Wrapper>
      </>
    );
  };