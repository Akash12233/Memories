import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addimage = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const images = req.files;

    if (!images) {
        throw new ApiError(400, "Images file is required")
    }
    await Promise.all(images.map(async (image) => {
        const size = image?.size;
        const imageLocalPath = image.path;
        console.log(imageLocalPath);
        const image_url = await uploadOnCloudinary(imageLocalPath);
        if (!image_url) {
            throw new ApiError(400, "Image file is required");
        }
        const insertQuery = `INSERT INTO Images (imageurl, image_size, event_id) VALUES (?, ?, ?);`;
        await db.promise().query(insertQuery, [image_url.url,size,  id]);
    }));
    

    return res
        .status(201)
        .json(new ApiResponse(201, "Images added successfully"));
});

const addvideo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const videos = req.files;
    
    if (!videos) {
        throw new ApiError(400, "Images file is required")
    }

    await Promise.all(videos.map(video => async () => {
        const videoLocalPath = video.path;
        const size = video.size;
        const video_url = uploadOnCloudinary(videoLocalPath);
        if (!video_url) {
            throw new ApiError(400, "Video file is required")
        }

        const insertQuery = `INSERT INTO Images (videourl,video_size,  event_id) VALUES (?, ?, ?);`;
        await db.promise().query(insertQuery, [video_url.url,size,  id]);
    }));

    return res
        .status(201)
        .json(new ApiResponse(201, "Video added successfully"));
});

const getimage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getimageQuery = `SELECT * FROM Images WHERE event_id = ?;`;
    const rows = await db.promise().query(getimageQuery, [id]);
    const images = rows[0];
    if (!images) {
        throw new ApiError(404, "Images not found");
    }
    return res.status(200).json(new ApiResponse(200,  images,"Images fetched successfully"));
});

const getvideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getvideoQuery = `SELECT * FROM Video WHERE event_id = ?;`;
    const rows = await db.promise().query(getvideoQuery, [id]);
    const videos = rows[0];
    if (!videos) {
        throw new ApiError(404, "Videos not found");
    }
    return res.status(200).json(new ApiResponse(200 , videos , "Videos fetched successfully"));
});

export { addimage, addvideo, getimage, getvideo };
    