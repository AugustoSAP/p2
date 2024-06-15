import { response } from "express";

function authMiddleware(req,res,next){
    const authToken = req.headrs.authorization;

    if(!authToken) {
        return response.status(401).json({error: "Token not provided"})
    }

    return next()
}

export default authMiddleware