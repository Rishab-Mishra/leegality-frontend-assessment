import { useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  function openProduct() {
    navigate(`/product/${product.id}`);
  }

  return (
    <article
  className="product-card"
  role="link"
  tabIndex="0"
  onClick={openProduct}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      openProduct();
    }
  }}
>
  <div className="product-card__image">
    <img
      src={product.thumbnail}
      alt={product.title}
      loading="lazy"
    />
  </div>

  <div className="product-card__content">
    <h3>{product.title}</h3>

    <div className="product-card__footer">
      <strong>${product.price}</strong>
        <Rating rating={product.rating} />
      </div>
    </div>
  </article>
  );
};

export default ProductCard;
