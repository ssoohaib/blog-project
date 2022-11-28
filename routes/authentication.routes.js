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
    if(req.body.twoFactorCode==123){
        req.session.isAuth=true;
        res.redirect('/userdashboard')
    }

    res.redirect('/signin')
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


router.get('/userdashboard',isAuth,(req,res)=>{
    res.render('userDashboard',{email:req.session.email})
})

router.get('/admindashboard',isAuth,(req,res)=>{
    res.render('admindashboard',{email:req.session.email})
})

router.post('/signout',user.signout);



module.exports=router;