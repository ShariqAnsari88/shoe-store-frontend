import Container from "@/components/Container";
import Wrapper from "@/components/Wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";

function About() {
  const { t } = useTranslation("about")
  return (
    <Container>
      <div className="bg-random bg-center bg-cover bg-fixed bg-no-repeat">
        <Wrapper className="flex flex-col justify-center items-center min-h-[800px] backdrop-blur-xl min-w-full py-10">
          <h2 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center pb-10">
            {t("who_are_we")}
          </h2>
          <div className="flex flex-1 border border-1 md:w-[85%] gap-5 items-center flex-col justify-between">
            <p className="p-4 md:text-[22px] text-[18px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-offWhite">
              Добре дошли в Troyka, вашата любима дестинация за улично облекло
              от висока мода, което въплъщава уникалността във всеки детайл. Ние
              сме марка за дрехи, базирана в България, водена от амбицията да
              станем международна сензация. Нашето мото „Omne trium perfectum“
              ни води, черпейки от мъдростта, че великите неща идват по три.
              Точно както историята се повтаря, ние сме решени да оставим своя
              отпечатък с този начин на мислене.
              <br />
              <br /> В Troyka нашата цел е проста: да обединим изключителни
              продукти, първокласно обслужване и незабравимо изживяване в един
              привлекателен пакет. Представете си, че се наслаждавате на гурме
              ястие, само че този път това е моден празник за вашите сетива.
              Вярваме в светата троица качество, комфорт и индивидуалност, които
              стоят в основата на всичко, което предлагаме.
              <br />
              <br /> Нашето пътуване започна със страст към изработката на
              дрехи, които размиват границата между висшата мода и уличното
              облекло. Всеки бод, всеки модел и всяка нишка са внимателно
              подбрани и щателно проектирани на ръка. Нашите творения не просто
              ви обличат; те правят изявление, разказвайки история, която
              резонира с вашия стил.
              <br />
              <br /> Докато нашите корени са в България, стремежите ни се
              простират далеч отвъд границите. Ние сме на мисия да споделим
              нашата различна визия за мода със света и сме развълнувани да се
              присъедините към нас в това вълнуващо пътуване.
              <br />
              <br /> Благодарим Ви, че сте част от семейството на Тройка. Заедно
              оформяме модно бъдеще, което празнува изкуството на
              себеизразяването.
            </p>
            <Image
              width={1000}
              height={1000}
              className="md:h-[200px] md:w-full h-full object-cover"
              alt="img"
              src="/troyka-eye.png"
            />
          </div>
          {/* <Image width={600} height={600} className="w-24 h-24 mx-auto" alt="img" src="/logo-white.png"/> */}
        </Wrapper>
      </div>
    </Container>
  );
}

export default About;

export async function getServerSideProps(ctx) {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "footer",
        "nav",
        "banner"
      ])),
    },
  };
}
