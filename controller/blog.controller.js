const mysql=require('mysql')
const timestamp = require('time-stamp');
const path=require('path')
require('dotenv').config()

var conn = mysql.createConnection({
    host     : process.env.DB_HOSTNAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});
   
conn.connect(err=>{});



exports.get_blogs_all=(req,res)=>{

    let sql="select * from blogs";
    conn.query(sql,(err,result)=>{
        if(err) throw err

        if(!result.length){}

        res.render('home',{
            blogs:result
        })
    })
}


exports.edit=(req,res)=>{

    let {bid,title,category,quill}=req.body;
    let originalname=''+Date.now()+path.extname(req.file.originalname);
    let sql="update blogs set title='"+title+"', category='"+category+"',date='"+timestamp('DD-MM-YYYY  HH:mm:ss')+"', coverImg='"+originalname+"', quill='"+quill+"' where bid='"+req.params.ext+"'";
    // console.log(sql);
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        console.log('(BLOG) DOC UPDATE: SUCCESS');
        res.redirect('/userdashboard')
    })
}

exports.findEdit=(req,res)=>{

    let sql="select * from blogs where bid='"+req.params.ext+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length){}
        
        res.render('compose',{
            blog:result
        })
    })
}


exports.delete=(req,res)=>{
    let sql="delete from blogs where bid='"+req.params.ext+"'";
    conn.query(sql,(err,result)=>{
        if(err) throw err;

        res.redirect('/userdashboard')
    })
}

exports.getBlog=(req,res)=>{

    let sql="select * from blogs where bid='"+req.params.ext+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length){}
        
        res.render('blog',{
            blog:result
        })
    })
}

exports.blogs=(req,res)=>{
    let sql='';
    console.log('poppppppppppppp');

    if(req.params.ext && req.session.protocol=='admin'){
        sql="select * from blogs where uid = '"+req.params.ext+"'";
    }else{
        if(req.session.protocol=='admin')return res.redirect('/admindashboard')
        sql="select * from blogs where uid = '"+req.session.email+"'";
    }
        // console.log(req.params.ext);
    
    console.log('poppppppppppppp');
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        // console.log(result);
        res.render('userDashboard',{
            email:req.session.email,
            prot:req.session.protocol,
            blogs:result
        
        })
    })

}

exports.add=(req,res)=>{

    let {category,title,quill}=req.body;
    let originalname=''+Date.now()+path.extname(req.file.originalname);
    let bid=Math.floor(Math.random() * 1000000000);

    var sql="insert into blogs (bid,uid,uname,title,category,date,coverImg,likes,comments,quill) values ('"+bid+"','"+req.session.email+"','"+ req.session.uname.name+"','"+title+"','"+category+"','"+timestamp('DD-MM-YYYY')+"','"+originalname+"','0','0','"+quill+"')";

    conn.query(sql,(err,result)=>{
        if(err)throw err;
        console.log('(BLOG) Doc Insert: SUCCESS');
        res.redirect('/userdashboard')
    })
}
