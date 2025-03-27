// login popup functionality
const openPopup = document.getElementById("login-popup");
const closePopup = document.getElementById("close-popup");
const popupBox = document.getElementById("forms-popup");

function closeForm(e) {
  popupBox.classList.add("hidden");

}

openPopup.addEventListener("click", () => {
  popupBox.classList.remove("hidden");
});

closePopup.addEventListener("click", closeForm);

// signup popup functionality
// const signupPopup = document.getElementById("signup-popup");
// signupPopup.addEventListener("click", () => {
//   popupBox.classList.remove("hidden");
//   // document.getElementById("signup-link").click();
// });

// menu functionality
const openMenu = document.getElementById("open-menu");
const navBox = document.getElementById("nav-Box");

openMenu.addEventListener("click", () => {
  navBox.classList.toggle("menu-hidden");
});

// Navigation functionality
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("nav a");

// navLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     const targetPage = link.getAttribute("data-page");

//     pages.forEach((page) => {
//       page.classList.add("hidden");
//     });

//     document.getElementById(targetPage).classList.remove("hidden");
//   });
// });

// Signup Functionality
// document.getElementById("signup-btn").addEventListener("click", () => {
//   console.log("enters in signup index.js");

//   const name = document.getElementById("signup-name").value;
//   const email = document.getElementById("signup-email").value;
//   const password = document.getElementById("signup-password").value;
//   console.log(`${name}, ${email}, ${password}`);

//   if (name && email && password) {
//     localStorage.setItem("user", JSON.stringify({ name, email, password }));
//     alert("Sign Up Successful!");

//     // document.getElementById("signup").classList.add("hidden");
//     // document.getElementById("login").classList.remove("hidden");
//   } else {
//     alert("Please fill in all fields.");
//   }
// });

// // Login Functionality
// document.getElementById("login-btn").addEventListener("click", () => {
//   const email = document.getElementById("login-email").value;
//   const password = document.getElementById("login-password").value;

//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user, "Local Storage");

//   if (user && user.email === email && user.password === password) {
//     alert(`Welcome back, ${user.name}!`);
//   } else {
//     alert("Invalid email or password. Please try again.");
//   }
// });
