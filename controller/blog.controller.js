const mongoose = require('mongoose');
const timestamp = require('time-stamp');
 

//-Connection to mongoDB atlas server
mongoose.connect('mongodb+srv://admin-joe:joe123@cluster0.8uljuc6.mongodb.net/blogDB');

//-Schema for collection
const blogSchema=new mongoose.Schema({
    userID:String,
    title:String,
    category:String,
    date:String,
    comments:[],
    coverImg:String,
    quill:String
})
const blog=mongoose.model("blog",blogSchema);


exports.add=(req,res)=>{
    const temp=new blog({
        userID:'-',
        title:req.body.title,
        category:req.body.category,
        date:timestamp('DD-MM-YYYY  HH:mm:ss'),
        
        coverImg:'-',
        quill:req.body.quill
    });
    temp.save();
    console.log('Doc Insert: SUCCESS');
}
