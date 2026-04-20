// =====================
// PRODUCT DATA
// =====================
const products = [
    {
        id: 1,
        name: "Running Shoes",
        price: 1200,
        img: "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2500,
        img: "https://m.media-amazon.com/images/I/61y2VVWcGBL._SX679_.jpg"
    },
    {
        id: 3,
        name: "Backpack",
        price: 800,
        img: "https://m.media-amazon.com/images/I/81fPKd-2AYL._UY741_.jpg"
    },
    {
        id: 4,
        name: "Headphones",
        price: 1500,
        img: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg"
    }
];


// =====================
// ADD TO CART
// =====================
function addToCart(id) {
    console.log("Adding product:", id); // DEBUG

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
}


// =====================
// LOAD CART
// =====================
function loadCart() {
    console.log("Loading cart..."); // DEBUG

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cartItems");
    let totalElement = document.getElementById("total");

    // Safety check
    if (!container || !totalElement) {
        console.log("Cart elements not found");
        return;
    }

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Cart is empty</p>";
        totalElement.innerText = "Total: ₹0";
        return;
    }

    cart.forEach((id, index) => {
        let product = products.find(p => p.id === id);

        if (!product) return;

        total += product.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${product.img}">
                <div>
                    <h4>${product.name}</h4>
                    <p>₹${product.price}</p>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalElement.innerText = "Total: ₹" + total;
}


// =====================
// REMOVE ITEM
// =====================
function removeItem(index) {
    console.log("Removing item at index:", index); // DEBUG

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart(); // refresh UI
}


// =====================
// CLEAR CART (OPTIONAL)
// =====================
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}