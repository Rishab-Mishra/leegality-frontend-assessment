import { useEffect, useState } from "react";
import "./FilterSidebar.css";

function FilterSidebar({
  filters,
  categories,
  brands,
  isOpen,
  onChange,
  onClear,
  onClose,
}) {
  const [priceDraft, setPriceDraft] = useState({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });


  useEffect(() => {
    setPriceDraft({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
  }, [filters.minPrice, filters.maxPrice]);

  return (
    <>
      <aside
        className={`filter-sidebar ${isOpen ? "filter-sidebar--open" : ""
          }`}
      >
        <div className="filter-sidebar__content">
          <button
            className="filter-sidebar__close"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="filter-search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) =>
                onChange("search", e.target.value)
              }
            />
          </div>
          <div className="filter-section">
            <h3>Categories</h3>

            {categories.map((category) => {
              const value = category.slug || category;
              const label = category.name || category;

              return (
                <label
                  key={value}
                  className="checkbox-item"
                >
                  <input
                    type="checkbox"
                    checked={filters.category === value}
                    onChange={() =>
                      onChange(
                        "category",
                        filters.category === value
                          ? ""
                          : value
                      )
                    }
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>

          {/* Price */}
          <div className="filter-section">
            <h3>Price Range</h3>

            <div className="price-range">
              <input
                type="number"
                placeholder="Min"
                value={priceDraft.minPrice}
                onChange={(e) =>
                  setPriceDraft((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
              />

              <input
                type="number"
                placeholder="Max"
                value={priceDraft.maxPrice}
                onChange={(e) =>
                  setPriceDraft((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>

            <button
              className="apply-btn"
              onClick={() => {
                onChange("minPrice", priceDraft.minPrice);
                onChange("maxPrice", priceDraft.maxPrice);
              }}
            >
              Apply
            </button>
          </div>

          {/* Brands */}
          <div className="filter-section">
            <h3>Brands</h3>

            {brands.map((brand) => (
              <label
                key={brand}
                className="checkbox-item"
              >
                <input
                  type="checkbox"
                  checked={filters.brand === brand}
                  onChange={() =>
                    onChange(
                      "brand",
                      filters.brand === brand
                        ? ""
                        : brand
                    )
                  }
                />

                <span>{brand}</span>
              </label>
            ))}
          </div>

          <button
            className="clear-btn"
            onClick={onClear}
          >
            Clear Filters
          </button>
        </div>
      </aside>
    </>
  );
}

export default FilterSidebar;