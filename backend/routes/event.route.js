import { addevent, getEventbyid, getEventbyuser, updateEvent } from "../controllers/event.controller.js";
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

eventrouter.route("/geteventbyid/:id").get(getEventbyid);
eventrouter.route("/geteventbyuser").get(verifyJWT, getEventbyuser);
eventrouter.route('/updateevent/:id').post(verifyJWT,
updateEvent
)
export default eventrouter;