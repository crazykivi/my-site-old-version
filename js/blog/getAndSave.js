// Инициализация Quill.js
const editor = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
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
      console.debug("Не авторизирован");
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

/*
document.getElementById("save-button").addEventListener("click", () => {
  const newRecord = { content: editor.root.innerHTML };

  fetch("https://nikitaredko.ru:3000/save-record", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRecord),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Запись сохранена:", data);
      editor.root.innerHTML = "";
    })
    .catch((error) => console.error("Ошибка при сохранении записи:", error));
});
*/
document.getElementById("save-button").addEventListener("click", () => {
  // Проверка токена перед отправкой записи
  fetch("https://nikitaredko.ru:3001/check-token", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Если токен валиден, отправляем запись
        const newRecord = { content: editor.root.innerHTML };

        fetch("https://nikitaredko.ru:3000/save-record", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecord),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Запись сохранена:", data);
            editor.root.innerHTML = "";
          })
          .catch((error) =>
            console.error("Ошибка при сохранении записи:", error)
          );
      } else {
        // Если токен недействителен
        console.log("Пользователь не авторизован");
      }
    })
    .catch((error) => {
      console.error("Ошибка при проверке токена:", error);
    });
});

document.getElementById("upload-image-button").addEventListener("click", () => {
  fetch("https://nikitaredko.ru:3001/check-token", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const formData = new FormData();
        formData.append(
          "image",
          document.getElementById("image-upload").files[0]
        );

        fetch("https://nikitaredko.ru:3000/upload-image", {
          method: "POST",
          credentials: "include",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Изображение загружено:", data);
          })
          .catch((error) =>
            console.error("Ошибка при загрузке изображения:", error)
          );
      } else {
        console.log("Пользователь не авторизован");
      }
    })
    .catch((error) => {
      console.error("Ошибка при проверке токена:", error);
    });
});
