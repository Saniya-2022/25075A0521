/**
 * 
 */// =====================
// PRODUCTS
// =====================
const products = [
    { id: 1, name: "Running Shoes", price: 1200, img: "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg" },
    { id: 2, name: "Smart Watch", price: 2500, img: "https://m.media-amazon.com/images/I/61y2VVWcGBL._SX679_.jpg" },
    { id: 3, name: "Backpack", price: 800, img: "https://m.media-amazon.com/images/I/81fPKd-2AYL._UY741_.jpg" },
    { id: 4, name: "Headphones", price: 1500, img: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg" }
];


// =====================
// ADD TO CART
// =====================
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
}


// =====================
// LOAD CART
// =====================
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");

    if (!container || !totalBox) return;

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Cart is empty</p>";
        totalBox.innerText = "Total: ₹0";
        return;
    }

    for (let i = 0; i < cart.length; i++) {

        let product = products.find(p => p.id === cart[i]);
        if (!product) continue;

        total += product.price;

        container.innerHTML += `
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px; padding:10px; background:white; border-radius:8px;">
                
                <img src="${product.img}" style="width:80px; height:80px; object-fit:contain;">

                <div>
                    <h4>${product.name}</h4>
                    <p>₹${product.price}</p>
                </div>

                <button onclick="removeItem(${i})" style="background:red; color:white; border:none; padding:6px 10px;">
                    Remove
                </button>
            </div>
        `;
    }

    totalBox.innerText = "Total: ₹" + total;
}


// =====================
// REMOVE ITEM
// =====================
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


// =====================
// CLEAR CART (OPTIONAL)
// =====================
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}