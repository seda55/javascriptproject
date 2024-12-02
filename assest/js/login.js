// Login formunu idarə edən kod
// document.getElementById("login-form").addEventListener("submit", (e) => {
//     e.preventDefault();
  
//     const username = document.getElementById("username").value;
//     const avatar = document.getElementById("avatar").value;
  
//     if (!username || !avatar) {
//       alert("Bütün sahələri doldurun!");
//       return;
//     }
  
//     const user = {
//       name: username,
//       avatar: avatar,
//     };
  
//     localStorage.setItem("user", JSON.stringify(user));
//     alert("Giriş uğurludur!");
//     window.location.href = "./index.html"; // Ana səhifəyə yönləndirir
//   });
  

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Formun avtomatik göndərilməsinin qarşısını alırıq

    const username = document.getElementById("username").value.trim(); // Username dəyərini alırıq
    const password = document.getElementById("avatar").value.trim(); // Şifrəni alırıq

    if (!username || !password) {
        alert("Bütün sahələri doldurun!"); // Boş sahələr varsa xəbərdarlıq
        return;
    }

    // İstifadəçi məlumatlarını yaratmaq
    const user = {
        name: username,
        avatar: "https://via.placeholder.com/150", // Şəkil üçün default dəyər əlavə olunur
    };

    localStorage.setItem("user", JSON.stringify(user)); // Məlumatları LocalStorage-a saxlayırıq
    alert("Giriş uğurludur!");
    window.location.href = "./index.html"; // Ana səhifəyə yönləndiririk
});
