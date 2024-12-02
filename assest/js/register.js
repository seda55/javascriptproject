document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Formun avtomatik göndərilməsini dayandırırıq.

            const nameInput = document.getElementById("name").value.trim();
            const passwordInput = document.getElementById("password").value.trim();

            if (nameInput === "" || passwordInput === "") {
                alert("Please fill in all fields!");
                return;
            }

            // Yeni istifadəçi məlumatlarını saxlayırıq.
            const user = {
                name: nameInput,
                password: passwordInput,
            };

            // LocalStorage-a məlumat əlavə edirik.
            localStorage.setItem("user", JSON.stringify(user));
            alert("Account successfully created!");

            // Ana səhifəyə yönləndirik.
            window.location.href = "index.html";
        });
    } else {
        console.error("Register form not found!");
    }
});
