import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addsubevent = asyncHandler(async (req, res) => {
    const{eventname, eventdescription, location, time} = req.body;

    const event_id= req.params;

    if(!eventname || !eventdescription || !location || !time){
        throw new ApiError(400, "All fields are required");
    }

    const insertQuery = `INSERT INTO subEvents (event_name, event_description, location, start_date) VALUES (?, ?, ?, ?);`; 

    await db.promise().query(insertQuery, [eventname, eventdescription, location,time, event_id]);

    return res
    .status(201)
    .json(new ApiResponse(201, "Event added successfully", ));

    
});

const getsubEventbyid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getEventQuery = `SELECT * FROM subEvents WHERE event_id = ?;`;
    const [rows] = await db.promise().query(getEventQuery, [id]);
    const event = rows[0];
    if (!event) {
        throw new ApiError(404, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event fetched successfully", event));
});

export { addsubevent, getsubEventbyid };