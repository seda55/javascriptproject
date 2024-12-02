document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Giriş yoxlanışı
  if (!user) {
    alert("Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin və ya daxil olun.");
    window.location.href = "./register.html"; // Giriş və ya qeydiyyat səhifəsinə yönləndir
  } else {
    // İstifadəçi daxil olubsa səbəti render et
    renderBasket();
  }
});

// Function to render the basket content
function renderBasket() {
  const basketContainer = document.getElementById("basket-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  basketContainer.innerHTML = ""; // Clear current basket content

  if (cart.length === 0) {
    basketContainer.innerHTML = "<p>Your basket is empty!</p>";
    return;
  }

  let subtotal = 0; // Variable to keep track of the subtotal

  cart.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `$${product.price.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(product.id));

    // Update subtotal
    subtotal += product.price;

    productCard.appendChild(img);
    productCard.appendChild(title);
    productCard.appendChild(price);
    productCard.appendChild(removeButton);
    basketContainer.appendChild(productCard);
  });

  // Update the total and subtotal on the page
  document.getElementById("subtotal").textContent = `US $${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `US $${subtotal.toFixed(2)}`;
}

// Function to remove a product from the basket
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(product => product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderBasket();
}

// Function to apply a discount
function applyDiscount() {
  const promoCode = document.getElementById("promo-code").value;
  const subtotal = parseFloat(document.getElementById("subtotal").textContent.replace("US $", ""));
  let discount = 0;

  // Example promo code logic: "DISCOUNT10" for 10% off
  if (promoCode === "DISCOUNT10") {
    discount = 0.1 * subtotal;
  }

  const total = subtotal - discount;
  document.getElementById("total").textContent = `US $${total.toFixed(2)}`;
}

// Function to confirm cart (just logs for now)
function confirmCart() {
  alert("Proceeding to checkout...");
}
