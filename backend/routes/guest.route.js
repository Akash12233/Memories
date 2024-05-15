import { addguest, getguest } from "../controllers/guest.controller.js";

import{Router} from "express";

const guestrouter = Router();

guestrouter.route("/addguest").post(addguest);
guestrouter.route("/getguest/:id").get(getguest);

export default guestrouter;