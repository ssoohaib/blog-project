const express=require('express');
const bodyParser = require("body-parser");
const ejs=require('ejs')

const indexRoutes=require('./routes/index.routes');

const app=express();
app.set("view engine", "ejs"); // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use('/',indexRoutes);


const port=3000;
app.listen(port,()=>{
    console.log('PORT ACTIVE: ',port);
})