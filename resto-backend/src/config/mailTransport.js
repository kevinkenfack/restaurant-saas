const { CONFIG } = require("./index");
const nodemailer = require("nodemailer");

exports.mailTransport = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: CONFIG.SMTP_HOST,
      port: CONFIG.SMTP_PORT,
      auth: {
        user: CONFIG.SMTP_USERNAME,
        pass: CONFIG.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: options.from || CONFIG.SMTP_FROM, // <-- tu peux override dynamiquement
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (error) {
    throw error;
  }
};