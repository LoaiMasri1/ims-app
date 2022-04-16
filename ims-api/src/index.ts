import * as dotenv from "dotenv";
import { Database } from "./config/database";
import "reflect-metadata";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 5000;

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
