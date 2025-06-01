const viewPasswordBtn = document.querySelector(".fa-eye");
viewPasswordBtn.addEventListener("click", () => {
  const password = document.getElementById("password");

  if (viewPasswordBtn.classList.contains("fa-eye")) {
    viewPasswordBtn.classList.remove("fa-eye");
    viewPasswordBtn.classList.add("fa-eye-slash");
    password.type = "text";
  } else {
    password.type = "password";
    viewPasswordBtn.classList.remove("fa-eye-slash");
    viewPasswordBtn.classList.add("fa-eye");
  }
});
