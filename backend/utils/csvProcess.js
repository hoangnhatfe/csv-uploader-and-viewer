const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const { CsvDataSchema } = require('./schema');

const validateCsvRow = (row) => {
  // Invalid data if there are not exactly 5 columns
  if (Object.keys(row).length !== 5) {
    return {
      isValid: false,
      error: "Column count mismatch",
    };
  }

  // Create a mapping of column names
  try {
    const check = CsvDataSchema.parse(row);
    return {
      isValid: true,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.issues,
    };
  }
}

const readCsv = async (path) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(path)
        .pipe(stripBom())
        .pipe(csv({
          mapHeaders: (({ header }) => {
                if (header.charCodeAt(0) === 0xFEFF) {
                    header = header.substr(1);
                }
                return header;
            })
        }))
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    })
    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  validateCsvRow,
  readCsv,
}