const express=require('express');
const router=express.Router();
const subscribe=require('../api/mailchimp')



router.post('/subscribe-newsletter',subscribe.subscribe)


module.exports=router;