import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for logging and emailing
  app.post("/api/notify", async (req, res) => {
    const { type, data } = req.body;
    console.log(`[${type}] Notification:`, data);

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
        
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS not set. Email not sent.");
    }

    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
