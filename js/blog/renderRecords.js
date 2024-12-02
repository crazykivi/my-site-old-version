function renderRecords(records) {
  const token = localStorage.getItem("token");
  const recordsList = document.getElementById("records-list");
  recordsList.innerHTML = "";

  records.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.className = "card mb-3";

    /*
    recordElement.innerHTML = `<div class="card-body">
            <div class="ql-editor">${record.content}</div>
            </div>`;
            */
    const contentContainer = document.createElement("div");
    contentContainer.className = "card-body";
    contentContainer.innerHTML = `<div class="ql-editor">${record.content}</div>`; // Вставляем HTML

    recordElement.appendChild(contentContainer);

    if (token) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.textContent = "Удалить";
      deleteButton.setAttribute("data-id", record.id);

      deleteButton.addEventListener("click", () => {
        deleteRecord(record.id);
      });

      const cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";
      cardFooter.appendChild(deleteButton);
      recordElement.appendChild(cardFooter);
    }
    /*
    const imgTags = recordElement.querySelectorAll("img");

    imgTags.forEach((img) => {
      console.log("Image source:", img.src);
    }); */
    recordsList.appendChild(recordElement);
  });
}
