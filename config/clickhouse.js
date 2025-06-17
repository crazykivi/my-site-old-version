const { ClickHouse } = require("clickhouse");

const clickhouse = new ClickHouse({
  url: "http://localhost:8123",
  basicAuth: { username: "default", password: "" },
  isHttp: true,
});

module.exports = clickhouse;
