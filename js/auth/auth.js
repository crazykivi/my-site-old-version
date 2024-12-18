document
  .getElementById("setCookieButton")
  .addEventListener("click", function () {
    const passwordModal = new bootstrap.Modal(
      document.getElementById("passwordModal")
    );
    passwordModal.show();
  });

document
  .getElementById("submitPasswordButton")
  .addEventListener("click", function () {
    const enteredPassword = document.getElementById("passwordInput").value;

    fetch("https://nikitaredko.ru:3006/check-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: enteredPassword }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          localStorage.setItem("token", data.token);

          const passwordModal = bootstrap.Modal.getInstance(
            document.getElementById("passwordModal")
          );
          passwordModal.hide();

          const backdrop = document.querySelector(".modal-backdrop");
          if (backdrop) {
            backdrop.remove();
          }
        } else {
          const errorMessage = document.getElementById("errorMessage");
          errorMessage.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке запроса:", error);
        alert("Произошла ошибка при авторизации. Попробуйте еще раз.");
      });
  });

document
  .getElementById("passwordModal")
  .addEventListener("hidden.bs.modal", function () {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });
