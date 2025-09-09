const menuIcon = document.querySelector(".menu-icon");
const rightNav = document.querySelector(".rightnav");
const closeIcon = document.querySelector(".close-icon");

// Open sidebar
menuIcon.addEventListener("click", () => {
  rightNav.classList.add("active");
});

// Close sidebar when clicking close icon
closeIcon.addEventListener("click", () => {
  rightNav.classList.remove("active");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (rightNav.classList.contains("active") &&
      !rightNav.contains(e.target) &&
      !menuIcon.contains(e.target)) {
    rightNav.classList.remove("active");
  }
});

const navLinks = document.querySelectorAll(".rightnav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    rightNav.classList.remove("active"); // sidebar band ho jaye
  });
});
