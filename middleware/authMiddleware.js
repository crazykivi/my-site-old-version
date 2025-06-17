const fetch = require("node-fetch");

const authMiddleware = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Токен не найден" });
  }

  fetch("https://nikitaredko.ru:3001/check-auth-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        return res.status(401).json({ error: "Пользователь не авторизован" });
      }
      next();
    })
    .catch((error) =>
      res.status(500).json({ error: "Ошибка проверки токена" })
    );
};

module.exports = authMiddleware;
