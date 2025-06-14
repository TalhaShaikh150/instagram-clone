import {
  getUserDetailsFromDb,
  sendFileToDb,
  getFileFromDb,
  supabase,
} from "../backend/database.js";

let userId;

export async function renderUserDetails() {
  const userName = document.querySelectorAll(".username");
  const data = await getUserDetailsFromDb();
  for (let i = 0; i < data.length; i++) {
    userId = JSON.parse(localStorage.getItem("userid")) || "Guest";
    if (data[i].id.includes(userId)) {
      let fullName = `${data[i].firstName} ${data[i].lastName} `;
      userName.forEach((name) => {
        name.innerHTML = fullName;
      });
      return data[i].firstName;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderUserDetails();
  const postModal = document.querySelector(".post-modal");
  const overlay = document.querySelector(".overlay");

  document.body.style.overflow = "auto";

  // For Logout
  const logOutBtn = document.querySelector(".logout-btn");
  logOutBtn.addEventListener("click", () => {
    window.location = "./login.html";
  });

  // For Show Post
  const showPost = document.querySelector(".show-post-btn");
  showPost.addEventListener("click", () => {
    postModal.classList.remove("hide");
    overlay.classList.remove("hide");
  });

  // For Add Post

  const postTitle = document.querySelector(".post-modal .post-title");
  const postfile = document.querySelector(".post-modal .post-file");
  const addPostBtn = document.querySelector(".post-modal .add-post-btn");
  const postContainer = document.querySelector(".post-container");
  addPostBtn.addEventListener("click", async () => {
    if (!postTitle.value || !postfile.value) {
      alert("Don't Leave Empty Fields");
      return;
    }

    postModal.classList.add("hide");
    overlay.classList.add("hide");

    // const file = postfile.files[0];

    async function render() {
      await sendFileToDb();
      console.log(userId);
      const databasefile = await getFileFromDb();

      let html = `
      <div class="post">
      <img src="${databasefile}" class="all-images" alt="" />
      </div>
      `;
      console.log(databasefile)
      postContainer.innerHTML += html;
      postTitle.value = "";
      postfile.value = "";
    }
    render();
  });

  const backPostBtn = document.querySelector(".back-post-btn");

  backPostBtn.addEventListener("click", () => {
    postModal.classList.add("hide");
    overlay.classList.add("hide");
  });

  // To Add Profile
  let addProfile = document.querySelector(".upload-btn");
  const postProfileBtn = document.querySelector(".post-profile-btn");
  const backProfileModal = document.querySelector(".back-profile-btn");
  const postProfile = document.querySelector(".profile-pic");
  const profileModal = document.querySelector(".profile-modal");

  addProfile.addEventListener("click", async () => {
    profileModal.classList.remove("hide");

    postProfileBtn.addEventListener("click", () => {
      const profilePic = postProfile.files[0];
      console.log(profilePic.name);
      sendFileToDb();
    });

    backProfileModal.addEventListener("click", () => {
      profileModal.classList.add("hide");
    });
  });
});
