const express=require('express');
const router=express.Router();

// const isAuth=require('../middleware/is-auth')
const user=require('../controller/authentication.controller')

router.post('/delete/:ext',user.delete);
router.post('/protocol/:ext',user.change_protocol);
router.get('/details/:ext',user.get_details);

router.get('/details/change/:ext',user.get_details_chng);
router.post('/details/change/:ext',user.update);

module.exports=router;