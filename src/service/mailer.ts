import nodemailer from "nodemailer";

export async function sendOTPEmail(email: string, code: number): 
Promise<{
  error: boolean;
  message?: undefined;
} | {
  error: boolean;
  message: string;
}> {
  const account = await nodemailer.createTestAccount();
  try {
    const senderAddress = "hostelverse.aztecs@gmail.com";
    const toAddress = email;
    const subject = "Verify your email";
    // The body of the email for recipients
    const body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;
    // Create the SMTP transport.
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass
        }
    });
    // Specify the fields in the email.
    const mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };
    const info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}