function deleteRecord(recordId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Пользователь не авторизован");
    return;
  }

  fetch("https://nikitaredko.ru:3006/delete-record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token, recordId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        loadRecords();
      } else {
        console.error("Ошибка удаления:", data.error);
      }
    })
    .catch((error) => console.error("Ошибка при удалении записи:", error));
}
