import Container from "@/components/Container";
import Wrapper from "@/components/Wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";

function About() {
  const { t } = useTranslation("about");
  return (
    <Container>
      <div className="bg-random bg-center bg-cover bg-fixed bg-no-repeat">
        <Wrapper className="flex flex-col justify-center items-center min-h-[800px] backdrop-blur-xl min-w-full py-10">
          <h2 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center pb-10">
            {t("who_are_we")}
          </h2>
          <div className="flex border border-1 md:w-[85%] gap-5 items-center justify-between">
            <p className="p-4 text-[18px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-offWhite">
              Welcome to Troyka! We're far from your typical clothing brand;
              we're all about that premium streetwear with a unique twist.
              Although we call Bulgaria home, our aspirations know no borders.
              Our motto? “Omne Trium Perfectum”. Because great things come in
              threes! We believe in the power of the trio that drives the world
              of fashion: premium materials, A+ service, and a next-level
              experience is one tight package we always aim to deliver. Could
              fashion be more than just clothing? Our goal at Troyka is to take
              one step further the culture and social dynamics surrounding
              apparel. We're committed to provide physical and digital
              experiences for our clients, granting them privileged access to
              exclusive content and events. What led us to start in 2020? It was
              the burning desire to blur the lines between high fashion and
              streetwear. Since then, every stitch, pattern and thread is picked
              with care and handmade with commitment to detail. Our clothes are
              stories that match your style. Experience the pleasure of
              clothing. Your journey with Troyka continues…
            </p>
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
