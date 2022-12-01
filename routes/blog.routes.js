const express=require('express');
const router=express.Router();


const blog=require('../controller/blog.controller');

router.get('/compose',(req,res)=>{ res.render('compose')});
router.post('/compose',(req,res)=>{
    blog.add(req,res)
    res.redirect('/compose')
});

module.exports=router;