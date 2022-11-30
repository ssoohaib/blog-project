const mysql=require('mysql')
const timestamp = require('time-stamp');

var conn = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'blogDB'
});
   
conn.connect(err=>{});

exports.add=async (req,res)=>{

    let {username,email,password}=JSON.parse(req.body.buffer);
    if(req.body.twoFactorCode!=123){return res.redirect('/signup')}

    var profileImg='-';
    var sql="insert into users (name,email,password,profileimg,protocol,date) values ('"+username+"','"+email+"','"+password+"','"+profileImg+"','user','"+timestamp('DD-MM-YYYY  HH:mm:ss')+"')";
    conn.query(sql,(err,result)=>{
        if(err)throw err;

        req.session.isAuth=true;
        req.session.email=email;
        
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
        
        req.session.isAuth=true;
        req.session.email=email;

        if(result[0].protocol=='admin')return res.redirect('/admindashboard');
       
        res.render('signing',{
            purpose:'signin',
            enteredCredentials:req.body
        })
    })
}

exports.find_signup= async(req,res)=>{
    const {email,password}=req.body;

    var sql="select * from users where email='"+email+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        if (result.length) return res.redirect("/signup");
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