const mysql=require('mysql')
const timestamp = require('time-stamp');

var conn = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'blogDB'
});
   
conn.connect(err=>{});

exports.add=(req,res)=>{

    let {category,title,quill}=req.body;
    let {originalname}=req.file;
    let bid=Math.floor(Math.random() * 1000000000);
    var sql="insert into blogs (bid,uid,title,category,date,coverImg,quill) values ('"+bid+"','"+req.session.email+"','"+title+"','"+category+"','"+timestamp('DD-MM-YYYY  HH:mm:ss')+"','"+originalname+"','"+quill+"')";

    conn.query(sql,(err,result)=>{
        if(err)throw err;
        console.log('(BLOG) Doc Insert: SUCCESS');
    })
}
