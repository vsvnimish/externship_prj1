const express=require('express');
const app=express();
const https=require('https');
app.listen(3000);
// app.setTimeout(0)
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}));
function message(status,body){
	var msg={
		"success" : status,
		"message" : body
	}
	return msg
}
app.post('/',function(req,res){
	var mail_id=req.body.to
	var mail_body=req.body.email_body
	const nodemailer = require('nodemailer');
// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
	if (err) {
		res.status(500).json(message(false,err.message))
	}
	console.log('Credentials obtained, sending message...');
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
    	host: account.smtp.host,
    	port: account.smtp.port,
    	secure: account.smtp.secure,
    	auth: {
    		user: account.user,
    		pass: account.pass
    	}
    });

    // Message object
    let message = {
    	from: account.user,
    	to: mail_id,
    	subject: 'Nodemailer is unicode friendly ✔',
    	text: mail_body,
    	html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info) => {
    	if (err) {
    		res.status(500).json(message(false,err.message))
    		// return process.exit(1);
    	}
    	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});    
 res.status(200).json(message(true,"Email sent successfully"))
})
