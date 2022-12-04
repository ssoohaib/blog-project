const express=require('express');
const router=express.Router();
const isAuth=require('../middleware/is-auth')
const blog=require('../controller/blog.controller');

const multer  = require('multer')
const path=require('path')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
  
var upload = multer({ storage: storage });

router.get('/blog/:ext',blog.getBlog);
router.post('/blog-delete/:ext',blog.delete);
router.get('/blog-edit/:ext',blog.findEdit);
router.post('/blog-edit/:ext',upload.single('avatar'),blog.edit);


router.get('/userdashboard/:ext?',isAuth,blog.blogs);



router.get('/compose',isAuth,(req,res)=>{ 
  res.render('compose',{
    blog:[]
  })
});
router.post('/compose',upload.single('avatar'),blog.add);

module.exports=router;