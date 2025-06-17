const fs = require("fs");
const path = require("path");

const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const getFilePath = (fileName, uploadDir = "uploads") => {
  return path.join(__dirname, "..", "..", uploadDir, fileName);
};

module.exports = { createDirectoryIfNotExists, getFilePath };
