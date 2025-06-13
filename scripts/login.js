import { getUserDetailsFromDb } from "../backend/database.js";

const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", async () => {
  const alertMessage = document.querySelector(".alert-message");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await getUserDetailsFromDb(email, password);

  let found = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].email === email && data[i].password === password) {
      localStorage.setItem("userid", JSON.stringify(data[i].id));
      window.location = "dashboard.html";
      found = true;
      break;
    }
  }
if (!email.includes("@gmail.com")) {
    alertMessage.innerHTML = "add correct email format";
    alertMessage.style.color = "#cf3e27";
    alertMessage.classList.remove("hide");
    return;
  }
  if (!found) {
    alertMessage.innerHTML = "Invalid Email or Password";
    alertMessage.classList.remove("hide");
  }
  
});
