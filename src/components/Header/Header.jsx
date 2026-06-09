import "./Header.css";

const Header = ({
  searchValue = "",
  onSearchChange,
  onMenuClick,
  showFilters = true,
  showSearchBar = true
}) => {
  return (
    <header className="storefront__header">
      <button
        type="button"
        className={`header-icon-button ${
          !showFilters
            ? "header-icon-button--hidden"
            : ""
        }`}
        aria-label="Open filters"
        onClick={onMenuClick}
      >
        <span />
        <span />
        <span />
      </button>

      <label className="search-box">
        <span
          className="search-box__icon"
          aria-hidden="true"
        />

        <input
          type="search"
          value={searchValue}
          placeholder="Search products..."
          onChange={onSearchChange}
        />
      </label>

      <div
        className="header-actions"
        aria-label="Account shortcuts"
      >
        <button type="button" aria-label="Shopping cart">
          <span
            className="cart-icon"
            aria-hidden="true"
          />
        </button>

        <button type="button" aria-label="Favorites">
          <span
            className="heart-icon"
            aria-hidden="true"
          >
            ♥
          </span>
        </button>

        <button type="button" aria-label="Account">
          <span
            className="account-icon"
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;