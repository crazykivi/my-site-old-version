const formatRecords = (records) => {
  return records.map((record) => {
    return {
      ...record,
      content: replaceUrls(record.content),
    };
  });
};

const replaceUrls = (content) => {
  if (!content) return content;

  return content.replace(
    /http:\/\/193\.3\.23\.245:3000http:\/\/193\.3\.23\.245:3000\/uploads\//g,
    "https://193.3.23.245:3000/uploads/"
  );
};

module.exports = { formatRecords, replaceUrls };
