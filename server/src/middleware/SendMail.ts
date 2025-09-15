import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer"

const email = process.env.NODEMAILER_EMAIL as string;
const pass = process.env.NODEMAILER_PASSWORD as string;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass
  }
})

export default transporter