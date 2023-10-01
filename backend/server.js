const express = require('express');
const cors = require('cors');
const dataRouter = require('./routes/data');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use('/api/data', dataRouter);

module.exports = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});