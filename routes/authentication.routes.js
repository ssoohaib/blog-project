const express=require('express');
const router=express.Router();

const isAuth=require('../middleware/is-auth')
const user=require('../controller/authentication.controller')


//signin authentication
router.get('/signin',(req,res)=>{
    
    if(req.session.isAuth) res.redirect('/userdashboard');

    res.render('signing',{
        purpose:'signin',
        enteredCredentials:null
    }

)});

router.post('/signin',user.find_signin);

router.post('/signin/verified',(req,res)=>{
    if(req.body.twoFactorCode==req.session.code){


        req.session.isAuth=true;
        res.redirect('/userdashboard')
    }
    // if(req.body.twoFactorCode==123){


    //     req.session.isAuth=true;
    //     res.redirect('/userdashboard')
    // }

        // req.session.destroy((err) => {
        //     if (err) throw err;
        //     res.redirect('/signin')
        // });

})




//signup authentication
router.get('/signup',(req,res)=>{

    if(req.session.isAuth) res.redirect('/userdashboard');

    res.render('signing',{
        purpose:'signup',
        enteredCredentials:null
    }
)});
router.post('/signup',user.find_signup);
router.post('/signup/verified',user.add);

router.get('/admindashboard',isAuth,user.fetch_users);
router.post('/signout',user.signout);
router.get('/signout',user.signout);

module.exports=router;