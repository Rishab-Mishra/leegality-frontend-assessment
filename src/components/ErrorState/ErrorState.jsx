function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="listing-state listing-state--error" role="alert">
      <strong>Unable to load products</strong>
      <span>{message}</span>
    </div>
  );
}

export default ErrorState;
