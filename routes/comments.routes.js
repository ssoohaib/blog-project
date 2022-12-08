const express=require('express');
const router=express.Router();
const isAuth=require('../middleware/is-auth')
const comm=require('../controller/comments.controller')








router.post('/comm/:ext',isAuth,comm.add_comment)
router.post('/comm/reply/:ext',isAuth,(req,res)=>{})
router.post('/upvote/:ext',isAuth,comm.upvote)
router.post('/removeupvote/:ext',isAuth,comm.rem_upvote)

router.post('/downvote/:ext',isAuth,comm.downvote)
router.post('/removedownvote/:ext',isAuth,comm.rem_downvote)


// router.post('/downvote/:ext',isAuth,comm.rem_like)



module.exports=router;