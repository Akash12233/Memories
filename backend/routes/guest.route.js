import { addguest, getguest, addguestArray } from "../controllers/guest.controller.js";
import{Router} from "express";

const guestrouter = Router();

guestrouter.route("/addguest/:id").post(addguest);
guestrouter.route("/getguest/:id").get(getguest);
guestrouter.route("/addguestArray/:id").post(addguestArray);

export default guestrouter;