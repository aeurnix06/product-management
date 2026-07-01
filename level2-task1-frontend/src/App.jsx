import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = [
  { id: 1, name: "Laptop", price: 65000 },
  { id: 2, name: "Headphones", price: 5000 },
  { id: 3, name: "Smart Watch", price: 12000 },
  { id: 4, name: "Keyboard", price: 2500 },
  { id: 5, name: "Mouse", price: 1200 },
  { id: 6, name: "Monitor", price: 15000 },
];

      setProducts(data);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <h2>Loading Products...</h2>;
  } 

  return (
    <div className="container">
      <h1>Product Management Dashboard</h1>
      <p>Level 2 Task 1 - React Frontend</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default App;