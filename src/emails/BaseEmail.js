const nodemailer = require("nodemailer");

class BaseEmail {
  constructor() {
    this.name = "";
  }

  async getNodeMailerPayload() {
    return {};
  }

  async sendEmail() {
    const payload = await this.getNodeMailerPayload();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });
    try {
      const result = await transporter.sendMail(payload);
      console.log("email sent", result);
    } catch (err) {
      console.error(`${this.name}_ERROR`, error);
    }
  }
}

module.exports = BaseEmail;
