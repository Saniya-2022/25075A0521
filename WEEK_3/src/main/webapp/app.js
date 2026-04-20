// =====================
// PRODUCT DATA
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
        container.innerHTML = "<p class='text-center'>Cart is empty</p>";
        totalBox.innerText = "Total: ₹0";
        return;
    }

    cart.forEach((id, index) => {
        let product = products.find(p => p.id === id);
        if (!product) return;

        total += product.price;

        container.innerHTML += `
            <div class="card mb-3 p-3 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">

                    <img src="${product.img}" style="width:80px; height:80px; object-fit:contain;">

                    <div>
                        <h5>${product.name}</h5>
                        <p>₹${product.price}</p>
                    </div>

                    <button class="btn btn-danger" onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>
            </div>
        `;
    });

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
// REGISTER VALIDATION
// =====================
function registerUser() {
    let username = document.getElementById("regUser").value.trim();
    let password = document.getElementById("regPass").value.trim();
    let confirm = document.getElementById("regConfirm").value.trim();

    if (username === "" || password === "" || confirm === "") {
        alert("All fields are required");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);

    alert("Registration successful");

    window.location.href = "login.html";
}


// =====================
// LOGIN VALIDATION
// =====================
function loginUser() {
    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPass").value.trim();

    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");

    if (username === "" || password === "") {
        alert("All fields are required");
        return;
    }

    if (username !== storedUser || password !== storedPass) {
        alert("Invalid username or password");
        return;
    }

    alert("Login successful");

    window.location.href = "catalog.html";
}