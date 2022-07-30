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
    
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.OAUTH_ID,
      process.env.OAUTH_SECRET,
      "https://developers.google.com/oauthplayground"
    ); 

    oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken().then(t => t.token);

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      secure: true,
      port: 465, 
      auth: {
        type: "OAuth2",
        user: process.env.NODE_MAILER_USERNAME,
        privateKey: process.env.SERVICE_CLIENT_PREIVATE_KEY,
        serviceClient: process.env.SERVICE_CLIENT_ID,
        accessToken,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    } as SMTPTransport.Options);
  }

  async sendMail(options: Options) {
    try {
      await this.transporter?.sendMail(options);
    } catch(e) {
      throw new Error("Failed to send email");
    }
  }

}

const emailService = new EmailService();

export default emailService;