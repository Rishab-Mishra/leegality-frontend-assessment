import { useMemo } from "react";

function useProductFilter(products, filters) {
  return useMemo(() => {
    return products.filter((product) => {
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesMin =
        filters.minPrice === "" || product.price >= Number(filters.minPrice);
      const matchesMax =
        filters.maxPrice === "" || product.price <= Number(filters.maxPrice);

      return (
        matchesBrand &&
        matchesMin &&
        matchesMax
      );
    });
  }, [products, filters]);
}

export default useProductFilter;
