const fs = require("fs");
const path = require("path");

const key = fs.readFileSync(
  path.resolve("/etc/letsencrypt/live/nikitaredko.ru/privkey.pem")
);
const cert = fs.readFileSync(
  path.resolve("/etc/letsencrypt/live/nikitaredko.ru/fullchain.pem")
);

module.exports = { key, cert };
