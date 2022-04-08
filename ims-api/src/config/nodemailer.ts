import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muthanamuthana934@gmail.com",
    pass: "0599356327",
  },
});

export default transporter;
