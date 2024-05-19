import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addguest = asyncHandler(async (req, res) => {
    const {name, mobile, role} = req.body;
    const {id} = req.params;
    if(!name || !mobile || !role){
        throw new ApiError(400, "All fields are required");
    }

    const insertQuery = `INSERT INTO guest (guest_name, mobile_number, role_name, event_id) VALUES (?, ?, ?, ?);`;

    await db.promise().query(insertQuery, [name, mobile, role, id]);

    return res
    .status(201)
    .json(new ApiResponse(201, "Guest added successfully" ));
});

const addguestArray = asyncHandler(async (req, res) => {
    const guests = req.body.jsonData;
    const {id} = req.params;
    if(!guests){
        throw new ApiError(400, "All fields are required");
    }
    
    await Promise.all(Array.isArray(guests) && guests.map(async (guest) => {
        const name = guest[0];
        const mobile = guest[1];
        const role = guest[2];
        
        const insertQuery = `INSERT INTO guest (guest_name, mobile_number, role_name, event_id) VALUES (?, ?, ?, ?);`;

        await db.promise().query(insertQuery, [name, mobile, role, id]);
    }));

    

    return res
    .status(201)
    .json(new ApiResponse(201, "Guests added successfully" ));
});

const getguest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getguestQuery = `SELECT * FROM Guest WHERE event_id = ?;`;
    const rows = await db.promise().query(getguestQuery, [id]);
    const guest = rows[0];
    if (!guest) {
        throw new ApiError(404, "Guest not found");
    }
    let cohost =0;
    let photographer=0;
    let justguest =0;

    guest.map(guest=>{
        if(guest.role_name === "cohost"){
            cohost++;
        }else if(guest.role_name === "photographer"){
            photographer++;
        }else{
            justguest++;
        }
    })
    
    return res.status(200).json(new ApiResponse(200, {cohost, photographer, justguest, guest}, "Guest fetched successfully"));
});

export { addguest, getguest,addguestArray };