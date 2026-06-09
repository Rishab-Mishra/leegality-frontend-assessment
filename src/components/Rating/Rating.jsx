import "./Rating.css";

const Rating = ({ rating }) => {
  const filledStars = Math.round(rating);

  return (
    <div className="rating" aria-label={`${rating} out of 5 stars`}>
      <span className="rating__stars" aria-hidden="true">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < filledStars ? "is-filled" : ""}>
            ★
          </span>
        ))}
      </span>
      <span className="rating__value">({rating})</span>
    </div>
  );
};

export default Rating;
