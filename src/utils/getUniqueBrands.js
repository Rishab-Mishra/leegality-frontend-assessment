function getUniqueBrands(products) {
  return [...new Set(products.map((product) => product.brand).filter(Boolean))]
}

export default getUniqueBrands
