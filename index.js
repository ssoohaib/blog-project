const express=require('express');
const bodyParser = require("body-parser");
const ejs=require('ejs')
const session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
const mysql=require('mysql');


var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'blogDB'
});
   
// var connection = mysql.createConnection({
//     host     : 'sql6.freemysqlhosting.net',
//     user     : 'sql6582207',
//     password : 'UENh22yBdU',
//     database : 'sql6582207'
// });

connection.connect(err=>{

});

const indexRoutes=require('./routes/index.routes');
const blogRoutes=require('./routes/blog.routes');
const userAuthRoutes=require('./routes/authentication.routes');
const userEditRoutes=require('./routes/users.edit');


const app=express();

app.set("view engine", "ejs"); // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// var options = {
// 	host: 'sql6.freemysqlhosting.ne',
// 	port: 3306,
// 	user: 'sql6582207',
// 	password : 'UENh22yBdU',
//     database : 'blogDB'
// };

var options = {
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password : '',
    database : 'blogDB'
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




const port=3000;
app.listen(port,()=>{
    console.log('APP-ACTIVE http://localhost:'+port);
})