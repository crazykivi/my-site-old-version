function loadProjects() {
  fetch(`https://nikitaredko.ru:3000/get-records-index`)
    .then((response) => response.json())
    .then((data) => {
      renderProjects(data.records);
      console.log("Полученные проекты:", data.records);
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

loadProjects();

function renderProjects(records) {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = ""; 

  records.forEach((record) => {
    const projectElement = document.createElement("div");
    projectElement.className = "col-md-6 col-lg-4";

    projectElement.innerHTML = `
      <div class="card">
        <a href="${record.project_url}">
          <img src="${record.image_url}" class="card-img-top" alt="${
      record.project_name
    }">
        </a>
        <div class="card-body">
          <h5 class="card-title">${record.project_name}</h5>
          <p><strong>Стек технологий:</strong><br>
            Фронтенд: ${record.frontend_technologies || "Не указан"}<br>
            Бекенд: ${record.backend_technologies || "Не указан"}
          </p>
          <a href="${
            record.project_url
          }" class="btn btn-primary btn-sm">Перейти к проекту</a>
          <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#aboutProject${
            record.project_id
          }" aria-expanded="false" aria-controls="aboutProject">
            Подробнее о проекте
          </button>
          <div class="collapse" id="aboutProject${record.project_id}">
            <p>${record.description || "Описание отсутствует."}</p>
          </div>
        </div>
      </div>
    `;

    projectsList.appendChild(projectElement);
  });
}
