import { getUserDetailsFromDb } from "../backend/database.js";

const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await getUserDetailsFromDb();
  data.forEach((details) => {
    if (details.email === email && details.password === password) {
      alert("Login Sucessful");
      window.location = "dashboard.html";
    } else {
      alert("Invalid Password Or Email");
    }
  });
});
