const hamburger = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
