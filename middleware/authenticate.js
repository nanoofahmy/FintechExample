// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

const authenticateUser = async (request, response, next) => {
  const token = request.headers['authorization'].split(" ")[1];
  if (!token) { return response.status(401).json({ message: 'Access denied. No token provided.' });}
  try {
    const { email, id } = jwt.verify(token, "NADIAFAHMY-1234$-DEVELOPMENT-FINTECH", "1h"); 
    const userExist = await User.findOne({ where: { email:email , id:id } });
    const decoded = jwt.verify(token, "NADIAFAHMY-1234$-DEVELOPMENT-FINTECH"); 
    request.user = userExist;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
