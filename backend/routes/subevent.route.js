import { addsubevent, getsubEventbyid } from "../controllers/subevent.controller.js";
import { Router } from 'express';
import {verifyJWT} from "../middlewares/auth.middleware.js";

const subeventrouter = Router();

subeventrouter.route("/addsubevent/:id").post(verifyJWT,addsubevent);
subeventrouter.route("/getsubEventbyid/:id").get(verifyJWT, getsubEventbyid);

export default subeventrouter;
