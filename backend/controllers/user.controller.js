import db from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        
        const getUserQuery = `
            SELECT * FROM user WHERE id = ?;
        `;
        const [rows] = await db.promise().query(getUserQuery, [userId]);
        const user = rows[0];

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Update refresh token in the database
        const updateRefreshTokenQuery = `
            UPDATE user SET refresh_token = ? WHERE id = ?;
        `;
        await db.promise().query(updateRefreshTokenQuery, [refreshToken, userId]);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating refresh and access tokens");
    }
};

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.body.refreshToken || req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        throw new Error("Unauthorized request");
    }

    try {
        // Verify refresh token
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Retrieve user from the database
        const getUserQuery = `
            SELECT * FROM User WHERE refreshToken = ?;
        `;
        const [rows] = await db.promise().query(getUserQuery, [incomingRefreshToken]);
        const user = rows[0];

        if (!user) {
            throw new Error(400, "Invalid refresh token");
        }

        // Generate new access and refresh tokens
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // Update refresh token in the database
        const updateRefreshTokenQuery = `
            UPDATE User SET refreshToken = ? WHERE id = ?;
        `;
        await db.promise().query(updateRefreshTokenQuery, [newRefreshToken, user.id]);

        
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, "Refresh token is expired or used")
    }
});

/*--------------------------------------------------------------------------------------------------------------------------------------*/


const adduser = asyncHandler(async (req, res, next) => {
    const { firstname, lastname, email,  password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

        // Check if user already exists
        const checkUserQuery = `
            SELECT * FROM user WHERE email = ? OR firstname = ? OR lastname = ?;
        `;
        const [rows] = await db.promise().query(checkUserQuery, [email, firstname, lastname]);
        const existingUser = rows[0];
        if (existingUser) {
            throw new ApiError(400, "User with email or username already exists");
        }

        // Hash the password
        const hashedPassword = await hashPassword(password, 10);

        // Insert user details into the database
        const createUserQuery = `
            INSERT INTO User (firstname, lastname, email, password)
            VALUES (?, ?, ?, ?);
        `;
        const [result] = await db.promise().query(createUserQuery, [firstname, lastname, email, hashedPassword]);
        console.log(result);

        const userId = result.insertId;

        // Retrieve created user from the database
        const getUserQuery = `
            SELECT * FROM user WHERE id = ?;
        `;
        const [userRows] = await db.promise().query(getUserQuery, [userId]);
        const createdUser = userRows[0];

        if (!createdUser) {
            throw new ApiError(400, "User registration failed");
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
    
 });

 const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email) {
        throw new ApiError("Username or email is required");
    }
        
        const getUserQuery = `
            SELECT * FROM User WHERE email = ?;
        `;
        const [rows] = await db.promise().query(getUserQuery, [email]);
        const user = rows[0];

        if (!user) {
            throw new ApiError("User does not exist");
        }

        // Verify password
        const isPasswordValid = await checkPassword(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError("Invalid user credentials");
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.id);

        // Remove sensitive data from the user object
        delete user.password;
        delete user.refreshToken;

        // Set options for cookies
        const options = {
            httpOnly: true,
            secure: true
        };

        // Return user details along with tokens
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {
                    user: user, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
});

const logout = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log(user);
        const clearRefreshTokenQuery = `
            UPDATE User SET refresh_token = NULL WHERE id = ?;
        `;
        await db.promise().query(clearRefreshTokenQuery, [user.id]);

        // Set options for cookies
        const options = {
            httpOnly: true,
            secure: true
        };

        // Return a response indicating successful logout
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
   
});

const changeCurrentpassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.user;
    try {
        // Retrieve user from the database
        const getUserQuery = `
            SELECT * FROM User WHERE id = ?;
        `;
        const [rows] = await db.promise().query(getUserQuery, [userId]);
        const user = rows[0];
        if (!user || user.password !== currentPassword) {
            throw new Error("Old password is wrong");
        }
        await db.promise().query('UPDATE User SET password = ? WHERE id = ?', [newPassword, userId]);

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
    }
    catch(error){
        throw new ApiError("Error while changing password: " + error.message);
    }


});

const getcurrentuser = asyncHandler(async (req, res) => {
    const userId= req.user.id;
        // Retrieve user from the database
        
        const getUserQuery = `
            SELECT * FROM User WHERE id = ?;
        `;
        const [rows] = await db.promise().query(getUserQuery, [userId]);
        const user = rows[0];
        if (!user) {
            throw new ApiError("User not found");
        } 
        delete user.password;
        delete user.refresh_token;
        return res.status(200)
        .json(new ApiResponse(
            200,
            user,
            "User fetched successfully"
        ))


    
});

const updateAccountDetails = asyncHandler( async (req, res) => {
    const userId = req.user.id;

    const { firstname, lastname, email, mobilenumber } = req.body;
    if ([firstname, lastname, email, mobilenumber].some((field) => !field || field.trim() === "")) {
        throw new Error("All fields are required");
    } 

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Error in uploading cloudinary")
    }

    await db.promise().query('UPDATE User SET firstname = ?, lastname= ?, email = ?, mobile_number = ?,  avatar_url = ? WHERE id = ?', [firstname, lastname, email, mobilenumber,avatar.url, userId]);
    
        // Fetch updated user from the database
        const [userRows] = await db.promise().query('SELECT * FROM User WHERE id = ?', [userId]);
        const user = userRows[0];

    return res
    .status(200)
    .json(new ApiResponse( 200, user,"Account details updated successfully" ));
   

});

export {loginUser, logout, getcurrentuser, updateAccountDetails, changeCurrentpassword, adduser, refreshAccessToken};
