// const sliderContainer = document.querySelector(".sliderContainer");
// const slides = document.querySelector(".slides");
// const slide = document.querySelectorAll(".slide");

// sliderContainer.addEventListener("mouseover", stopAutoSlide);
// sliderContainer.addEventListener("mouseleave", startAutoSlide);

// let currentIndex = 0;

// const nextBtn = document.querySelector(".next");
// const prevBtn = document.querySelector(".prev");

// const nextSlide = () => {
//   currentIndex = (currentIndex + 1) % slide.length;
//   updateSlider();
// };

// const prevSlide = () => {
//   currentIndex = (currentIndex - 1 + slide.length) % slide.length;
//   updateSlider();
// };

// function updateSlider() {
//   const newTranform = -currentIndex * 100 + "%";
//   slides.style.transform = `translateX(${newTranform})`;
// }

// let interval;

// function startAutoSlide() {
//   interval = setInterval(nextSlide, 1000);
// }

// function stopAutoSlide() {
//   clearInterval(interval);
// }
// startAutoSlide();

// // Məhsul siyahıları
// const dropdown = document.querySelector('.dropdown');
// const dropdownButton = document.querySelector('.dropdown-button');

// dropdownButton.addEventListener('click', () => {
//   dropdown.classList.toggle('open');
// });

// document.addEventListener('click', (event) => {
//   if (!dropdown.contains(event.target)) {
//     dropdown.classList.remove('open');
//   }
// });

// let productList = []; // API-dən gələn məhsullar
// let cart = JSON.parse(localStorage.getItem("cart")) || []; // Səbət məlumatları
// let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Wishlist məlumatları

// // Məhsulları API-dən yükləyən funksiya
// async function fetchProducts() {
//   try {
//     const response = await fetch("http://localhost:3000/products"); // API ünvanı
//     productList = await response.json(); // Məhsul siyahısını al
//     const slicedProductList = productList.slice(0, 3); // Yalnız ilk 3 məhsulu seç
//     renderProducts(slicedProductList); // Məhsulları göstər
//   } catch (error) {
//     console.error("Məhsulları yükləyərkən xəta baş verdi:", error);
//   }
// }



// document.addEventListener("DOMContentLoaded", () => {
//   const wishlistLink = document.getElementById("wishlist-link");
//   const basketLink = document.getElementById("basket-link");
//   const loginLink = document.getElementById("login-link");
//   const registerLink = document.getElementById("register-link");
//   const logoutLink = document.getElementById("logout-link");
//   const userInfo = document.getElementById("user-info");
//   const userName = document.getElementById("user-name");
//   const userAvatar = document.getElementById("user-avatar");

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Giriş yoxlanışı
//   if (user) {
//     loginLink.classList.add("hidden");
//     registerLink.classList.add("hidden");
//     logoutLink.classList.remove("hidden");
//     userInfo.classList.remove("hidden");
//     userName.textContent = user.name;
//     userAvatar.src = user.avatar || "./img/WhatsApp Image 2024-11-25 at 17.59.11.jpeg";
//   } else {
//     loginLink.classList.remove("hidden");
//     registerLink.classList.remove("hidden");
//     logoutLink.classList.add("hidden");
//     userInfo.classList.add("hidden");
//   }

//   // Wishlist və Basket bağlantılarına klik
//   const requireLogin = (e) => {
//     if (!user) {
//       e.preventDefault();
//       alert("Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin və ya daxil olun.");
//       window.location.href = "./register.html";
//     }
//   };

//   wishlistLink.addEventListener("click", requireLogin);
//   basketLink.addEventListener("click", requireLogin);

//   // Logout funksiyası
//   logoutLink.addEventListener("click", (e) => {
//     e.preventDefault();
//     localStorage.removeItem("user");
//     alert("Sistemdən uğurla çıxış etdiniz!");
//     window.location.href = "./index.html";
//   });
// });


// // Məhsulları göstərən funksiya
// function renderProducts(productList) {
//   const productContainer = document.getElementById("product-list");
//   productContainer.innerHTML = ""; // Köhnə məhsulları sil

//   productList.forEach(product => {
//     // Kartın əsas konteyneri
//     const productCard = document.createElement("div");
//     productCard.classList.add("product-card");

//     // Badge konteyneri (SALE və ürək ikonu üçün)
//     const productBadge = document.createElement("div");
//     productBadge.classList.add("product-badge");

