document.addEventListener("DOMContentLoaded", function () {
  const linksSection = document.getElementById("links");

  if (linksSection) {
    fetch("template/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось загрузить footer.html");
        }
        return response.text();
      })
      .then((html) => {
        linksSection.innerHTML = html;
      })
      .catch((error) => {
        console.error("Ошибка при загрузке footer.html:", error);
      });
  }
});
