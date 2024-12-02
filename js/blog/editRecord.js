function editRecord(id, content) {
  const addRecordPanel = document.getElementById("add-record-panel");
  addRecordPanel.classList.remove("d-none");

  const editor = document.getElementById("editor");
  editor.innerHTML = content;

  const saveButton = document.getElementById("save-button");
  saveButton.textContent = "Сохранить изменения";

  saveButton.onclick = function () {
    saveRecord(id);
  };
}
