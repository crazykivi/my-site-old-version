const https = require("https");
const fs = require("fs");
const app = require("./app");
const { key, cert } = require("./config/httpsConfig");

const port = 3000;

https.createServer({ key, cert }, app).listen(port, () => {
  console.log(`HTTPS сервер запущен на порту ${port}`);
});
