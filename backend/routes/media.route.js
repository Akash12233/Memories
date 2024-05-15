import { addimage, addvideo, getimage, getvideo } from "../controllers/media.controller.js";
import{Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import  { upload } from "../middlewares/multer.middleware.js";

const mediarouter = Router();

mediarouter.route("/addimage/:id").post( verifyJWT,
    upload.fields([
        {
            name: "images",
        }
    ]),
    addimage);

mediarouter.route("/addvideo/:id").post( verifyJWT,
    upload.fields([
        {
            name: "videos",
        }
    ]),
    addvideo);
mediarouter.route("/getimage/:id").get(verifyJWT, getimage);

mediarouter.route("/getvideo/:id").get(verifyJWT, getvideo);

export default mediarouter;