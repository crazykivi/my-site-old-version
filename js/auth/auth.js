document
  .getElementById("setCookieButton")
  .addEventListener("click", function () {
    var passwordModal = new bootstrap.Modal(
      document.getElementById("passwordModal")
    );
    passwordModal.show();
  });

document
  .getElementById("submitPasswordButton")
  .addEventListener("click", function () {
    var enteredPassword = document.getElementById("passwordInput").value;

    fetch("https://nikitaredko.ru:3001/check-password", {
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
          var passwordModal = bootstrap.Modal.getInstance(
            document.getElementById("passwordModal")
          );
          passwordModal.hide();
        } else {
          document.getElementById("errorMessage").style.display = "block";
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  });
