function renderPagination(totalRecords, currentPage) {
  const recordsPerPage = 5;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
    pagination.appendChild(pageItem);
  }

  document.querySelectorAll(".page-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(e.target.dataset.page);
      loadRecords(page);
    });
  });
}
