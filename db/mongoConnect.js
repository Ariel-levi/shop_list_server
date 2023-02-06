const mongoose = require("mongoose");
require("dotenv").config();
main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.DB);
  console.log("Connected to mongoDB 😁");
}
