const db = require('../models/index')
const {sequelize} = require('../config/db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {createUser , validateUserSignUp , loginUser  , sendOTP} = require('../middleware/index')
const {ok} = require('../utils/standardResponse')
const {UnexpectedError}= require('../utils/Error')

exports.signup = async function (request, response, next) { 
    try {
        const {  username , phoneNumber , gender , password , email } = request.body;
        const userExist = await db.User.findOne({ where: { email:email , phoneNumber:phoneNumber } });  
        if (userExist) { return response.status(409).json({ message: 'email already exists' });} 
        const phoneExist = await db.User.findOne({ where: { phoneNumber:phoneNumber } });  
        if (phoneExist) { return response.status(409).json({ message: 'phone already exists' });} 
        const user = await createUser(request.body)
        const token = jwt.sign({ id: user.id   , email },"NADIAFAHMY-1234$-DEVELOPMENT-FINTECH",{expiresIn: "1h", })
        response.status(201).json({ data :user , token , message: 'An Email sent to your account please verify' });     
      } catch (error) {
        console.log("🚀 ~ file: user.js:17 ~ error:", error)
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
      return next(new UnexpectedError())
      }  
}
exports.sendOTP = async function (request, response, next) { 
  try {
      const {   email } = request.body;
      let data = {}
      // const userExist = await db.User.findOne({ where: { email:email  } });  
      // if ( !userExist) { return response.status(409).json({ message: 'user not found' });} 
       const user = await sendOTP(request.body)
      data.otp = user
      response.status(201).json({ data  });     
    } catch (error) {
      console.log("🚀 ~ file: user.js:17 ~ error:", error)
      if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
    return next(new UnexpectedError())
    }  
}

exports.verifyEmail = async function (request, response, next) { 
  try {
    const { email, otp } = request.body;
    console.log("🚀 ~ file: user.js:44 ~ email, otp:", email, otp)
    const user = await validateUserSignUp(email, otp);
    const updatedUser = await db.User.update({ verified: true} , { where: { email: email} })
    return ok('verified ' , undefined, response);
    } catch (error) {
      console.log("00000",error)
      if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
      return next(new UnexpectedError())
    }  
}


exports.login = async function (request, response, next) {  
  try {
    const { email, password  } = request.body;
    const updatedUser = await loginUser(request.body)
    const user = await db.User.findOne({ where: { email:email , verified:true ,OTP: true  } });
    if (!user) { return response.status(401).json({ message: 'Invalid email' });}
    var passwordIsValid = bcrypt.compareSync(request.body.password,user.password);
    if (passwordIsValid === false) { return response.status(401).send({ message: "Invalid Password!" });}
    const token = jwt.sign({ id: user.id , email  },"NADIAFAHMY-1234$-DEVELOPMENT-FINTECH",{expiresIn: "1h", })
    response.status(200).json({ phoneNumber :user.phoneNumber ,token ,message: 'User login successfully' });          
    } 
     catch (error) {
        console.error('Error searching for user:', error);
        if (error.httpStatus == 400 ||error.httpStatus == 404) return next(error)
        return next(new UnexpectedError(error))
      }
}