import { geteventdetails, deleteEvent } from "../controllers/general.controller.js";
import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const generalrouter = Router();

generalrouter.route("/geteventdetails/:id").get(verifyJWT, geteventdetails);
generalrouter.route("/deleteEvent/:id").delete(verifyJWT,deleteEvent);
export default generalrouter