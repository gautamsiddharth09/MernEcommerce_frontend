import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "./Home.css";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import Offer from "../pages/Offer";
import NewsLetter from "../pages/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import Loader from "../components/loader/Loader";
import {toast} from 'react-toastify'
import PageTitle from "../components/pageTitle/PageTitle";


const Home = () => {
  const { loading, error, products, productCount } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();
  // product mounting, dispatching only our action
  useEffect(() => {
    dispatch(getProduct({keyword:""}));
  }, [dispatch]);

  //for error
  useEffect(()=>{
    if(error){
      toast.error(error.message,{position: 'top-center',autoClose:3000});
      dispatch(removeErrors())
    }
  },[dispatch,error])

  return (
    <>
   
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Home-My Website" />
          <Navbar />
          <ImageSlider />

          <div className="home-container">
            <div className="home-heading">Trending Now</div>
            <hr />
            <Offer />
            <div className="home-product-container">
              {products?.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          </div>
          <NewsLetter />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
