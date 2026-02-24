import React, { useEffect } from "react";
import "./OrderDetails.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import Loader from "../components/loader/Loader";
import PageTitle from "../components/pageTitle/PageTitle";
import { toast } from "react-toastify";

function OrderDetails() {
  const { orderId } = useParams();

  const { order = {}, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  // Fetch order once
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  // Handle errors separately
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt,
  } = order;

  const paymentStatus =
    paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid";

  const finalOrderStatus =
    paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;

  const orderStatusClass =
    finalOrderStatus === "Delivered"
      ? "status-tag delivered"
      : `status-tag ${finalOrderStatus?.toLowerCase()}`;

  const paymentStatusClass = `pay-tag ${
    paymentStatus === "Paid" ? "paid" : "not-paid"
  }`;

  return (
    <>
      <PageTitle title={`Order #${orderId}`} />
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className="order-box">
          {/* Order Items */}
          <div className="table-block">
            <h2 className="table-title">Order Items</h2>
            <table className="table-main">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-img"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping Info */}
          <div className="table-block">
            <h2 className="table-title">Shipping Info</h2>
            <table className="table-main">
              <tbody>
                <tr>
                  <th>Address</th>
                  <td>
                    {shippingInfo.address}, {shippingInfo.city},{" "}
                    {shippingInfo.state}, {shippingInfo.country} -{" "}
                    {shippingInfo.pinCode}
                  </td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{shippingInfo.phoneNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="table-block">
            <h2 className="table-title">Order Summary</h2>
            <table className="table-main">
              <tbody>
                <tr>
                  <th>Order Status</th>
                  <td>
                    <span className={orderStatusClass}>{finalOrderStatus}</span>
                  </td>
                </tr>

                <tr>
                  <th>Payment</th>
                  <td>
                    <span className={paymentStatusClass}>{paymentStatus}</span>
                  </td>
                </tr>

                {paidAt && (
                  <tr>
                    <th>Paid At</th>
                    <td>{new Date(paidAt).toLocaleString()}</td>
                  </tr>
                )}

                <tr>
                  <th>Items Price</th>
                  <td>₹{itemPrice}</td>
                </tr>

                <tr>
                  <th>Tax Price</th>
                  <td>₹{taxPrice}</td>
                </tr>

                <tr>
                  <th>Shipping Price</th>
                  <td>₹{shippingPrice}</td>
                </tr>

                <tr>
                  <th>Total Price</th>
                  <td>₹{totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default OrderDetails;
