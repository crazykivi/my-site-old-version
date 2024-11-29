function renderRecords(records) {
  const recordsList = document.getElementById("records-list");
  recordsList.innerHTML = "";

  records.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.className = "card mb-3";

    recordElement.innerHTML = `<div class="card-body">
            <div class="ql-editor">${record.content}</div>
            </div>`;

    const imgTags = recordElement.querySelectorAll("img");
    /*
    imgTags.forEach((img) => {
      console.log("Image source:", img.src);
    }); */

    recordsList.appendChild(recordElement);
  });
}
