import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {  deleteOnCloudinary } from "../utils/cloudinary.js";

const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteQueryEvent = `DELETE FROM Events WHERE id = ?;`;
    await db.promise().query(deleteQueryEvent, [id]);

    const getimageQuery = `SELECT * FROM Images WHERE event_id = ?;`;
    const rows = await db.promise().query(getimageQuery, [id]);
    const images = rows[0];

    await Promise.all(images.map(async (image) => {
        const response =  await deleteOnCloudinary(image.imageurl);
        console.log(response);
        if (!response) {
            throw new ApiError(400, "Image file is required");
        }
    }));

    const getvideoQuery = `SELECT * FROM Video WHERE event_id = ?;`;
    const rowsVideo = await db.promise().query(getvideoQuery, [id]);
    const videos = rowsVideo[0];

    await Promise.all(videos.map(async (video) => {
        const response =  await deleteOnCloudinary(video.videourl);
        if (!response) {
            throw new ApiError(400, "Video file is required");
        }
    }));

    const deleteQueryImage = `DELETE FROM Images WHERE event_id = ?;`;
    await db.promise().query(deleteQueryImage, [id]);

    const deleteQueryVideo =`DELETE FROM Video WHERE event_id = ?;`;
    await db.promise().query(deleteQueryVideo, [id]);

    const deleteQuerySubevent =`DELETE FROM subEvents WHERE event_id = ?;`;
    await db.promise().query(deleteQuerySubevent, [id]);

    const deleteQueryGuest =`DELETE FROM Guest WHERE event_id = ?;`;
    await db.promise().query(deleteQueryGuest, [id]);

    return res
    .status(200)
    .json(new ApiResponse(200, "Event deleted successfully"));


});

const geteventdetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const getEventQuery = `SELECT * FROM Events WHERE id = ?;`;
    const [rows] = await db.promise().query(getEventQuery, [id]);
    const event = rows[0];
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    let filesize=0;

    const getimageQuery = `SELECT * FROM Images WHERE event_id = ?;`;
    const rows2 = await db.promise().query(getimageQuery, [id]);
    const images = rows2[0];
    if (images) {
        images.map(image => {
            filesize += image.image_size;
        })
    }

    const getvideoQuery = `SELECT * FROM Video WHERE event_id = ?;`;
    const rows3 = await db.promise().query(getvideoQuery, [id]);
    const videos = rows3[0];
    if (videos) {
        videos.map(video => {
            filesize += video.video_size;
        })
    }


    return res.status(200).json(new ApiResponse(200, {event, user,filesize}, "Event fetched successfully",));
});

export { deleteEvent, geteventdetails };
    

