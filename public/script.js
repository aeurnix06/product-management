const productContainer = document.getElementById("products");
const productForm = document.getElementById("productForm");

async function fetchProducts() {
    const res = await fetch("/products");
    const data = await res.json();

    productContainer.innerHTML = "";

    data.data.forEach((product) => {
        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Category: ${product.category}</p>
        `;

        productContainer.appendChild(div);
    });
}

productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        category: document.getElementById("category").value,
    };

    await fetch("/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    productForm.reset();
    fetchProducts();
});

fetchProducts();