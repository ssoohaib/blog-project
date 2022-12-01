const express=require('express');
const router=express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const blog=require('../controller/blog.controller');

router.get('/compose',(req,res)=>{ res.render('compose')});
router.post('/compose',upload.single('avatar'),(req,res)=>{
    blog.add(req,res)
    res.redirect('/compose')
});

module.exports=router;