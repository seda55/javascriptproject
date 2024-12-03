
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault(); 
    const username = document.getElementById("username").value.trim(); 
    const password = document.getElementById("avatar").value.trim(); 

    if (!username || !password) {
        alert("Bütün sahələri doldurun!"); 
        return;
    }

    const user = {
        name: username,
        avatar: "https://via.placeholder.com/150", 
    };

    localStorage.setItem("user", JSON.stringify(user)); 
    alert("Giriş uğurludur!");
    window.location.href = "./index.html"; 
});
