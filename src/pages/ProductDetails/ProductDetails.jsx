import { useNavigate, useParams } from "react-router-dom";

import Rating from "../../components/Rating/Rating";
import { getProductById } from "../../api/productApi";

import "./ProductDetails.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setProduct(product);
    };
    fetchProduct();
  }, [id]);

  console.log(product, "inside");

  return (
    <div className="product-details-page">

      <Header
        showFilters={false}
        showSearchBar={false}
      />

      <div className="product-details">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="product-details__content">
          <div className="product-details__image">
            <img
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className="product-details__info">
            <h1>{product.title}</h1>

            <div className="product-details__price">
              <strong>${product.price}</strong>

              <Rating rating={product.rating} />
            </div>

            <div className="product-details__meta">
              <p>
                <strong>Brand:</strong>{" "}
                {product.brand}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {product.category}
              </p>
            </div>

            <section className="section">
              <h2>Description</h2>

              <p>{product.description}</p>
            </section>

            <section className="section">
              <h2>Reviews</h2>

              {product.reviews?.map(
                (review, index) => (
                  <div
                    key={index}
                    className="review"
                  >
                    <div className="review__header">
                      <strong>
                        {review.reviewerName}
                      </strong>

                      <Rating
                        rating={review.rating}
                      />
                    </div>

                    <p>{review.comment}</p>
                  </div>
                )
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;