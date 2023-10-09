import { useRouter } from "next/router";

export default function useCurrency() {
  const { locale } = useRouter();

  return {
    currency: locale !== 'bg' ? "€" : "ЛВ"
  } 
}
