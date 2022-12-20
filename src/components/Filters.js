import React from "react";

const Filters = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-3">
      <div className="input-group filter-container">
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          value=""
          className="form-control"
          placeholder="Filter podcast..."
        />
      </div>
    </form>
  );
};

export default Filters;
