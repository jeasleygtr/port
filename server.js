// Dependencies

import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

// Sets up the Express app
const PORT = process.env.PORT || 8080;
const app = express();

// Sets up express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Sets up Handlebars

import exphbs from "express-handlebars";

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the static directory
app.use(express.static('public'));

// Import router
import htmlRoutes from "./controllers/htmlController.js";

app.use(htmlRoutes);

app.use(function(req, res, next){
    res.status(404);

    res.render('404');
    return;
});

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

app.listen(PORT, function() {
    console.log('Server listening on: http://localhost:' + PORT)
});
