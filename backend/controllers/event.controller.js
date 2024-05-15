import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addevent = asyncHandler(async (req, res) => {
    const{event_name, event_description} = req.body;
    const user_id= req.user;
    if(!event_name || !event_description){
        throw new ApiError(400, "All fields are required");
    }
    const bannerLocalPath = req.files?.banner[0]?.path;
    
    if (!bannerLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const banner_url = await uploadOnCloudinary(avatarLocalPath);
    if (!banner_url) {
        throw new ApiError(400, "Avatar file is required")
    }

    const insertQuery = `INSERT INTO Events (event_name, event_description, banner_url, user_id) VALUES (?, ?, ?, ?);`; 

    await db.promise().query(insertQuery, [event_name, event_description, banner_url, user_id]);

    return res.
    status(201).
    json(new ApiResponse(201, "Event created successfully"))
}); 

const getEventbyid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getEventQuery = `SELECT * FROM Events WHERE id = ?;`;
    const [rows] = await db.promise().query(getEventQuery, [id]);
    const event = rows[0];
    if (!event) {
        throw new ApiError(404, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event fetched successfully", event));
});

const getEventbyuser = asyncHandler(async (req, res) => {
    const { user_id } = req.user;
    const getEventQuery = `SELECT * FROM Events WHERE user_id = ?;`;
    const [rows] = await db.promise().query(getEventQuery, [user_id]);
    const event = rows[0];
    if (!event) {
        throw new ApiError(404, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event fetched successfully", event));
});

export { addevent, getEventbyid, getEventbyuser };