import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, body: string) => {
    let transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST as string,
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER as string,
          pass: process.env.MAILTRAP_PASS as string
        }
      });

    const sender = {
      address: "no-response-otp@otpsystem.com",
      name: "OTP Code to SignIn",
    };

    let message = {
      from: sender.address,
      to: to,
      subject: subject,
      text: body,
      html: body  
    };

    await transport.sendMail(message)
      .then(console.log, console.error);
}
