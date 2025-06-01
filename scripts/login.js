import { getUserDetailsFromDb } from "../backend/database.js";

const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await getUserDetailsFromDb(email, password);

  let found = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].email === email && data[i].password === password) {
      alert("Login successful");
      localStorage.setItem("userid", JSON.stringify(data[i].id)); // optional
      window.location = "dashboard.html";
      found = true;
      break;
    }
  }

  if (!found) {
    alert("Invalid Email or Password");
  }
});
