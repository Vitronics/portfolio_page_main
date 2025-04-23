const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
require('dotenv').config(); 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files

// Environment variables (use dotenv in production)
const isVercel = process.env.VERCEL_ENV === 'production';
const PORT = process.env.PORT || 3000;
//const EMAIL_USER = process.env.EMAIL_USER ;
// const EMAIL_PASS = process.env.EMAIL_PASS ;

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    }
  });



  // Serve HTML file (adjust as needed)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
 // res.sendFile(path.join(__dirname,  'index.html'));
});

// Vercel compatibility
if (isVercel) {
 module.exports = app;
} else {
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
}

// Route to handle form submission
app.post('/api/submit', (req, res) => {
  const { name, email, message } = req.body;

  // // Email options
  // const mailOptions = {
  //   // from: EMAIL_USER,
  //   // to: EMAIL_USER, // Send to yourself
  //   // replyTo: email,
  //   from: process.env.EMAIL_USER,
  //   to: process.env.EMAIL_USER,
  //   replyTo: email,
  //   subject: `New Contact Form Submission from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  //   html: `
  //     <h2>New Contact Form Submission</h2>
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> ${email}</p>
  //     <p><strong>Message:</strong></p>
  //     <p>${message.replace(/\n/g, '<br>')}</p>
  //   `
  // };

  // // Send email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //   //   // console.error('Error sending email:', error);
    //   // return res.status(500).json({ 
    //     // success: false, 
    //     // message: 'Error sending your message. Please try again later.' 
    //     res.sendFile(path.join(__dirname, '404.html'));
    
     
    // }
    
    // // console.log('Email sent:', info.response);
    // // res.json({ 
    // //   success: true, 
    // //   message: 'Thank you for your message! I will get back to you soon.' 
    // res.sendFile(path.join(__dirname, 'contact.html'));
  //   console.error('Error:', error);
  //     return res.redirect(303, '/public/404.html');
  //   }
  //   return res.redirect(303, '/public/contact.html');
  //   });
  // });



// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
 });