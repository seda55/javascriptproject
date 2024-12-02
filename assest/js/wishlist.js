// // Wishlist məlumatlarını göstərən funksiya
// function renderWishlist() {
//     const wishlistContainer = document.getElementById("wishlist-container");
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     wishlistContainer.innerHTML = ""; // Mövcud məlumatları təmizlə
  
//     if (wishlist.length === 0) {
//       wishlistContainer.innerHTML = "<p>Your wishlist is empty!</p>";
//       return;
//     }
  
//     wishlist.forEach(product => {
//       const productCard = document.createElement("div");
//       productCard.classList.add("product-card");
  
//       const img = document.createElement("img");
//       img.src = product.image || "placeholder.jpg"; // Şəkil yoxdursa, placeholder istifadə et
//       img.alt = product.title || "Product Image";
  
//       const title = document.createElement("h3");
//       title.textContent = product.title || "Unnamed Product";
  
//       const price = document.createElement("p");
//       const productPrice = product.price ? product.price.toFixed(2) : "0.00"; // Qiyməti yoxlayıb ehtiyat dəyər təyin edin
//       price.textContent = `$${productPrice}`;
  
//       const removeButton = document.createElement("button");
//       removeButton.textContent = "Remove";
//       removeButton.addEventListener("click", () => removeFromWishlist(product.id));
  
//       productCard.appendChild(img);
//       productCard.appendChild(title);
//       productCard.appendChild(price);
//       productCard.appendChild(removeButton);
//       wishlistContainer.appendChild(productCard);
//     });
//   }
  
//   // Wishlist-dən məhsul silmə funksiyası
//   function removeFromWishlist(productId) {
//     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     wishlist = wishlist.filter(product => product.id !== productId);
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     renderWishlist();
//   }
  
//   // Səhifə yüklənəndə wishlist-i göstər
//   renderWishlist();
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // İstifadəçi daxil olub olmadığını yoxla
  if (!user) {
    alert("Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin və ya daxil olun.");
    window.location.href = "./register.html"; // Giriş/Qeydiyyat səhifəsinə yönləndir
  } else {
    // İstifadəçi daxil olubsa wishlist-i render et
    renderWishlist();
  }
});

// Wishlist məlumatlarını göstərən funksiya
function renderWishlist() {
  const wishlistContainer = document.getElementById("wishlist-container");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistContainer.innerHTML = ""; // Mövcud məlumatları təmizlə

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="empty-wishlist">
        <p>Your wishlist is empty!</p>
        <a href="./products.html" class="browse-products-btn">Browse Products</a>
      </div>`;
    return;
  }

  wishlist.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image || "placeholder.jpg"; // Şəkil yoxdursa, placeholder istifadə et
    img.alt = product.title || "Product Image";

    const title = document.createElement("h3");
    title.textContent = product.title || "Unnamed Product";

    const price = document.createElement("p");
    const productPrice = product.price ? product.price.toFixed(2) : "0.00"; // Qiyməti yoxlayıb ehtiyat dəyər təyin edin
    price.textContent = `$${productPrice}`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromWishlist(product.id));

    productCard.appendChild(img);
    productCard.appendChild(title);
    productCard.appendChild(price);
    productCard.appendChild(removeButton);
    wishlistContainer.appendChild(productCard);
  });
}

// Wishlist-dən məhsul silmə funksiyası
function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(product => product.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}
