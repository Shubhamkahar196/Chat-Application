import jwt from "jsonwebtoken"

 const protectMiddleware = async(req,res,next)=>{
    try{
        const token = req.cookies?.authToken;

        if(!token){
            return res.status(401).json({
                message: "No authentication token provided"
            })
        }
        const userData = await jwt.verify(token, process.env.JWTPRIVATEKEY);
   
         // Attach user data to the request object for subsequent middleware/routes
        req.user = userData;
        next();
    }catch(error){
        console.error("Authentication error:", error);
        if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token." });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired." });
    } else {
      return res.status(500).json({ message: "Authentication failed." });
    }
}
    
};

export default protectMiddleware
