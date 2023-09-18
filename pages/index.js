import { getUser } from "@/store/contexts/userContext";
import { setUserInfo } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "@/components/screens/HomePage";
import ComingSoon from "@/components/screens/ComingSoon";
import { useTranslation } from "next-i18next";
import { fetchDataFromApi } from "@/utils/api";

export default function Home({ products, userData, ...rest }) {
  const dispatch = useDispatch();

  const isReleased = process.env.IS_RELEASED === "true";
  
  useEffect(() => {
    dispatch(setUserInfo(userData));
  }, []);

  return (
    <main>
      {isReleased ? <HomePage products={products} /> : <ComingSoon />}
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const products = await fetchDataFromApi("/api/products?populate=*");

  const userData = getUser(ctx);

  return {
    props: {
      products,
      userData,
      ...(await serverSideTranslations(locale, ["common","coming_soon"])),
      // Will be passed to the page component as props
    },
  };
}
