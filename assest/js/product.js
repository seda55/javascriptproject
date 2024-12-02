async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/products"); // API ünvanı
      productList = await response.json(); // Məhsul siyahısını al
      
          renderProducts(productList); // Məhsulları göstər
  
    } catch (error) {
      console.error("Məhsulları yükləyərkən xəta baş verdi:", error);
    }
  }
  
  // Məhsulları göstərən funksiya
  function renderProducts(productList) {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = ""; // Köhnə məhsulları sil
  
    productList.forEach(product => {
      // Kartın əsas konteyneri
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      // Badge konteyneri (SALE və ürək ikonu üçün)
      const productBadge = document.createElement("div");
      productBadge.classList.add("product-badge");
  
      // Ürək ikonu
      const favoriteIcon = document.createElement("i");
      favoriteIcon.classList.add("bi", "bi-heart", "favorite-icon");
      productBadge.appendChild(favoriteIcon);
  
      // Ürək ikonuna `click` hadisəsini əlavə et (wishlist üçün)
      favoriteIcon.addEventListener("click", () => {
        addToWishlist(product.id);
      });
  
      // Şəkil elementi
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.title;
      img.classList.add("product-image");
  
      // Şəkilə `click` hadisəsi əlavə et (detallar səhifəsinə keçid üçün)
      img.addEventListener("click", () => {
        goToDetails(product.id);
      });
  
      // Mətn konteyneri
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("content");
  
      // Məhsul adı
      const title = document.createElement("h3");
      title.classList.add("title");
      title.textContent = product.title;
  
      // Qiymət məlumatları
      const price = document.createElement("p");
      price.classList.add("price");
      price.innerHTML = `$${product.price.toFixed(2)}`;
  
      // "Səbətə əlavə et" düyməsi
      const addToCart = document.createElement("a");
      addToCart.href = "#";
      addToCart.classList.add("add-to-cart");
      addToCart.textContent = "Add to Cart";
  
      // "Səbətə əlavə et" düyməsinə `click` hadisəsini əlavə et
      addToCart.addEventListener("click", (e) => {
        e.preventDefault(); // Default davranışı dayandır
        addToCartHandler(product.id);
      });
  
      // Badge, şəkil və mətn elementlərini birləşdir
      productCard.appendChild(productBadge);
      productCard.appendChild(img);
      contentDiv.appendChild(title);
      contentDiv.appendChild(price);
      contentDiv.appendChild(addToCart);
      productCard.appendChild(contentDiv);
  
      // Məhsul kartını konteynerə əlavə et
      productContainer.appendChild(productCard);
    });
  }
  
  // Səbətə əlavə etmə funksiyası
  function addToCartHandler(productId) {
    const product = productList.find(p => p.id === productId);
    if (!product) return alert("Məhsul tapılmadı.");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} səbətə əlavə edildi!`);
  }
  
  // Wishlist-ə əlavə etmə funksiyası
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
  
  // Detallar səhifəsinə keçid funksiyası
  function goToDetails(productId) {
    const product = productList.find(p => p.id === productId);
    if (!product) return alert("Məhsul tapılmadı.");
    localStorage.setItem("productDetails", JSON.stringify(product));
    window.location.href = "details.html"; // Detallar səhifəsinə yönləndir
  }
  
  // Səhifə yüklənəndə məhsulları gətir
  fetchProducts();
  