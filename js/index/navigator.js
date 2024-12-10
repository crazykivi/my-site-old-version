/*
const toggleMenuButton = document.getElementById("toggleMenu");
const sidebar = document.getElementById("sidebar");

toggleMenuButton.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
*/
const toggleMenuButton = document.getElementById("toggleMenu");
const sidebar = document.getElementById("sidebar");

toggleMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !toggleMenuButton.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});
