const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function authenticate(req, res, next) {
    //Json web Token comes with 'req.headers.authorization' property   

    try {
        let token = req.headers.authorization;

        if (!token) {
          return res.json({
            message: "You are not authorized to enter in this route",
          });
        }
        token = token.split(' ')[1];
         //console.log(token)
        const verifiedToken = jwt.verify(token, "secret-key")
        const user = await User.findById(verifiedToken._id); 
        // console.log(user)

        if (!user) {
             return res.json({
               message: "You are not authorized to enter in this route",
             });
        }
        //req object is a mutable object, we can add properties in this and assign a value to it
        req.user = user;
        
     }catch (error) {
         console.log(error);
         res.status(400).json({message: "Invalid Token"})
     }
};




module.exports = authenticate;