async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/products"); 
      productList = await response.json(); 
      
          renderProducts(productList); 
  
    } catch (error) {
      console.error("Məhsulları yükləyərkən xəta baş verdi:", error);
    }
  }
  
  function renderProducts(productList) {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = ""; 
  
    productList.forEach(product => {
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
      addToCart.href = "basket.html";
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
    const product = productList.find(p => p.id === productId);
    if (!product) return alert("Məhsul tapılmadı.");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} səbətə əlavə edildi!`);
  }
  
  function addToWishlist(productId) {
    const product = productList.find(p => p.id === productId);
    if (!product) return alert("Məhsul tapılmadı.");
    if (!wishlist.find(p => p.id === productId)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${product.title} wishlist-ə əlavə edildi!`);
    } else {
      alert("Məhsul artıq wishlist-dədir.");
    }
  }
  
  function goToDetails(productId) {
    const product = productList.find(p => p.id === productId);
    if (!product) return alert("Məhsul tapılmadı.");
    localStorage.setItem("productDetails", JSON.stringify(product));
    window.location.href = "details.html"; 
  }
  
  fetchProducts();
  


