const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
import { useRouter } from "next/router";



const usePayment = () => {

  const router = useRouter()

   const handlePayment = async (e, products) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  
    const name = e.target.name;
  
    if (name === "card") {
      try {
        const stripe = await stripePromise;
  
        const res = await makePaymentRequest("/api/orders", {
          products,
          paymentMethod: name,
        });
        await stripe.redirectToCheckout({
          sessionId: res.stripeSession.id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await makePaymentRequest("/api/orders", {
          products,
          paymentMethod: name,
        });
        router.push('/success')
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { handlePayment }
}

export default usePayment

