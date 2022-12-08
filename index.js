const express=require('express');
const bodyParser = require("body-parser");
const ejs=require('ejs')
const session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
const mysql=require('mysql');
const http = require('http');

const app=express();




const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const comm=require('./controller/comments.controller')


var online=0;
io.on('connection', (socket) => {
  online++;
  console.log('+'+online);

  io.emit('live-counter',online);

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    });

  socket.on('disconnect', () => {
    online--;
    console.log('-'+online);
    });
});









require('dotenv').config()
   
var connection = mysql.createConnection({
    host     : process.env.DB_HOSTNAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

connection.connect(err=>{});

const indexRoutes=require('./routes/index.routes');
const blogRoutes=require('./routes/blog.routes');
const userAuthRoutes=require('./routes/authentication.routes');
const userEditRoutes=require('./routes/users.edit');
const commentRoutes=require('./routes/comments.routes');
const newsletter=require('./routes/newsletter.route')



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var options = {
	host: process.env.DB_HOSTNAME,
	port: 3306,
	user: process.env.DB_USER,
	password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store:sessionStore
    })
);

app.use('/',indexRoutes);
app.use('/',blogRoutes);
app.use('/',userAuthRoutes);
app.use('/',userEditRoutes);
app.use('/',commentRoutes);
app.use('/',newsletter);


const port=process.env.PORT;
server.listen(port,()=>{
    console.log('APP-ACTIVE http://localhost:'+port);
})