import jwt from 'jsonwebtoken'


const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies
        
        if(!token){
            // It's often better to use 401 Unauthorized for authentication failures
            return res.status(401).json({message:"User is not authenticated (no token)"})
        }
        
        let verifyToken;
        try {
            verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        } catch (jwtError) {
            // Handle specific JWT errors like TokenExpiredError, JsonWebTokenError
            console.log("JWT Verification Error:", jwtError.message);
            return res.status(401).json({message:"Invalid or expired token"})
        }

        // The original code checked if (!verifyToken) here, but jwt.verify throws an error on failure,
        // so if we reach here, verifyToken should be a valid decoded payload.
        // It's good practice to ensure the payload contains expected data like userId.
        if (!verifyToken || !verifyToken.userId) { // Ensure payload has userId
            return res.status(401).json({message:"Token is valid but missing user ID"})
        }

        req.userId = verifyToken.userId
        next()

    } catch (error) {
        // This catch block will now mostly catch errors related to req.cookies or unexpected issues
        console.log("isAuth general error:", error.message)
        return res.status(500).json({message:`Authentication error: ${error.message}`})
    }
}

export default isAuth