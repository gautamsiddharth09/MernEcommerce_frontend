import React, { useEffect, useState } from "react";
import "./Products.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import NewsLetter from "./NewsLetter";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import NoProducts from "../components/NoProducts";
import women_banner from "../assets/banner_women.png";
import Pagination from "../components/Pagination";
import PageTitle from "../components/pageTitle/PageTitle";

function Products() {
  const { loading, error, products, resultPerPage, totalPages } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract URL params
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
  const categoryFromURL = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);

  const categories = [
    "laptop",
    "mobile",
    "tv",
    "Top",
    "Jacket",
    "Toys",
    "Home Decor",
    "Footwear",
  ];

  // Fetch products whenever keyword, page, or category changes
  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category: selectedCategory }));
  }, [dispatch, keyword, currentPage, selectedCategory]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  // Update URL when page changes
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);

      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) newSearchParams.delete("page");
      else newSearchParams.set("page", page);

      navigate(`?${newSearchParams.toString()}`);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // reset to first page

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", category);
    newSearchParams.delete("page"); // reset page in URL
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />
          <img className="women_banner" src={women_banner} alt="Women Banner" />
          <div className="products-layout">
            <div className="filter-section">
              <h3 className="filter-heading">CATEGORIES</h3>
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={selectedCategory === cat ? "active-category" : ""}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="products-section">
              {products.length > 0 ? (
                <div className="products-product-container">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProducts keyword={keyword} />
              )}

              <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
          <NewsLetter />
          <Footer />
        </>
      )}
    </>
  );
}

export default Products;