// Инициализация Quill.js
const editor = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike", "image"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ header: "1" }, { header: "2" }],
      [{ font: [] }],
      [{ size: ["small", "medium", "large"] }],
      [{ color: [] }, { background: [] }],
    ],
  },
});

fetch("https://nikitaredko.ru:3001/check-token", {
  method: "POST",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    const addRecordPanel = document.getElementById("add-record-panel");
    if (data.success) {
      addRecordPanel.classList.remove("d-none");
      console.debug("Авторизирован");
    } else {
      addRecordPanel.classList.add("d-none");
      //console.debug("Не авторизирован");
    }
  })
  .catch((error) => {
    console.error("Ошибка при проверке токена:", error);
    document.getElementById("add-record-panel").classList.add("d-none");
  });

editor.getModule("toolbar").addHandler("image", function () {
  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("accept", "image/*");
  fileInput.click();

  fileInput.onchange = function () {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    fetch("https://nikitaredko.ru:3000/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.imageUrl) {
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", data.imageUrl);
        }
      })
      .catch((error) => console.error("Ошибка загрузки изображения:", error));
  };
});

editor.getModule("toolbar").addHandler("align", function (value) {
  const range = editor.getSelection();
  if (range) {
    const format = editor.getFormat(range);
    if (format["align"] !== value) {
      editor.format("align", value);
    }
  }
});

document.getElementById("save-button").addEventListener("click", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Пользователь не авторизован");
    return;
  }

  const newRecord = { content: editor.root.innerHTML, token };

  fetch("https://nikitaredko.ru:3000/save-record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(newRecord),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Запись сохранена:", data);
      editor.root.innerHTML = "";
      loadRecords();
    })
    .catch((error) => {
      console.error("Ошибка при сохранении записи:", error);
    });
});
