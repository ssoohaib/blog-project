const express=require('express');
const router=express.Router();
const blog=require('../controller/blog.controller');


router.post('/compose',(req,res)=>{
    blog.add(req,res);
    res.redirect('/compose');
});



router.get('/',(req,res)=>{ res.send('lol')})
router.get('/compose',(req,res)=>{ res.render('compose')})


module.exports=router;