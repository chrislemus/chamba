import { useState } from 'react';

export default function Pagination({
  page,
  setPage,
  pageLimit,
  setPageLimit,
  totalPages,
}) {
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);
  const currentPage = totalPages === 0 ? 0 : page;
  return (
    <div className="columns level p-3">
      <div className="column"></div>

      <div className="column is-narrow">
        <div className="select is-small">
          <select
            value={parseInt(pageLimit)}
            onChange={({ target }) => setPageLimit(target.value)}
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="30">30 per page</option>
          </select>
        </div>
      </div>
      <div className="column is-narrow">
        <p>{`${currentPage} of ${totalPages}`}</p>
      </div>
      <div className="column is-narrow">
        <button
          className="button is-primary is-inverted"
          disabled={page === 1}
          onClick={prevPage}
        >
          <span className="icon">
            <i className="fas fa-chevron-left"></i>
          </span>
        </button>
        <button
          className="button is-primary is-inverted ml-3"
          disabled={page === totalPages || totalPages === 0}
          onClick={nextPage}
        >
          <span className="icon">
            <i className="fas fa-chevron-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
}
