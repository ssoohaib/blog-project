const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{ res.send('lol')});

module.exports=router;