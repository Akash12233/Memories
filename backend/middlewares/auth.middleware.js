import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import db from "../db/index.js";


export const verifyJWT = asyncHandler(async(req, _, next) => {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const [userRows] = await db.promise().query('SELECT id, firstname, lastname, email FROM user WHERE id = ?', [decodedToken.id]);
        const user = userRows[0];
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next() 
    
})