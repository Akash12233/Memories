import { addimage, addvideo, getimage, getvideo } from "../controllers/media.controller.js";
import{Router} from "express";

import  { upload } from "../middlewares/multer.middleware.js";

const mediarouter = Router();

mediarouter.route("/addimage/:id").post( 
    upload.any('images'),
    addimage);

mediarouter.route("/addvideo/:id").post(
    upload.any(
         "videos",
),
    addvideo);
mediarouter.route("/getimage/:id").get(getimage);

mediarouter.route("/getvideo/:id").get(getvideo);

export default mediarouter;