import jwt from "jsonwebtoken";

 const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "no token provided",
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return(
        res.status(401).json({message:"invalid token"}),
        (sucess=false)
      );
    }
    req.id = decoded.userId;
    next();
  } catch (error){
    return res.status(401).json({message:"Invalid token"});
  }
};

export default  authentication;  