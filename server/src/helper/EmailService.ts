import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(to: string, subject: string, html: string){
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_SERVICE_USER!,
      to,
      subject,
      html
    })
    return data
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}