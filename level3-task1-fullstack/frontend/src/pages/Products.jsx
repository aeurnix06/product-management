import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../context/AuthContext";

export default function Products() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        if (editingProduct) {
            await API.put(`/products/${editingProduct._id}`, product);
            setEditingProduct(null);
        } else {
            await API.post("/products", product);
        }

        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await API.delete(`/products/${id}`);
        fetchProducts();
    };

    return (
        <div>
            <h2>Products</h2>

            {user?.role === "admin" && (
                <ProductForm
                    onAddProduct={addProduct}
                    editingProduct={editingProduct}
                />
            )}

            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={deleteProduct}
                    onEdit={setEditingProduct}
                />
            ))}
        </div>
    );
}