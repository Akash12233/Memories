import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addevent = asyncHandler(async (req, res) => {
    const{event_name, event_description, event_type, start_date, end_date} = req.body;
    const user_id= req.user.id;
    if(!event_name || !event_description || !event_type || !start_date || !end_date){
        throw new ApiError(400, "All fields are required");
    }
    const cohostid= req.user.id+ 10*event_name.length +100*event_description.length;
    const bannerLocalPath = req.files?.banner[0]?.path;
    
    if (!bannerLocalPath) {
        throw new ApiError(400, "Banner file is required")
    }

    const banner_url = await uploadOnCloudinary(bannerLocalPath);
    if (!banner_url) {
        throw new ApiError(400, " Error in uploading cloudinary")
    }

    const insertQuery = `INSERT INTO Events (event_name, event_description, banner_url, user_id, event_type, cohostid, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`; 

    await db.promise().query(insertQuery, [event_name, event_description, banner_url?.url, user_id, event_type, cohostid, start_date,end_date]);

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
    return res.status(200).json(new ApiResponse(200,event, "Event fetched successfully",));
});

const getEventbyuser = asyncHandler(async (req, res) => {
    const user_id  = req.user.id;
    const getEventQuery = `SELECT * FROM Events WHERE user_id = ?;`;
    const [rows] = await db.promise().query(getEventQuery, [user_id]);
    const event = rows;
    if (!event) {
        throw new ApiError(404, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
});

const updateEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { event_name, event_description, start_date, end_date } = req.body;
    if (!event_name || !event_description || !start_date || !end_date) {
        throw new ApiError(400, "All fields are required");
    }

    const updateQuery = `UPDATE Events SET event_name = ?, event_description = ? ,start_date = ?, end_date = ? WHERE id = ?;`;
    await db.promise().query(updateQuery, [event_name, event_description,start_date, end_date, id]);
    return res
        .status(200)
        .json(new ApiResponse(200, "Event updated successfully"));
});

export { addevent, getEventbyid, getEventbyuser, updateEvent };