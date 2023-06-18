const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
import { createAsyncThunk } from '@reduxjs/toolkit'

export const handlePayment = createAsyncThunk(
  "payments/handlePayment",
  async ({ paymentMethod, products }, thunkAPI) => {
    if (paymentMethod === "card") {
      try {
        const stripe = await stripePromise;

        const res = await makePaymentRequest("/api/orders", {
          products,
          paymentMethod,
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
          paymentMethod,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);
