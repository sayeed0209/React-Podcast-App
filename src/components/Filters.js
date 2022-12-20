import React from "react";
import { usePodcastContext } from "../context/podcast_context.js";
const Filters = () => {
  const { handleFilter, searchTerm } = usePodcastContext();
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-3">
      <div className="input-group filter-container">
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          value={searchTerm}
          onChange={handleFilter}
          className="form-control"
          placeholder="Filter podcast..."
        />
      </div>
    </form>
  );
};

export default Filters;
