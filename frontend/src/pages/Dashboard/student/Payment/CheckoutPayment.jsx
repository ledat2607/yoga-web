import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useUser from "../../../../hook/useUser";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { toast } from "react-toastify";

const CheckoutPayment = ({ price, cartItm }) => {
  const URL = `http://localhost:4000/payment-info?${
    cartItm && `classId=${cartItm}`
  }`;
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setCart(classesId);
      })
      .catch((err) => console.log(err));
  }, [currentUser?.emai]);

  console.log(cart);
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setMessage(error.message);
    } else {
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name || "Unknown",
            email: currentUser?.email || "Anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(`Error`);
    } else {
      if (paymentIntent.status === "succeeded") {
        const transactionId = paymentIntent.id;
        const paymentMethod = paymentIntent.payment_method;
        const amount = paymentIntent.amount / 100;
        const currency = paymentIntent.currency;
        const paymentStatus = paymentIntent.status;
        const userName = currentUser?.name;
        const userEmail = currentUser?.email;

        const data = {
          transactionId,
          paymentMethod,
          amount,
          currency,
          paymentStatus,
          userEmail,
          userName,
          classesId: cartItm ? [cartItm] : cart,
          date: new Date(),
        };
        console.log(data);
        fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res) {
              toast.success("Bạn đã thanh toán thành công !!");
              navigate("/dashboard/my-errol");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Phí thanh toán: <span className="text-secondary">{price} $</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-[40%]">
        <CardElement
          options={{
            base: {
              border: "1px solid",
              fontSize: "16px",
              color: "#424770",
              ":placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          }}
        />
        <button
          className="px-3 py-2 disabled:opacity-0 disabled:cursor-not-allowed bg-secondary text-white rounded-2xl mt-4"
          type="submit"
          disabled={isLoading || !stripe || !clientSecret}
        >
          Thanh toán
        </button>
        {message && <p className="text-red-500">{message}</p>}
        {succeeded && <p className="text-green-500">{succeeded}</p>}
      </form>
    </>
  );
};

export default CheckoutPayment;
