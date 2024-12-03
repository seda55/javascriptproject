const sliderContainer = document.querySelector(".sliderContainer");
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

sliderContainer.addEventListener("mouseover", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

let currentIndex = 0;

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  updateSlider();
};

function updateSlider() {
  const newTranform = -currentIndex * 100 + "%";
  slides.style.transform = `translateX(${newTranform})`;
}

let interval;

function startAutoSlide() {
  interval = setInterval(nextSlide, 1000);
}

function stopAutoSlide() {
  clearInterval(interval);
}
startAutoSlide();

const dropdown = document.querySelector(".dropdown");
const dropdownButton = document.querySelector(".dropdown-button");

dropdownButton.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("open");
  }
});

let productList = []; 
let cart = JSON.parse(localStorage.getItem("cart")) || []; 
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; 
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/products"); 
    productList = await response.json(); 
    const slicedProductList = productList.slice(0, 3); 
    renderProducts(slicedProductList); 
  } catch (error) {
    console.error("Məhsulları yükləyərkən xəta baş verdi:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const wishlistLink = document.getElementById("wishlist-link");
  const basketLink = document.getElementById("basket-link");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");
  const userAvatar = document.getElementById("user-avatar");

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");
    logoutLink.classList.remove("hidden");
    userInfo.classList.remove("hidden");
    userName.textContent = user.name;
    userAvatar.src = user.avatar || "./img/default-avatar.jpeg";
  } else {
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
    logoutLink.classList.add("hidden");
    userInfo.classList.add("hidden");
  }

  const requireLogin = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin və ya daxil olun.");
      window.location.href = "./register.html";
    }
  };

  wishlistLink.addEventListener("click", requireLogin);
  basketLink.addEventListener("click", requireLogin);

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    alert("Sistemdən uğurla çıxış etdiniz!");
    window.location.href = "./index.html";
  });
});

function registerUser(name, avatar) {
  const user = {
    name: name,
    avatar: avatar || "./img/default-avatar.jpeg",
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Qeydiyyat uğurla tamamlandı!");
  updateUserInfo();
}

function updateUserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");
  const userAvatar = document.getElementById("user-avatar");

  if (user) {
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");
    logoutLink.classList.remove("hidden");
    userInfo.classList.remove("hidden");
    userName.textContent = user.name;
    userAvatar.src = user.avatar || "https://picsum.photos/200/300";
  } else {
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
    logoutLink.classList.add("hidden");
    userInfo.classList.add("hidden");
  }
}
function updateUserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");
  const userAvatar = document.getElementById("user-avatar");
  const wishlistLink = document.getElementById("wishlist-link");
  const basketLink = document.getElementById("basket-link");

  if (user) {
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");
    logoutLink.classList.remove("hidden");
    userInfo.classList.remove("hidden");
    userName.textContent = user.name;
    userAvatar.src = user.avatar || "https://picsum.photos/200/300";

    wishlistLink.addEventListener("click", () => {
      window.location.href = "./wishlist.html";
    });
    basketLink.addEventListener("click", () => {
      window.location.href = "./basket.html";
    });
  } else {
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
    logoutLink.classList.add("hidden");
    userInfo.classList.add("hidden");

    const requireLogin = (e) => {
      e.preventDefault();
      alert("Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin və ya daxil olun.");
      window.location.href = "./register.html";
    };

    wishlistLink.addEventListener("click", requireLogin);
    basketLink.addEventListener("click", requireLogin);
  }
}

function renderProducts(productList) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; 

  productList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productBadge = document.createElement("div");
    productBadge.classList.add("product-badge");

    const favoriteIcon = document.createElement("i");
    favoriteIcon.classList.add("bi", "bi-heart", "favorite-icon");
    productBadge.appendChild(favoriteIcon);

    favoriteIcon.addEventListener("click", () => {
      addToWishlist(product.id);
    });

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.classList.add("product-image");

    img.addEventListener("click", () => {
      goToDetails(product.id);
    });

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.classList.add("price");
    price.innerHTML = `$${product.price.toFixed(2)}`;

    const addToCart = document.createElement("a");
    addToCart.href = "#";
    addToCart.classList.add("add-to-cart");
    addToCart.textContent = "Add to Cart";

    addToCart.addEventListener("click", (e) => {
      e.preventDefault();
      addToCartHandler(product.id);
    });

    productCard.appendChild(productBadge);
    productCard.appendChild(img);
    contentDiv.appendChild(title);
    contentDiv.appendChild(price);
    contentDiv.appendChild(addToCart);
    productCard.appendChild(contentDiv);

    productContainer.appendChild(productCard);
  });
}

function addToCartHandler(productId) {
  const product = productList.find((p) => p.id === productId);
  if (!product) return alert("Məhsul tapılmadı.");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} səbətə əlavə edildi!`);
}


function addToWishlist(productId) {
  const product = productList.find((p) => p.id === productId);
  if (!product) return alert("Məhsul tapılmadı.");
  if (!wishlist.find((p) => p.id === productId)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.title} wishlist-ə əlavə edildi!`);
  } else {
    alert("Məhsul artıq wishlist-dədir.");
  }
}

function goToDetails(productId) {
  const product = productList.find((p) => p.id === productId);
  if (!product) return alert("Məhsul tapılmadı.");
  localStorage.setItem("productDetails", JSON.stringify(product));
  window.location.href = "details.html";
}

fetchProducts();
