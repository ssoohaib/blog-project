const mysql=require('mysql')
const timestamp = require('time-stamp');
require('dotenv').config()
const sendMail=require('../api/nodemailer')


var conn = mysql.createConnection({
    host     : process.env.DB_HOSTNAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

conn.connect(err=>{});


exports.update=(req,res)=>{
    const {name,email,password}=req.body;
    const sql="update users set name='"+name+"',email='"+email+"',password='"+password+"' where email='"+req.params.ext+"'"
    conn.query(sql,(err,result)=>{
        if(err)throw err
        res.redirect('/signout')
    })
}

exports.get_details_chng=(req,res)=>{
    const sql="select * from users where email='"+req.params.ext+"'"
    conn.query(sql,(err,result)=>{
        if(err)throw err
        res.render('details',{
            user:result,
            change:true
        })
    })
}


exports.get_details=(req,res)=>{
    const sql="select * from users where email='"+req.params.ext+"'"
    conn.query(sql,(err,result)=>{
        if(err)throw err
        res.render('details',{
            user:result,
            change:false
        })
    })
}

exports.change_protocol=(req,res)=>{
    const email=req.params.ext;

    const sql="update users set protocol='admin' where email='"+email+"'"
    conn.query(sql,(err,result)=>{
        if(err)throw err
        res.redirect('/admindashboard')
    })
}

exports.delete=(req,res)=>{

    let sql="delete from users where email = '"+req.params.ext+"'"

    conn.query(sql,(err,result)=>{
        if(err)throw err;
        res.redirect('/admindashboard')
    })
}

exports.fetch_users=(req,res)=>{

    let sql='select * from users';
    conn.query(sql,(err,result)=>{
        if(err)throw err;

        if(req.session.protocol=='admin')
        {

            let sqll="select * from blogs";
            conn.query(sqll,(e,rr)=>{
                if (e)throw e;
                res.render('admindashboard',{
                    email:req.session.email,
                    users:result,
                    blogs:rr
                })

            })
        }
    })
}


exports.add=async (req,res)=>{

    let {username,email,password}=JSON.parse(req.body.buffer);
    if(req.body.twoFactorCode!=req.session.code){return res.redirect('/signup')}

    var profileImg='-';
    var sql="insert into users (name,email,password,profileimg,protocol,date) values ('"+username+"','"+email+"','"+password+"','"+profileImg+"','user','"+timestamp('DD-MM-YYYY  HH:mm:ss')+"')";
    conn.query(sql,(err,result)=>{
        if(err)throw err;

        req.session.isAuth=true;
        req.session.email=email;
        req.session.uname=username;
        
        console.log('(USER) DOC INSERT: SUCCESS');
        res.redirect('/userdashboard');
    })
}

exports.find_signin= async(req,res)=>{
    const {email,password}=req.body;
    var sql="select * from users where email='"+email+"' and password='"+password+"'";
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        if(!result.length)return res.redirect("/signin");
        
        // req.session.isAuth=true;
        req.session.email=email;

        var sqll="select name from users where email='"+email+"'"
        conn.query(sqll,(e,rr)=>{
            if(e)throw e
            req.session.uname=result[0];


            if(result[0].protocol=='admin'){
                req.session.isAuth=true;
                req.session.protocol='admin';
                return res.redirect('/admindashboard');
            }
            req.session.protocol='user';
           
            req.session.code=Math.floor(Math.random() * 1000000);
            sendMail(email,req.session.code,'twofactor','Verification Code');
            
            res.render('signing',{
                purpose:'signin',
                enteredCredentials:req.body
            })
        })
    })
}

exports.find_signup= async(req,res)=>{
    const {email,password}=req.body;

    var sql="select * from users where email='"+email+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        if (result.length) return res.redirect("/signup");

        req.session.code=Math.floor(Math.random() * 1000000);
        sendMail(email,req.session.code,'twofactor','Verification Code')
        
        res.render('signing',{
            purpose:'signup',
            enteredCredentials:req.body
        })
    })
}

exports.signout=(req,res)=>{
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
}