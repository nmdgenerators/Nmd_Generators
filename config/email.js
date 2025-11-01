import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || "nmdgenerators@gmail.com",
        pass: process.env.SMTP_PASS || "mrxx tkaa bhoa xsgs"
    }
})

export default transporter