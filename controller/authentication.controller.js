const mongoose = require('mongoose');
const timestamp = require('time-stamp');
 

//-Schema for collection
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profileImg:String,
    protocol:String,
    date:String
})
const user=mongoose.model("user",userSchema);


exports.add=async (req,res)=>{

    let {username,email,password}=JSON.parse(req.body.buffer);
    if(req.body.twoFactorCode!=123){return res.redirect('/signup')}

    const temp=new user({
        name:username,
        email:email,
        password:password,
        profileImg:'-',
        protocol:'user',
        date:timestamp('DD-MM-YYYY  HH:mm:ss')
    });

    await temp.save();
    console.log('(USER) Doc Insert: SUCCESS');
    req.session.isAuth=true;
    req.session.email=email;
    res.redirect('/userdashboard');

}

exports.find_signin= async(req,res)=>{
    const {email,password}=req.body;

    let result = await user.findOne({ email,password });

    if(result.protocol=='admin'){
        req.session.isAuth=true;
        req.session.email=email;
        return res.redirect('/admindashboard');
    }

    if (!result) 
      return res.redirect("/signin");
    

    res.render('signing',{
        purpose:'signin',
        enteredCredentials:req.body
    })
}

exports.find_signup= async(req,res)=>{
    const {email,password}=req.body;

    let result = await user.findOne({ email });
    if (result) 
      return res.redirect("/signup");
    

    res.render('signing',{
        purpose:'signup',
        enteredCredentials:req.body
    })
}

exports.signout=(req,res)=>{
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
      });
}