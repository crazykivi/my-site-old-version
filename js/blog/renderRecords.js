function renderRecords(records) {
  const recordsList = document.getElementById("records-list");
  recordsList.innerHTML = "";

  records.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.className = "card mb-3";

    recordElement.innerHTML = `<div class="card-body">
            <div class="ql-editor">${record.content}</div>
            </div>`;

    if (token) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.textContent = "Удалить";
      deleteButton.setAttribute("data-id", record.id);
      deleteButton.addEventListener("click", () => {
        deleteRecord(record.id);
      });

      const editButton = document.createElement("button");
      editButton.className = "btn btn-warning ms-2";
      editButton.textContent = "Редактировать";
      editButton.setAttribute("data-id", record.id);
      editButton.addEventListener("click", () => {
        editRecord(record.id, record.content);
      });

      const cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";
      cardFooter.appendChild(deleteButton);
      cardFooter.appendChild(editButton);
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