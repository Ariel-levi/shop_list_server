const mongoose = require("mongoose");
require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  console.log(process.env.DB);
  await mongoose.connect(process.env.MONGO_DB);
  console.log("connected to mongoDB 😁");
}
