import HeroBanner from "../HeroBanner";
import ProductCard from "../ProductCard";
import Wrapper from "../Wrapper";

export default function HomePage({ products }) {

    return (
      <>
        <h1 className="text-neonGreenLighter font-hearthLess md:text-[126px] drop-shadow-[2px_12px_5px_rgb(51,255,20,0.4)] my-24 text-center text-[46px]">
          OMNE TRIUM PERFECTUM
        </h1>
        <HeroBanner />
        <Wrapper>
          <div className="p-4 rounded-md bg-offWhite z-1 text-center l my-[50px] md:my-[80px]">
            <p className="text-darkBlack text-[24px] md:text-[28px] mb-5 font-semibold leading-tight">
              Разгледай най-новите продукти
            </p>
            <p className="text-darkBlack text-md md:text-md font-normal max-w-[60%] mx-auto ">
              Лека междинна подметка Nike ZoomX е комбинирана с увеличен стек
              височини, за да се осигури омекотяване по време на продължителни
              участъци от бягане.
            </p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        </Wrapper>
      </>
    );
  };