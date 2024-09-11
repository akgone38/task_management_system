// authMiddleware.js
// export const authenticate = (req, res, next) => {
//     // Implement your authentication logic here
//     // Set req.userId to the current user's ID after validating the token
//     const userId = req.headers['user-id']; // Example, replace with your actual logic
  
//     if (userId) {
//       req.userId = userId;
//       next();
//     } else {
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   };
  
import jwt from 'jsonwebtoken';

const auth= (req,res,next)=>{
  const authHeader= req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  if(!token){
    return res.status(401).json({msg:'No token, authorization denied'});
  }
  try{
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    req.user= decoded.user;
    next();
  } catch(err){
    res.status(401).json({msg:'Token is not valid'});
  }
};

export default auth;