//     // Ürək ikonu
//     const favoriteIcon = document.createElement("i");
//     favoriteIcon.classList.add("bi", "bi-heart", "favorite-icon");
//     productBadge.appendChild(favoriteIcon);

//     // Ürək ikonuna `click` hadisəsini əlavə et (wishlist üçün)
//     favoriteIcon.addEventListener("click", () => {
//       addToWishlist(product.id);
//     });

//     // Şəkil elementi
//     const img = document.createElement("img");
//     img.src = product.image;
//     img.alt = product.title;
//     img.classList.add("product-image");

//     // Şəkilə `click` hadisəsi əlavə et (detallar səhifəsinə keçid üçün)
//     img.addEventListener("click", () => {
//       goToDetails(product.id);
//     });

//     // Mətn konteyneri
//     const contentDiv = document.createElement("div");
//     contentDiv.classList.add("content");

//     // Məhsul adı
//     const title = document.createElement("h3");
//     title.classList.add("title");
//     title.textContent = product.title;

//     // Qiymət məlumatları
//     const price = document.createElement("p");
//     price.classList.add("price");
//     price.innerHTML = `$${product.price.toFixed(2)}`;

//     // "Səbətə əlavə et" düyməsi
//     const addToCart = document.createElement("a");
//     addToCart.href = "#";
//     addToCart.classList.add("add-to-cart");
//     addToCart.textContent = "Add to Cart";

//     // "Səbətə əlavə et" düyməsinə `click` hadisəsini əlavə et
//     addToCart.addEventListener("click", (e) => {
//       e.preventDefault(); // Default davranışı dayandır
//       addToCartHandler(product.id);
//     });

//     // Badge, şəkil və mətn elementlərini birləşdir
//     productCard.appendChild(productBadge);
//     productCard.appendChild(img);
//     contentDiv.appendChild(title);
//     contentDiv.appendChild(price);
//     contentDiv.appendChild(addToCart);
//     productCard.appendChild(contentDiv);

//     // Məhsul kartını konteynerə əlavə et
//     productContainer.appendChild(productCard);
//   });
// }

// // Səbətə əlavə etmə funksiyası
// function addToCartHandler(productId) {
//   const product = productList.find(p => p.id === productId);
//   if (!product) return alert("Məhsul tapılmadı.");
//   cart.push(product);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   alert(`${product.title} səbətə əlavə edildi!`);
// }

// // Wishlist-ə əlavə etmə funksiyası
// function addToWishlist(productId) {
//   const product = productList.find(p => p.id === productId);
//   if (!product) return alert("Məhsul tapılmadı.");
//   if (!wishlist.find(p => p.id === productId)) {
//     wishlist.push(product);
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     alert(`${product.title} wishlist-ə əlavə edildi!`);
//   } else {
//     alert("Məhsul artıq wishlist-dədir.");
//   }
// }

// function goToDetails(productId) {
//   const product = productList.find(p => p.id === productId);
//   if (!product) return alert("Məhsul tapılmadı.");
//   localStorage.setItem("productDetails", JSON.stringify(product));
//   window.location.href = "details.html"; // Detallar səhifəsinə yönləndir
// }

// fetchProducts();


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

// Məhsul siyahıları
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

let productList = []; // API-dən gələn məhsullar
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Səbət məlumatları
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Wishlist məlumatları

// Məhsulları API-dən yükləyən funksiya
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/products"); // API ünvanı
    productList = await response.json(); // Məhsul siyahısını al
    const slicedProductList = productList.slice(0, 3); // Yalnız ilk 3 məhsulu seç
    renderProducts(slicedProductList); // Məhsulları göstər
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

  // Giriş yoxlanışı
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

  // Wishlist və Basket bağlantılarına klik
  const requireLogin = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin və ya daxil olun.");
      window.location.href = "./register.html";
    }
  };

  wishlistLink.addEventListener("click", requireLogin);
  basketLink.addEventListener("click", requireLogin);

  // Logout funksiyası
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    alert("Sistemdən uğurla çıxış etdiniz!");
    window.location.href = "./index.html";
  });
});

// Qeydiyyatdan sonra istifadəçi məlumatlarını saxlayan funksiya
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

// Məhsulları göstərən funksiya
function renderProducts(productList) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; // Köhnə məhsulları sil

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

// Səbətə əlavə etmə funksiyası
function addToCartHandler(productId) {
  const product = productList.find((p) => p.id === productId);
  if (!product) return alert("Məhsul tapılmadı.");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} səbətə əlavə edildi!`);
}

// Wishlist-ə əlavə etmə funksiyası
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
