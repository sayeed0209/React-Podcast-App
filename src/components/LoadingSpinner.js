import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
