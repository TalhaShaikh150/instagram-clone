import { getUserDetailsFromDb } from "../backend/database.js";
async function renderUserDetails() {
  const userName = document.querySelectorAll(".username");
  const data = await getUserDetailsFromDb();
  for (let i = 0; i < data.length; i++) {
    let userId = JSON.parse(localStorage.getItem("userid")) || "Guest";
    if (data[i].id.includes(userId)) {
      let fullName = `${data[i].firstName} ${data[i].lastName} `;
      userName.forEach((name) => {
        name.innerHTML = fullName;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderUserDetails();
  document.body.style.overflow = "auto";
  const logOutBtn = document.querySelector(".logout-btn");
  logOutBtn.addEventListener("click", () => {
    window.location = "./login.html";
  });

  const addProfile = document.querySelector(".fa-plus");
  addProfile.addEventListener("click", () => {});
});
