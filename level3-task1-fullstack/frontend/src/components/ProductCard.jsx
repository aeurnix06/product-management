export default function ProductCard({ product, onDelete, onEdit }) {
    return (
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
        }}>
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.description}</p>

            <button onClick={() => onEdit(product)}>Edit</button>

            <button
                onClick={() => onDelete(product._id)}
                style={{
                    marginLeft: "10px",
                    background: "crimson",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Delete
            </button>
        </div>
    );
}