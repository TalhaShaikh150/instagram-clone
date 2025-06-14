import { sendUserDetailsToDb } from "../backend/database.js";
import { getUserDetailsFromDb } from "../backend/database.js";

const signUpBtn = document.querySelector(".signup-btn");
const email = document.getElementById("email").value;

const data = await getUserDetailsFromDb(email, password);

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
  if (!email.includes("@gmail.com")) {
    alertMessage.innerHTML = "add correct email format";
    alertMessage.style.color = "#cf3e27";
    alertMessage.classList.remove("hide");
    return;
  }

  let isUser = false; //true after one wrong email

  data.forEach((userData) => {
    if (userData.email.includes(email)) {
      alertMessage.innerHTML = "Email Already Exist";
      alertMessage.classList.remove("hide");
      isUser = true;
    }
  });

  if (!isUser) {
    alertMessage.classList.add("hide");
    const result = await sendUserDetailsToDb(
      firstName,
      lastName,
      email,
      password
    );
    alertMessage.innerHTML = "Account Created Successfully";
    alertMessage.style.color = "#1ca317";
    alertMessage.classList.remove("hide");
    setTimeout(() => {
      window.location = "login.html";
      isUser = false;
      return result;
    }, 800);
  }
});
