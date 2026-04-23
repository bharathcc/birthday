import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;
  console.log(`[${type}] Notification (Vercel):`, data);

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const notifyEmail = "bharath.227118@gmail.com";

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const subject = type === 'LOGIN' 
        ? `Quiz App: New Login - ${data.name}`
        : `Quiz App: Quiz Activity - ${data.name}`;

      const text = type === 'LOGIN'
        ? `User ${data.name} just logged in.\nTime: ${new Date(data.timestamp).toLocaleString()}\nDOB: ${data.dob}`
        : `User ${data.name} activity recorded.\n\nResponses:\n${(data.responses || []).map((r: any) => `Q${r.questionId}: ${r.answer}`).join('\n')}\n\nTime: ${new Date(data.timestamp).toLocaleString()}`;

      await transporter.sendMail({
        from: `"Quiz Monitor" <${emailUser}>`,
        to: notifyEmail,
        subject,
        text,
      });
      
      console.log("Email sent successfully from Vercel");
    } catch (error) {
      console.error("Error sending email from Vercel:", error);
    }
  } else {
    console.warn("EMAIL_USER or EMAIL_PASS not set on Vercel. Email not sent.");
  }

  return res.status(200).json({ success: true });
}
