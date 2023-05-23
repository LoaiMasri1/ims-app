import transporter from "../config/nodemailer";
import * as jwt from "jsonwebtoken";

export const sendConfirmationEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const mailOptions = {
    from: `"IMS Supporter" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Confirm your email",
    html: `<h1>Hi ${username}</h1>
    <p>Please confirm your email by clicking the link below</p>
    <a href="http://localhost:${process.env.PORT}/auth/v1/confirm/${token}">Confirm Email</a>
    <p>If you did not request this, please ignore this email</p>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export function objToString(obj: any) {
  return Object.entries(obj).reduce((str, [p, val]) => {
    return `${val}`;
  }, "");
}

export const generateToken = async (user: any) => {
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "30m",
  });
  return token;
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const sendPasswordResetEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const mailOptions = {
    from: `"IMS Supporter" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `<h1>Hi ${username}</h1>
    <p>Please reset your password by clicking the link below</p>
    <a href="http://localhost:${process.env.PORT}/auth/v1/resetPassword/${token}">Reset Password</a>
    <p>If you did not request this, please ignore this email</p>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
