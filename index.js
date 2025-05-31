import "dotenv/config";    
import express from "express"
import bodyParser from "body-parser"
import nodemailer from "nodemailer";
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.get("/", (req, res) =>{
    res.render("index.ejs")
})

app.get("/work", (req, res) =>{
    res.render("work.ejs")
})

app.get("/about", (req, res) =>{
    res.render("about.ejs")
})

app.get("/contact", (req, res) =>{
    res.render("contact.ejs")
})

app.get("/power_bi", (req, res) =>{
    res.render("power_bi.ejs")
})

app.get("/python", (req, res) =>{
    res.render("python.ejs")
})

app.get("/databricks", (req, res) =>{
    res.render("databricks.ejs")
})

app.get("/thank-you", (req, res) => {
    res.render("thank-you.ejs")
})

app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "arthgeorgeson@gmail.com",
      subject: "New contact form message",
      text: message,
    });

    return res.redirect("/thank-you");  
  } catch (err) {
    console.error(err);
    return res.status(500).send("Email failed to send.");
  }
});

app.get('/download-resume', (req, res) => {
  const filePath = path.join(__dirname, 'public/files', 'Arthur Georgeson CV - Data Analyst.docx');
  res.download(filePath, 'Arthur-Georgeson-CV-Data-Analyst.docx', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Could not download the file.');
    }
  });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  