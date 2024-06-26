import { addsubevent, getsubEventbyid } from "../controllers/subevent.controller.js";
import { Router } from 'express';

const subeventrouter = Router();

subeventrouter.route("/addsubevent/:id").post(addsubevent);
subeventrouter.route("/getsubEventbyid/:id").get(getsubEventbyid);

export default subeventrouter;
