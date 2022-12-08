const express=require('express');
const router=express.Router();


const blog=require('../controller/blog.controller');
const pdf=require('../api/puppeteer')


const isAuth=require('../middleware/is-auth')

router.get('/',blog.get_blogs_all)
router.post('/filter',blog.get_blogs_type)

router.post('/pdf',isAuth,pdf)

router.get('/about',(req,res)=>{
    res.render('about')
})
router.get('/contact',(req,res)=>{
    res.render('abcon')
})

module.exports=router;