const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const nodemailer=require('nodemailer');
require('dotenv').config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


module.exports=(reciever,code,template,subject)=>{
    let mailOptions = {
        from: 'theblogprojectt@gmail.com',
        to: reciever,
        subject: subject,
        // text: code
        template: template,
        context: {
            code:code
        }
    };
    // console.log('pop--'+reciever);
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
          return 0;
        } else {
          console.log("Email sent successfully");
          return 1;
        }
      });
}