const express = require("express");
const {
  getRecords,
  saveRecord,
  deleteRecord,
} = require("../controllers/recordsController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get-records", getRecords);
router.post("/save-record", verifyToken, saveRecord);
router.post("/delete-record", verifyToken, deleteRecord);

module.exports = router;
