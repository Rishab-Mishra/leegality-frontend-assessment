import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = async ({
  limit = 12,
  skip = 0,
  category = "",
  search = "",
  signal,
} = {}) => {
  const endpoint = category
    ? `/products/category/${encodeURIComponent(category)}`
    : search
      ? "/products/search"
      : "/products";

  const { data } = await api.get(endpoint, {
    params: {
      limit,
      skip,
      ...(search && !category ? { q: search } : {}),
    },
    signal,
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/products/categories");

  return data;
};

export default api;
