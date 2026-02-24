import React from "react";
import "./Pagination.css";
import { useSelector } from "react-redux";

const Pagination = ({
  currentPage,
  onPageChange,
  activeClass = "active",
  nextPagetext = "Next",
  prevPagetext = "prev",
  firstPagetext = "1st",
  lastPagetext = "Last",
}) => {
  const { totalPages, products } = useSelector((state) => state.product);
 if (!products || products.length === 0 || totalPages <= 1) return null;

  //general page number
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  
  return (
    <div className="pagination">
      {/* previous and first Button */}
      {currentPage > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>
            {firstPagetext}
          </button>

          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {prevPagetext}
          </button>
        </>
      )}
    {/* display button */}

    {
      getPageNumbers().map((number)=>(
        <button className={`pagination-btn ${currentPage === number ? activeClass : ''}`} key={number} onClick={()=>onPageChange(number)}>{number}</button>
      ))
    }




      {/* last and next Button */}
      {currentPage < totalPages && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(currentPage+1)}>
            {nextPagetext}
          </button>

          <button
            className="pagination-btn"
            onClick={() => onPageChange(totalPages)}
          >
            {lastPagetext}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
