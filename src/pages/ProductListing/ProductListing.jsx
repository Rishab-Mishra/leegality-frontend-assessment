import { useEffect, useMemo, useState } from "react";
import ErrorState from "../../components/ErrorState/ErrorState";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import useProductFilter from "../../hooks/useProductFilter";
import { useProducts } from "../../hooks/useProducts";
import { PRODUCTS_PER_PAGE } from "../../utils/constants";
import getUniqueBrands from "../../utils/getUniqueBrands";
import "./ProductListing.css";
import Header from "../../components/Header/Header";
import usePersistedFilters from "../../hooks/usePersistedFilters";

const ProductListing = () => {
  const {
    page,
    filters,
    updateFilter,
    updatePage,
    clearFilters,
  } = usePersistedFilters();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    products,
    categories,
    totalProducts,
    loading,
    error,
  } = useProducts({
    page,
    category: filters.category,
    search: filters.search.trim(),
  });
  const filteredProducts = useProductFilter(products, filters);

  const brands = useMemo(() => getUniqueBrands(products).sort(), [products]);
  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / PRODUCTS_PER_PAGE),
  );

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isSidebarOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [isSidebarOpen]);

  function changePage(nextPage) {
    updatePage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="storefront">
      <Header
        searchValue={filters.search}
        onSearchChange={(event) => updateFilter("search", event.target.value)}
        onMenuClick={() =>
          setIsSidebarOpen((prev) => !prev)
        }
      />

      <div
        className={`storefront__body ${isSidebarOpen ? "storefront__body--sidebar-open" : ""
          }`}
      >
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close filters"
          onClick={() => setIsSidebarOpen(false)}
        />

        <FilterSidebar
          filters={filters}
          categories={categories}
          brands={brands}
          resultCount={filteredProducts.length}
          totalProducts={totalProducts}
          isOpen={isSidebarOpen}
          onChange={updateFilter}
          onClear={clearFilters}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="products-panel">
          <div className="products-panel__summary">
            <strong>Products</strong>
            <span>
              {filteredProducts.length} shown of {totalProducts} items
            </span>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}

          {!loading && !error && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
