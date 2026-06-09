import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../api/productApi";
import { PRODUCTS_PER_PAGE } from "../utils/constants";
import useDebounce from "./useDebounce";

export const useProducts = ({ page, category, search }) => {
  const debouncedSearch = useDebounce(search, 1000);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts({
          limit: PRODUCTS_PER_PAGE,
          skip: (page - 1) * PRODUCTS_PER_PAGE,
          category,
          search: debouncedSearch,
          signal: controller.signal,
        });

        const productsForPage =
          category && search
            ? data.products.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase()),
              )
            : data.products;

        setProducts(productsForPage);
        setTotalProducts(data.total);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message || "Failed to fetch products");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [page, category, debouncedSearch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return {
    products,
    categories,
    totalProducts,
    loading,
    error,
  };
};
