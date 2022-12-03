const express=require('express');
const router=express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const isAuth=require('../middleware/is-auth')

const blog=require('../controller/blog.controller');



// router.get('/userdashboard',isAuth,(req,res)=>{
//     if(req.session.protocol=='admin')
//     {
//         console.log('----'+req.session.protocol);
//         res.redirect('/admindashboard')
//     }
//     res.render('userDashboard',{email:req.session.email})
// })
router.get('/userdashboard',isAuth,blog.blogs);



router.get('/compose',isAuth,(req,res)=>{ res.render('compose')});
router.post('/compose',upload.single('avatar'),blog.add);

module.exports=router;