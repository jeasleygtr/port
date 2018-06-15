app.post('/send', (req, res) => {
    // console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>  
    </ul>
    <h3>Comment</h3>
    <p>${req.body.comment``}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'jeasleydevtest@gmail.com', // generated ethereal user
          pass: 'devtest1' // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Jeffrey Easley portfolio page" <jeasleydevtest@gmail.com>', // sender address
      to: 'jeasleydev@gmail.com', // list of receivers
      subject: 'Contact form', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      res.redirect('home', {msg:'Email has been sent'});
  });
  });