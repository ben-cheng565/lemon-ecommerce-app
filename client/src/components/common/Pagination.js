import React from "react";
import { Link } from "react-router-dom";

function Pagination(props) {
  return (
    <div className="row mt-3 justify-content-end">
      <div className="col-auto">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <span>&laquo;</span>
            </a>
          </li>
          {[...Array(props.pages).keys()].map((p) => (
            <li class={p + 1 === props.page ? "page-item active" : "page-item"}>
              <Link
                className="page-link"
                to={`${props.baseUrl}?currPage=${p + 1}`}
              >
                {p + 1}
              </Link>
            </li>
          ))}

          <li class="page-item">
            <a class="page-link" href="#">
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
