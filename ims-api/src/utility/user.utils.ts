import transporter from "../config/nodemailer";

const sendConfirmationEmail = async (
  username: string,
  email: string,
  confirmationCode: string
) => {
  const mailOptions = {
    from: `"IMS Supporter" <${process.env.GOOGLE_USER}>`,
    to: email,
    subject: "Confirm your email",
    html: `<h1>Hi ${username}</h1>
    <p>Please confirm your email by clicking the link below</p>
    <a href="http://localhost:3000/api/v1/user/confirm/${confirmationCode}">Confirm Email</a>
    <p>If you did not request this, please ignore this email</p>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendConfirmationEmail;
