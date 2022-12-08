const express=require("express");
const request=require("request");
const https=require("https");
require('dotenv').config()

const sendMail=require('./nodemailer')


exports.subscribe=(req,res)=>{
    var {subEmail}=req.body;
    
    console.log("sub--"+subEmail);

    var data = {
        members:[
            {
                email_address: subEmail,
                status:"subscribed",
                // merge_fields:{
                //     FNAME: fname
                // }
            }
        ]
    };

    var jsonData=JSON.stringify(data);
    var url = process.env.URL;

    const options={
        method:"POST",
        auth:process.env.KEY

    }

    const request=https.request(url,options,function(response){

        if(response.statusCode===200)
        {
            res.redirect('/')
        }else {
            res.redirect('/')
        }
      
        response.on("data",function(data){
            // console.log(JSON.parse(data));
        })
    })
    sendMail(subEmail,0,'newsletter','SUBSCRIBED')
    request.write(jsonData);
    request.end();
}