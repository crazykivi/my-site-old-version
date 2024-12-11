const sidebar = document.getElementById("sidebar");

document.addEventListener("click", (e) => {
  if (sidebar.contains(e.target)) {
    return;
  }

  sidebar.classList.remove("active");
});

sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.add("active");
});
