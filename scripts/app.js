import { sendUserDetailsToDb } from "../backend/database.js";

const signUpBtn = document.querySelector(".signup-btn");

signUpBtn.addEventListener("click", async () => {
  const alertMessage = document.querySelector(".alert-message");
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!firstName || !lastName || !email || !password) {
    alertMessage.classList.remove("hide");
    return;
  }
  alertMessage.classList.add("hide");
  const result = await sendUserDetailsToDb(
    firstName,
    lastName,
    email,
    password
  );
  alert("Account Created", firstName);
  return result;
});
