const express=require('express');
const router=express.Router();

const blog=require('../controller/blog.controller');



router.get('/',blog.get_blogs_all)
// router.get('/',(req,res)=>{
//     res.render('home')
// });

module.exports=router;