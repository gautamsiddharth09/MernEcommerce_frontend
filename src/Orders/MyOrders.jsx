import React, { useEffect } from "react";
import "./MyOrders.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { LaunchOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyOrders, removeErrors } from "../features/order/orderSlice";
import Loader from "../components/loader/Loader";
import PageTitle from "../components/pageTitle/PageTitle";
import { toast } from "react-toastify";

function MyOrders() {
  const { orders = [], loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  // Fetch orders once
  useEffect(() => { 
    dispatch(getAllMyOrders());
  }, [dispatch]);

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

  return (
    <>
      <Navbar />
      <PageTitle title="My Orders" />

      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <div className="my-orders-container">
          <h1>My Orders</h1>

          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items Count</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderItems?.length || 0}</td>

                    <td
                      style={{
                        color:
                          order.orderStatus === "Delivered" ? "green" : "red",
                        fontWeight: "600",
                      }}
                    >
                      {order.orderStatus}
                    </td>

                    <td>₹{order.totalPrice}</td>

                    <td>
                      <Link to={`/order/${order._id}`} className="order-link">
                        <LaunchOutlined />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="no-orders">
          <p className="no-order-message">No Orders Found</p>
        </div>
      )}

      <Footer />
    </>
  );
}

export default MyOrders;
