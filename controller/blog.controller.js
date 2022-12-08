const mysql=require('mysql')
const timestamp = require('time-stamp');
const path=require('path');
const e = require('express');
require('dotenv').config()

var conn = mysql.createConnection({
    host     : process.env.DB_HOSTNAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});
   
conn.connect(err=>{});


exports.get_blogs_type=(req,res)=>{
    console.log('pop--'+req.body.cars);
    let sql="";

    if(req.body.cars=='ALL'){
        sql="select * from blogs"
    }else{
        sql="select * from blogs where category='"+req.body.cars+"'"
    }
    console.log(sql);
    conn.query(sql,(err,result)=>{
        if(err) throw err

        if(!result.length){}

        res.render('home',{
            cat:req.body.filter,
            blogs:result
        })
    })

}


exports.get_blogs_all=(req,res)=>{

    let sql="select * from blogs";
    conn.query(sql,(err,result)=>{
        if(err) throw err

        if(!result.length){}

        res.render('home',{
            cat:'ALL',
            blogs:result
        })
    })
}


exports.edit=(req,res)=>{

    let {bid,title,category,quill}=req.body;
    let originalname=''+Date.now()+path.extname(req.file.originalname);
    let sql="update blogs set title='"+title+"', category='"+category+"',date='"+timestamp('DD-MM-YYYY')+"', coverImg='"+originalname+"', quill='"+quill+"' where bid='"+req.params.ext+"'";
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

    let bid=req.params.ext;
    let sql="select * from blogs where bid='"+bid+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length){}

        let sqll="select * from comments where bid='"+bid+"'"
        conn.query(sqll,(e,comments)=>{
            if(e)throw e



            if(req.session.isAuth){
                // console.log('==============='+req.session.email);
                let sqlll="select * from upvotes where uid='"+req.session.email+"' and bid='"+bid+"'"
                conn.query(sqlll,(ee,ll)=>{
                    if(ee)throw ee

                    if(ll.length){
                        // console.log('before');
                        res.render('blog',{
                            isAuth:req.session.isAuth,
                            voted:true,
                            downvoted:false,
                            comments:comments,
                            blog:result
                        })
                    }else{

                        let sqllll="select * from downvotes where uid='"+req.session.email+"' and bid='"+bid+"'"
                        conn.query(sqllll,(eee,dd)=>{
                            if(eee)throw eee
                            if(dd.length){
                                res.render('blog',{
                                    isAuth:req.session.isAuth,
                                    voted:false,
                                    downvoted:true,
                                    comments:comments,
                                    blog:result
                                })
                            }else{
                                res.render('blog',{
                                    isAuth:req.session.isAuth,
                                    voted:false,
                                    downvoted:false,
                                    comments:comments,
                                    blog:result
                                })
                            }
                        })
        
                    }
                })
            }else{
                // console.log('after');
                res.render('blog',{
                    isAuth:req.session.isAuth,
                    voted:false,
                    downvoted:false,
                    comments:comments,
                    blog:result
                })

            }
        })
        
    })
}

exports.blogs=(req,res)=>{
    let sql='';
    if(req.params.ext && req.session.protocol=='admin'){
        sql="select * from blogs where uid = '"+req.params.ext+"'";
    }else{
        if(req.session.protocol=='admin')return res.redirect('/admindashboard')
        sql="select * from blogs where uid = '"+req.session.email+"'";
    }
    conn.query(sql,(err,result)=>{
        if(err)throw err;
        
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
