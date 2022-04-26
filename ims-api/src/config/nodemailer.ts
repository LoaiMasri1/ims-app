import * as nodemailer from "nodemailer";
import { config } from "dotenv";
config();
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default transporter;
