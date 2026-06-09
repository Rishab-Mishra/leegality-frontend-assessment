const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const start = Math.max(currentPage - 2, 1);
  const end = Math.min(currentPage + 2, totalPages);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return (
    <nav className="pagination" aria-label="Product pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Previous
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "is-active" : ""}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </nav>
  );
};

export default Pagination;
