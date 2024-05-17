import { addevent, getEventbyid, getEventbyuser } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const eventrouter = Router();

eventrouter.route("/addevent").post(verifyJWT,
    upload.fields([
        {
            name: "banner",
            maxCount: 1
        }
    ]),
    addevent);

eventrouter.route("/geteventbyid/:id").get(verifyJWT,getEventbyid);
eventrouter.route("/geteventbyuser").get(verifyJWT, getEventbyuser);
export default eventrouter;