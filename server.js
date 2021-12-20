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
function msg(status,body){
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
  // Message object
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'gaetano.kovacek77@ethereal.email',
        pass: 'PRKm32PP5gv8cCTGcq'
    }
});
  // console.log('hi')
  let message = {
    from: 'gaetano.kovacek77@ethereal.email',
    to: mail_id,
    subject: 'Nodemailer is unicode friendly ✔',
    text: mail_body,
    html: '<p><b>Hello</b> to myself!</p>'
};
transporter.sendMail(message, (err, info) => {

    if (err) {
        res.status(500).json(msg(false,err.message))
            // return process.exit(1);
        }
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }); 

res.status(200).json(msg(true,"Email sent successfully"))
// console.log('hi') 
})
