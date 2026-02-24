import React from "react";
import "./NoProducts.css";
import no_product_found from '../assets/no_product_found.png'




function NoProducts({ keyword }) {
  return (
    <div className="no-product-content">
      <div className="no-products-icon"><img src={no_product_found} alt="no_product_found"/></div>

      <h3 className="no-products-title"> No Products Found</h3>

      <p className="no-products-message">
        {keyword
          ? `We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog.`
          : "No products are available. Please check back later"}
      </p>
    </div>
  );
}

export default NoProducts;
