import React from "react";
import "./Payment.css";
import PageTitle from "../components/pageTitle/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // complete payment
const completePayment = async (amount) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };

    // Get Razorpay key
    const { data: keyData } = await axios.get(
      `${API_URL}/api/v1/getKey`,
      config
    );

    const { key } = keyData;

    // Create order
    const { data: orderData } = await axios.post(
      `${API_URL}/api/v1/payment/process`,
      { amount },
      config
    );

    const { order } = orderData;

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "StyleNest",
      description: "Payment",
      order_id: order.id,

      handler: async function (response) {
        const { data } = await axios.post(
          `${API_URL}/api/v1/paymentVerification`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          config 
        );

        if (data.success) {
          navigate(`/paymentSuccess?reference=${data.reference}`);
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNumber,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    toast.error(error.response?.data?.message || error.message, {
      position: "top-center",
      autoClose: 3000,
    });
  }
};
  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go Back
        </Link>
        <button
          className="payment-btn"
          onClick={() => completePayment(orderItem.total)}
        >
          Pay ({orderItem.total})/-
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
