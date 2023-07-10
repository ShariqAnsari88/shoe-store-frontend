const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Router } from "next/router";

export const handlePayment = createAsyncThunk(
  "payments/handlePayment",
  async ({ paymentMethod, products, addressInfo, user, totalPrice }) => {
    if (paymentMethod === "card") {
      try {
        const stripe = await stripePromise;

        const res = await makePaymentRequest("/api/orders", {
          products,
          paymentMethod,
          status: 'active',
          addressInfo,
          user,
          totalPrice
        });

        await stripe.redirectToCheckout({ 
          sessionId: res.stripeSession.id,
        });

      } catch (error) {
        Router.replace("/failed")
        console.log(error);
      }
    } else {
      try {
        await makePaymentRequest("/api/orders", {
          products,
          paymentMethod,
          status: 'active',
          addressInfo,
          user,
          totalPrice
        });
      } catch (error) {
        Router.replace("/failed")
        console.log(error);
      }
    }
  }
);
