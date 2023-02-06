import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Options } from "nodemailer/lib/mailer";
import { google } from "googleapis";

class EmailService {
  transporter?: nodemailer.Transporter;

  constructor() {
    this.init();
  }

  async init() {
    try {
      // const OAuth2 = google.auth.OAuth2;
      // const oauth2Client = new OAuth2(
      //   process.env.OAUTH_ID,
      //   process.env.OAUTH_SECRET,
      //   "https://developers.google.com/oauthplayground"
      // );

      // oauth2Client.setCredentials({
      //   refresh_token: process.env.OAUTH_REFRESH_TOKEN,
      // });

      // const accessToken = (await oauth2Client.refreshAccessToken()).credentials
      //   .access_token;

      // this.transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   secure: true,
      //   port: 465,
      //   auth: {
      //     type: "OAuth2",
      //     user: process.env.NODE_MAILER_USERNAME,
      //     privateKey: process.env.SERVICE_CLIENT_PREIVATE_KEY,
      //     serviceClient: process.env.SERVICE_CLIENT_ID,
      //     accessToken,
      //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      //   },
      // } as SMTPTransport.Options);
      this.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_MAILER_USERNAME,
          pass: process.env.NODE_MAILER_PASSWORD,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendMail(options: Options) {
    try {
      await this.transporter?.sendMail(options);
      return true;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

const emailService = new EmailService();

export default emailService;
