const express=require('express');
const bodyParser = require("body-parser");
const ejs=require('ejs')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose=require('mongoose')

const indexRoutes=require('./routes/index.routes');
const blogRoutes=require('./routes/blog.routes');
const userRoutes=require('./routes/authentication.routes');

const app=express();

var mongoUri='mongodb+srv://blogproject:blogproject@cluster0.psobybf.mongodb.net/blogDB';
mongoose.connect(mongoUri).then(console.log('DB CONNECTED'))

app.set("view engine", "ejs"); // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var store=new MongoDBStore({
    uri:mongoUri,
    collection:'sessions'
})

app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store:store
    })
);

app.use('/',indexRoutes);
app.use('/',blogRoutes);
app.use('/',userRoutes);



const port=3000;
app.listen(port,()=>{
    console.log('APP-ACTIVE http://localhost:'+port);
})