import { Database } from "./config/database";
import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    Database.initialize();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
