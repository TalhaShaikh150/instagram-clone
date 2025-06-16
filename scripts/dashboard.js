import {
  getUserDetailsFromDb,
  sendProfileToDb,
  sendProfileSrc,
  getProfileSrc,
  getProfileFromDb,
  sendPostToDb,
  getPostFromDb,
  supabase,
} from "../backend/database.js";

let userId;

export async function renderUserDetails() {
  const userName = document.querySelectorAll(".username");
  //Here Fetching User Details From Database
  const data = await getUserDetailsFromDb();
  for (let i = 0; i < data.length; i++) {
    userId = JSON.parse(localStorage.getItem("userid")) || "Guest";
    if (data[i].id.includes(userId)) {
      let fullName = `${data[i].firstName} ${data[i].lastName} `;
      userName.forEach((name) => {
        name.innerHTML = fullName;
      });

      return data[i].email;
    }
  }
}

const postProfile = document.querySelector(".profile-pic");

export async function getProfileImage(email) {
  const profile = postProfile.files[0];
  const { data, error } = await supabase.storage
    .from("userimages")
    .getPublicUrl(`${email}/profile-${profile.name}`, profile);
  let profileLink = data.publicUrl;
}

document.addEventListener("DOMContentLoaded", async () => {
  const profileImage = document.querySelector(".profile");

  const email = await renderUserDetails();
  const postModal = document.querySelector(".post-modal");
  const overlay = document.querySelector(".overlay");

  const dataImages = await getProfileSrc();

  for (let i = dataImages.length - 1; i >= 0; i--) {
    if (dataImages[i].src.includes(email)) {
      profileImage.src = dataImages[i].src;
      break;
    }
  }

  if (window.location.pathname.endsWith("/dashboard.html")) {
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
    let postCount = 0;
    const postCountElement = document.querySelector(".post-count");
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
        await sendPostToDb();
        const databasefile = await getPostFromDb();

        let html = `
      <div class="post">
      <img src="${databasefile}" class="all-images" alt="" />
      </div>
      `;
        postCount++;
        postCountElement.innerHTML = postCount;
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
    const profileImage = document.querySelector(".profile");

    const postProfileBtn = document.querySelector(".post-profile-btn");
    const backProfileModal = document.querySelector(".back-profile-btn");
    const postProfile = document.querySelector(".profile-pic");
    const profileModal = document.querySelector(".profile-modal");
    //To Show Profile Modal
    addProfile.addEventListener("click", async () => {
      overlay.classList.remove("hide");
      profileModal.classList.remove("hide");
    });

    //To Post Profile Image
    postProfileBtn.addEventListener("click", async () => {
      if (!postProfile.value) {
        alert("Select Image");
        return;
      }
      async function render() {
        await sendProfileToDb();
        const databasefile = await getProfileFromDb();

        //Send Profile Src
        await sendProfileSrc(email, databasefile);

        profileImage.src = databasefile;
        overlay.classList.add("hide");
        profileModal.classList.add("hide");

        // pageReload();
        getProfileImage(email);
      }
      render();
    });

    //To Hide Profile Modal
    backProfileModal.addEventListener("click", () => {
      profileModal.classList.add("hide");
      overlay.classList.add("hide");
    });
  }
});
