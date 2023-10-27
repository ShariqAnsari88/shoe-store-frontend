import { getUser } from "@/store/contexts/userContext";
import { setUserInfo } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "@/components/screens/HomePage";
import ComingSoon from "@/components/screens/ComingSoon";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { revertAll } from "@/store/rootReducer";

export default function Home({
  products,
  shirts,
  bandanas,
  userData,
  ...rest
}) {
  console.log(shirts);
  const dispatch = useDispatch();
  const { locale, query } = useRouter();

  const isReleased = query.released;

  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;

  useEffect(() => {
    dispatch(setUserInfo(userData));
  }, []);

  useEffect(() => {
    dispatch(revertAll());
  }, [locale]);

  return (
    <main>
      {isReleased && <Header />}
      {isReleased ? (
        <HomePage products={products} shirts={shirts} bandanas={bandanas} />
      ) : (
        <ComingSoon />
      )}
      {isReleased && <Footer />}
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const products = await fetchDataFromApi(
    `/api/products?populate=*&sort=slug:desc&locale=${locale}`
  );

  const shirts = await fetchDataFromApi(
    `/api/products?populate=*&filters[subtitle][$contains]=Troyka&locale=${locale}`
  );

  const bandanas = await fetchDataFromApi(
    `/api/products?populate=*&filters[subtitle][$null]=true&locale=${locale}`
  );

  const userData = getUser(ctx);

  return {
    props: {
      shirts,
      bandanas,
      products,
      userData,
      ...(await serverSideTranslations(locale, [
        "common",
        "coming_soon",
        "nav",
        "forms",
        "footer",
        "buttons",
        "banner",
      ])),
      // Will be passed to the page component as props
    },
  };
}
