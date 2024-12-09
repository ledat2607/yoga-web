import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutPayment from "./CheckoutPayment";

const key =
  "pk_test_51QU72gBO22QuSkzc4nQh15lt05jfxXt8eYDs2OIfa1xsjfo42IIPNPX2KQCgzK6hQcaw1J6rcdpKlrVaqVzhiWDY00SRoeJu80";
const stripePromise = loadStripe(key);
const Payment = () => {
  const location = useLocation();
  const price = location?.state?.price;
  const cartItm = location.state?.itemId;

  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripePromise}>
        <CheckoutPayment price={price} cartItm={cartItm} />
      </Elements>
    </div>
  );
};

export default Payment;
