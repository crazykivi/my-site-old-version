const clickhouse = require("../config/clickhouse");
const { formatRecords, replaceUrls } = require("../utils/responseUtils");

const getRecords = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const recordsPerPage = 5;
    const offset = (page - 1) * recordsPerPage;

    const countQuery = "SELECT COUNT(*) AS total FROM records";
    const dataQuery = `SELECT * FROM records ORDER BY created_at DESC LIMIT ${recordsPerPage} OFFSET ${offset}`;

    const [countResult, dataResult] = await Promise.all([
      clickhouse.query(countQuery).toPromise(),
      clickhouse.query(dataQuery).toPromise(),
    ]);

    const totalRecords = countResult[0].total;
    const records = formatRecords(dataResult);

    res.json({ totalRecords, records });
  } catch (err) {
    next(err);
  }
};

const saveRecord = async (req, res, next) => {
  try {
    const { content, id } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const query = id
      ? `ALTER TABLE records UPDATE content = '${replaceUrls(
          content
        )}' WHERE id = '${id}'`
      : `INSERT INTO records (content) VALUES ('${replaceUrls(content)}')`;

    await clickhouse.query(query).toPromise();

    res
      .status(201)
      .json({ message: id ? "Запись обновлена" : "Запись успешно добавлена" });
  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const { recordId } = req.body;

    if (!recordId) {
      return res.status(400).json({ error: "Record ID is required" });
    }

    const checkExistQuery = `SELECT COUNT(*) AS count FROM records WHERE id = toUUID('${recordId}')`;

    const result = await clickhouse.query(checkExistQuery).toPromise();

    if (result[0].count === 0) {
      return res.status(404).json({ error: "Запись не найдена" });
    }

    const deleteQuery = `ALTER TABLE records DELETE WHERE id = toUUID('${recordId}')`;
    await clickhouse.query(deleteQuery).toPromise();

    res.status(200).json({ message: "Запись успешно удалена" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecords, saveRecord, deleteRecord };
