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




exports.downvote=(req,res)=>{
    let upid=Math.floor(Math.random() * 1000000000);
    let bid=req.params.ext;
    let uid=req.session.email;
    let uname=req.session.uname.name;
    
    var sql="insert into downvotes (did,bid,uid,uname,date) values ('"+upid+"','"+bid+"','"+uid+"','"+uname+"','"+timestamp('DD-MM-YYYY   HH:mm:ss')+"')"
    conn.query(sql,(err,result)=>{
        if(err) throw err

        let sqll="update blogs set downvotes=downvotes+1 where bid='"+bid+"'"
        conn.query(sqll,(e,rr)=>{
            if(e)throw e
            res.redirect('/blog/'+bid);
        })
    })
}

exports.rem_downvote=(req,res)=>{
    var sql="delete from downvotes where uid='"+req.session.email+"' and bid='"+req.params.ext+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err


        let sqll="update blogs set downvotes=downvotes-1 where bid='"+req.params.ext+"'"
        conn.query(sqll,(e,r)=>{
            if(e)throw e
            res.redirect('/blog/'+req.params.ext);
        })

    })
}




exports.upvote=(req,res)=>{

    let upid=Math.floor(Math.random() * 1000000000);
    let bid=req.params.ext;
    let uid=req.session.email;
    let uname=req.session.uname.name;
    
    var sql="insert into upvotes (upid,bid,uid,uname,date) values ('"+upid+"','"+bid+"','"+uid+"','"+uname+"','"+timestamp('DD-MM-YYYY   HH:mm:ss')+"')"
    conn.query(sql,(err,result)=>{
        if(err) throw err

        let sqll="update blogs set likes=likes+1 where bid='"+bid+"'"
        conn.query(sqll,(e,rr)=>{
            if(e)throw e
            res.redirect('/blog/'+bid);
        })
    })
}

exports.rem_upvote=(req,res)=>{

    var sql="delete from upvotes where uid='"+req.session.email+"' and bid='"+req.params.ext+"'";
    conn.query(sql,(err,result)=>{
        if(err)throw err


        let sqll="update blogs set likes=likes-1 where bid='"+req.params.ext+"'"
        conn.query(sqll,(e,r)=>{
            if(e)throw e
            res.redirect('/blog/'+req.params.ext);
        })

    })
}

exports.rem_like=(req,res)=>{

    let bid=req.params.ext;
    let sql="update blogs set likes=likes-1 where bid='"+bid+"'"
    conn.query(sql,(err,result)=>{
        if(err)throw err

    })
}

exports.add_comment=(req,res)=>{
    // console.log('commmmmm');
    let cid=Math.floor(Math.random() * 1000000000);
    let bid=req.params.ext;
    let uid=req.session.email;
    let uname=req.session.uname.name;
    let comment=req.body.comment;

    var sql="insert into comments (cid,bid,uid,uname,date,comment) values ('"+cid+"','"+bid+"','"+uid+"','"+uname+"','"+timestamp('DD-MM-YYYY   HH:mm:ss')+"','"+comment+"')"
    conn.query(sql,(err,result)=>{
        if(err)throw err



        let sqll="update blogs set comments=comments+1 where bid='"+bid+"'"
        conn.query(sqll,(e,r)=>{
            if(e)throw e
            res.redirect('/blog/'+bid);
        })

    })
}