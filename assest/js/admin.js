// Detalları göstərən funksiya
function renderProductDetails() {
    const productDetailsContainer = document.getElementById("product-details");
    const product = JSON.parse(localStorage.getItem("productDetails"));
  
    if (!product) {
      productDetailsContainer.innerHTML = "<p>Product details not found!</p>";
      return;
    }
  
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
  
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
  
    const title = document.createElement("h3");
    title.textContent = product.title;
  
    const description = document.createElement("p");
    description.textContent = product.description;
  
    const price = document.createElement("p");
    price.textContent = `$${product.price.toFixed(2)}`;
  
    const addToCart = document.createElement("button");
    addToCart.textContent = "Add to Cart";
    addToCart.addEventListener("click", () => addToCartHandler(product));
  
    productCard.appendChild(img);
    productCard.appendChild(title);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(addToCart);
    productDetailsContainer.appendChild(productCard);
  }
  
  // Səbətə əlavə etmə funksiyası
  function addToCartHandler(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  }
  
  // Detalları göstər
  renderProductDetails();
  