const { parse } = require('csv-parse/sync');
const fs = require("fs");
const path = require("path");
//doing everything synchronously because we'll only read this upon startup, 
//and having data here is the premise for other functions to work


const records = parse(fs.readFileSync(path.join(__dirname, "../files/StationCode.csv")), {
  columns: true,
  skip_empty_lines: true
});

module.exports = records;