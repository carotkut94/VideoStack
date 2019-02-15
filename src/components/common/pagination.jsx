import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemCount, pageSize, onPageChanged, currentPage } = props;
  const pagesCount = Math.ceil(itemCount / pageSize);

  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChanged(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
