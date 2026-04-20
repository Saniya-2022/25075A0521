const products = [
    { id: 1, name: "Running Shoes", price: 1200, img: "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg" },
    { id: 2, name: "Smart Watch", price: 2500, img: "https://m.media-amazon.com/images/I/61y2VVWcGBL._SX679_.jpg" },
    { id: 3, name: "Backpack", price: 800, img: "https://m.media-amazon.com/images/I/81fPKd-2AYL._UY741_.jpg" },
    { id: 4, name: "Headphones", price: 1500, img: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg" }
];

// ADD TO CART
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

// LOAD CART
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    let total = 0;

    container.innerHTML = "";

    cart.forEach((id, i) => {
        let p = products.find(x => x.id === id);
        total += p.price;

        container.innerHTML += `
            <div class="card p-3 mb-2">
                <img src="${p.img}" style="width:100px;">
                <h5>${p.name}</h5>
                <p>₹${p.price}</p>
                <button onclick="removeItem(${i})" class="btn btn-danger">Remove</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// REMOVE
function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// REGISTER VALIDATION
function registerUser() {
    let u = document.getElementById("regUser").value;
    let p = document.getElementById("regPass").value;
    let c = document.getElementById("regConfirm").value;

    if (u === "" || p === "" || c === "") {
        alert("All fields required");
        return;
    }

    if (p.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (p !== c) {
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem("user", u);
    localStorage.setItem("pass", p);

    alert("Registered successfully");
    window.location.href = "login.html";
}

// LOGIN VALIDATION
function loginUser() {
    let u = document.getElementById("loginUser").value;
    let p = document.getElementById("loginPass").value;

    let su = localStorage.getItem("user");
    let sp = localStorage.getItem("pass");

    if (u === "" || p === "") {
        alert("Enter all fields");
        return;
    }

    if (u !== su || p !== sp) {
        alert("Invalid username or password");
        return;
    }

    alert("Login successful");
    window.location.href = "catalog.html";
}