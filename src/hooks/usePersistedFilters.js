import { useEffect, useState } from "react";

const STORAGE_KEY = "product-listing-state";

const initialState = {
  page: 1,
  filters: {
    search: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  },
};

export default function usePersistedFilters() {
  const [state, setState] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateFilter = (name, value) => {
    setState((prev) => ({
      ...prev,
      page: 1,
      filters: {
        ...prev.filters,
        [name]: value,
      },
    }));
  };

  const updatePage = (page) => {
    setState((prev) => ({
      ...prev,
      page,
    }));
  };

  const clearFilters = () => {
    setState(initialState);
  };

  return {
    page: state.page,
    filters: state.filters,
    updateFilter,
    updatePage,
    clearFilters,
  };
}