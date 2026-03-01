import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not Found" });
    }

    let verifyToken= await jwt.verify(token, process.env.JWT_SECRET);
     
    req.userId= verifyToken.userId;
    next();
  
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error " + error.message });
  }
};

export default isAuth;