import { useEffect, useState } from "react";

export default function ProductForm({ onAddProduct, editingProduct }) {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct);
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProduct(product);

        setProduct({
            name: "",
            price: "",
            category: "",
            description: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "12px",
                marginBottom: "30px",
            }}
        >
            <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} />
            <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} />
            <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} />

            <button type="submit">
                {editingProduct ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
}