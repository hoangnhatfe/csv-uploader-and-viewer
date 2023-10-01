const { z } = require("zod");

const CsvDataSchema = z.object({
  postId: z.string().transform((str) => parseInt(str, 10)),
  id: z.string().transform((str) => parseInt(str, 10)),
  name: z.string(),
  email: z.string().email(),
  body: z.string(),
});

module.exports = {
  CsvDataSchema
};