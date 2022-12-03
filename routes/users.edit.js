const express=require('express');
const router=express.Router();

// const isAuth=require('../middleware/is-auth')
const user=require('../controller/authentication.controller')

router.post('/delete/:ext',user.delete);

module.exports=router;