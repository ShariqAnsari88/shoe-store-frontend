import Container from "@/components/Container";
import Wrapper from "@/components/Wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import Markdown from "react-markdown";
import { useRouter } from "next/router";
import { about } from "@/utils/markdowns";

function About() {
  const {locale} = useRouter()
  const { t } = useTranslation("about");
  return (
    <Container>
      <div className="bg-random bg-center bg-cover bg-fixed bg-no-repeat">
        <Wrapper className="flex flex-col justify-center items-center min-h-[800px] backdrop-blur-xl min-w-full py-10">
          <h2 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center pb-10">
            {t("who_are_we")}
          </h2>
          <div className="border border-1 md:w-[85%] gap-5 items-center justify-between">
            <Markdown className="about-us prose p-4 text-[18px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-offWhite">
              {about[locale]}
            </Markdown>
            {/* <Image
              width={1000}
              height={1000}
              className="md:h-[200px] md:w-full h-full object-cover"
              alt="img"
              src="/troyka-eye.png"
            /> */}
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
        "banner",
      ])),
    },
  };
}
