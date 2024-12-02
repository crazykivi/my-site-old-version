function renderRecords(records) {
  const token = localStorage.getItem("token");
  const recordsList = document.getElementById("records-list");
  recordsList.innerHTML = "";

  records.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.className = "card mb-3";

    const contentContainer = document.createElement("div");
    contentContainer.className = "card-body";

    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(record.content, "text/html");

    contentContainer.appendChild(parsedContent.body);
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

    recordsList.appendChild(recordElement);
  });
}
