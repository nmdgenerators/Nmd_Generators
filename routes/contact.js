import express from 'express'
import transporter from '../config/email.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/contact', async (req, res) => {
    try {
        const { name, mobile, email, location, message } = req.body
        if(!name || !email || !message) {
            return res.status(400).json({ error: 'Missing Fields' })
        }

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to:  "nmdgenerators@gmail.com" || process.env.ADMIN_EMAIL,
            subject: "New Enquiry from Contact Form",
            html: `
                <h2>New Enquiry from Contact Form</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Mobile:</b> ${mobile}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Location:</b> ${location}</p>
                <p><b>Message:</b><br/>${message}</p>
            `,
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({ message: 'Your enquiry has been sent successfully!' })
    } catch (error) {
        console.error('Mail sending error:', error);
        res.status(500).json({ error: 'Failed to send enquiry. Please try again later.' });
    }
})

export default router