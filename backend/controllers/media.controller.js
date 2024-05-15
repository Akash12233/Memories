import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addimage = asyncHandler(async (req, res) => {
    const event_id = req.params;
    const images = req.files?.images;
    //req.files?.banner[0]?.path;
    
    if (!images) {
        throw new ApiError(400, "Images file is required")
    }

    images.map(image => async () => {
        const imageLocalPath = image.path;
        const image_url = uploadOnCloudinary(imageLocalPath);
        if (!image_url) {
            throw new ApiError(400, "Image file is required")
        }

        const insertQuery = `INSERT INTO Images (imageurl, event_id) VALUES (?, ?);`;
        await db.promise().query(insertQuery, [image_url, event_id]);
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "Images added successfully"));
});

const addvideo = asyncHandler(async (req, res) => {
    const event_id = req.params;
    const videos = req.files?.videos;
    
    if (!videos) {
        throw new ApiError(400, "Images file is required")
    }

    videos.map(video => async () => {
        const videoLocalPath = video.path;
        const video_url = uploadOnCloudinary(videoLocalPath);
        if (!video_url) {
            throw new ApiError(400, "Image file is required")
        }

        const insertQuery = `INSERT INTO Images (videourl, event_id) VALUES (?, ?);`;
        await db.promise().query(insertQuery, [video_url, event_id]);
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "Images added successfully"));
});

const getimage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getimageQuery = `SELECT * FROM Images WHERE event_id = ?;`;
    const rows = await db.promise().query(getimageQuery, [id]);
    const images = rows[0];
    if (!images) {
        throw new ApiError(404, "Images not found");
    }
    return res.status(200).json(new ApiResponse(200, "Images fetched successfully", images));
});

const getvideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getvideoQuery = `SELECT * FROM Video WHERE event_id = ?;`;
    const rows = await db.promise().query(getvideoQuery, [id]);
    const videos = rows[0];
    if (!videos) {
        throw new ApiError(404, "Videos not found");
    }
    return res.status(200).json(new ApiResponse(200, "Videos fetched successfully", videos));
});

export { addimage, addvideo, getimage, getvideo };
    