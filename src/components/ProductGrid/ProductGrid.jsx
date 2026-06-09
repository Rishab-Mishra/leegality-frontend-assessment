import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="empty-products">
        <strong>No products found</strong>
        <span>Try changing your search or filters.</span>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
