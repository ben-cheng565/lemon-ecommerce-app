import React from "react";

function SortBy(props) {
  return (
    <div className="row">
      <div className="col-3 d-flex justify-content-start">
        <div>
          {/* Sort by{" "} */}
          <select
            className="form-select form-select-sm"
            value={props.sort}
            onChange={(e) => props.handleSortChange(e)}
          >
            <option value="none">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="col-8"></div>
    </div>
  );
}

export default SortBy;
