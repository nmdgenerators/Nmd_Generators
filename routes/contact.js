import express from 'express'
import transporter from '../config/email.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/contact', async (req, res) => {
    try {
        const { name, mobile, email, location, message } = req.body
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing Fields' })
        }

        // const mailOptions = {
        //     from: `"NMD Electrical Services" <${process.env.SMTP_USER}>`,
        //     to: process.env.ADMIN_EMAIL || "nmdgenerators@gmail.com",
        //     replyTo: email,
        //     subject: "New Enquiry from Contact Form",
        //     html: `
        //         <h2>New Enquiry from Contact Form</h2>
        //         <p><b>Name:</b> ${name}</p>
        //         <p><b>Mobile:</b> ${mobile}</p>
        //         <p><b>Email:</b> ${email}</p>
        //         <p><b>Location:</b> ${location}</p>
        //         <p><b>Message:</b><br/>${message}</p>
        //     `,
        // }

        const mailOptions = {
            from: `NMD Electrical Services <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: 'New Enquiry Received from Website',
            html: `
        <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <div style="background:#0f172a; color:#ffffff; padding:16px;">
              <h2 style="margin:0;">New Website Enquiry</h2>
            </div>

            <div style="padding:20px; color:#333;">
              <p><strong>You have received a new enquiry from a website visitor.</strong></p>

              <table style="width:100%; border-collapse:collapse; margin-top:15px;">
                <tr>
                  <td style="padding:8px; font-weight:bold;">Name</td>
                  <td style="padding:8px;">${name}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:8px; font-weight:bold;">Mobile</td>
                  <td style="padding:8px;">${mobile || '-'}</td>
                </tr>
                <tr>
                  <td style="padding:8px; font-weight:bold;">Email</td>
                  <td style="padding:8px;">${email}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:8px; font-weight:bold;">Location</td>
                  <td style="padding:8px;">${location || '-'}</td>
                </tr>
              </table>

              <div style="margin-top:20px;">
                <p style="font-weight:bold;">Message:</p>
                <p style="background:#f1f5f9; padding:12px; border-radius:6px;">
                  ${message}
                </p>
              </div>
            </div>

            <div style="background:#f8fafc; padding:12px; text-align:center; font-size:12px; color:#64748b;">
              This enquiry was submitted via the NMD Electrical Services website.
            </div>

          </div>
        </div>
      `
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({ message: 'Your enquiry has been sent successfully!' })
    } catch (error) {
        console.error('Mail sending error:', error);
        res.status(500).json({ error: 'Failed to send enquiry. Please try again later.' });
    }
})

export default router