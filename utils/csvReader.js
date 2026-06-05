const fs = require('fs');
const csv = require('csv-parser');

function readCSV(path) {

  const results = [];

  return new Promise((resolve, reject) => {

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);

  });
}

module.exports = { readCSV };