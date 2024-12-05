function loadProjects(page = 1) {
  fetch(`https://nikitaredko.ru:3000/get-projects?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
        renderProjects(data.projects);
        renderPagination(data.totalRecords, page);
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

loadProjects();

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
      loadProjects(page);
    });
  });
}

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.className = "col-md-6 col-lg-4";

    projectElement.innerHTML = `
        <div class="card">
          <a href="${project.githubUrl}">
            <img src="${project.imageUrl}" class="card-img-top" alt="${
      project.title
    }">
          </a>
          <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <p><strong>Стек технологий:</strong><br>Фронтенд: ${
              project.frontendStack
            }<br>Бекенд: ${project.backendStack}</p>
            <a href="${
              project.githubUrl
            }" class="btn btn-primary btn-sm">Перейти к проекту</a>
            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#aboutProject${
              project.id
            }" aria-expanded="false" aria-controls="aboutProject">
              Подробнее о проекте
            </button>
            <div class="collapse" id="aboutProject${project.id}">
              <p>${project.description}</p>
              <p>Ключевые особенности проекта:</p>
              <ul>
                ${project.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      `;

    projectsList.appendChild(projectElement);
  });
}
