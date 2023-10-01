const { readCsv, validateCsvRow } = require('../utils/csvProcess');
const { Op } = require("sequelize");
const { CsvData } = require('../models');

// file upload controller
async function uploadCsv(req, res) {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No file uploaded' } });
    }

    // Check if the file is CSV
    if (req.file.mimetype !== 'text/csv') {
      return res.status(400).json({ error: { message: 'File must be CSV' } });
    }
    
    // Process the uploaded CSV file
    const data = await readCsv(req.file.path);

    // Check validity of the CSV data
    const invalidRows = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const { isValid, error } = validateCsvRow(row);
      if (!isValid) {
        invalidRows.push({ ...{rowError: i}, error });
      }
    }
    if (invalidRows.length > 0) {
      return res.status(400).json({ error: { message: 'Invalid CSV data', invalidRows} });
    }

    // Save the data to the database
    try {
      const results = await CsvData.bulkCreate(data);
      return res.status(200).json({ ...{data: results.length}});
    } catch (errors) {
      return res.status(400).json({ error: { message: '', ...errors} });
    }

    // Return a success message
    
  } catch (error) {
    return res.status(500).json({ error: {message: 'Internal server error'} });
  }
}

// get data controller
async function getData(req, res) {
  try {
    // Get query parameters
    const { page = 0, pageSize = 10 } = req.query;

    // Implement pagination
    const offset = parseInt(page) * parseInt(pageSize);
    const limit = parseInt(pageSize);
    const data = await CsvData.findAll({ offset, limit });
    const total = await CsvData.count();

    results = {
      data,
      meta: {
        pagination: {
          page: parseInt(page),
          pageSize: limit,
          pageCount: Math.ceil(total / limit),
          total,
        }
      }
    }

    // Return the data as JSON
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: {message: 'Internal server error'} });
  }
}

// get search controller
async function searchData(req, res) {
  try {
    const { q } = req.query;
    // Search all columns name, email, body and paginate the results
    const { page = 0, pageSize = 10 } = req.query;
    const offset = parseInt(page) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const data = await CsvData.findAll({ where: {
      [Op.or]: [
        { name: { [Op.like]: '%' + q + '%' } },
        { email: { [Op.like]: '%' + q + '%' } },
        { body: { [Op.like]: '%' + q + '%' } },
      ]
    }, offset, limit });
    const total = await CsvData.count({ where: {
      [Op.or]: [
        { name: { [Op.like]: '%' + q + '%' } },
        { email: { [Op.like]: '%' + q + '%' } },
        { body: { [Op.like]: '%' + q + '%' } },
      ]
    } });

    results = {
      data,
      meta: {
        pagination: {
          page: parseInt(page),
          pageSize: limit,
          pageCount: Math.ceil(total / limit),
          total,
        }
      }
    }

    // Return the search results as JSON
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: {message: 'Internal server error'} });
  }
}

module.exports = {
  uploadCsv,
  getData,
  searchData,
};