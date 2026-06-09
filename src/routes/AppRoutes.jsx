import { Routes, Route } from "react-router-dom";

import ProductListing from "../pages/ProductListing/ProductListing";

import ProductDetails from "../pages/ProductDetails/ProductDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ProductListing />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />
    </Routes>
  );
};

export default AppRoutes;