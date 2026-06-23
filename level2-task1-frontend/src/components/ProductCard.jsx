function ProductCard({ name, price }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;