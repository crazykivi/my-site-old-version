function loadRecords(page = 1) {
  fetch(`https://nikitaredko.ru:3006/records/get-records?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      renderRecords(data.records);
      renderPagination(data.totalRecords, page);
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

loadRecords();