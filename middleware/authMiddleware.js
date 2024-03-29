const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;

    //check json web token exists & is verified
    if(token){
        jwt.verify(token, "secrect-key", (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/auth/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    } else{
        res.redirect('/auth/login');
    }
};

//check current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, "secrect-key", async (err, decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            } else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else{
        res.locals.user = null;
        next();
    }
};

module.exports = {requireAuth, checkUser};