const fetch = require("node-fetch");

const verifyToken = async (token) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const response = await fetch("https://nikitaredko.ru:3001/check-auth-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error("Invalid or expired token");
  }

  return data;
};

module.exports = { verifyToken };
