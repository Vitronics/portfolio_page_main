import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
  //   return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  return res.redirect(303, '/404.html');
   }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  // try {
  //   await transporter.sendMail(mailOptions);
  //   // return res.status(200).json({ success: true, message: 'Thank you for your message!' });
  //   console.error('Error:', error);
  //   return res.redirect(303, '/public/contact.html');
  // } catch (error) {
  //   // return res.status(500).json({ success: false, message: 'Email failed to send.' });
  //   return res.redirect(303, '/public/404.html');
      
  // }

  try {
    await transporter.sendMail(mailOptions);
    return res.redirect(303, '/contact.html'); // Success redirect
  } catch (error) {
    console.error('Error:', error);
    return res.redirect(303, '/404.html'); // Error redirect
  }
}



