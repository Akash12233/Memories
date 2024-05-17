import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addsubevent = asyncHandler(async (req, res) => {
    const{name, description, location, time} = req.body;

    const {id}= req.params;

    console.log(req.body);
    if(!name || !description || !location || !time){
        throw new ApiError(400, "All fields are required");
    }

    const insertQuery = `INSERT INTO subEvents (event_name, event_description, location, start_date, event_id) VALUES (?, ?, ?, ?, ?);`; 

    await db.promise().query(insertQuery, [name, description, location,time, id]);

    return res
    .status(201)
    .json(new ApiResponse(201, "Event added successfully", ));

    
});

const getsubEventbyid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getEventQuery = `SELECT * FROM subEvents WHERE event_id = ?;`;
    const [rows] = await db.promise().query(getEventQuery, [id]);
    const event = rows;
    if (!event) {
        throw new ApiError(404, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
});

export { addsubevent, getsubEventbyid };