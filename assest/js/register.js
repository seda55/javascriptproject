document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault(); 
            const nameInput = document.getElementById("name").value.trim();
            const passwordInput = document.getElementById("password").value.trim();

            if (nameInput === "" || passwordInput === "") {
                alert("Please fill in all fields!");
                return;
            }

            const user = {
                name: nameInput,
                password: passwordInput,
            };

            localStorage.setItem("user", JSON.stringify(user));
            alert("Account successfully created!");

            window.location.href = "index.html";
        });
    } else {
        console.error("Register form not found!");
    }
});
