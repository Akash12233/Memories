import dotenv from "dotenv";
import db from "./db/index.js";
import {app} from './app.js';
import createEventQuery from "./modals/event.modal.js";
import createUserQuery from "./modals/user.modal.js";
import createsubEventQuery from "./modals/subevent.modal.js";
import createGuestQuery from "./modals/guest.modal.js";
import createimageQuery from "./modals/image.modal.js";
import createVideoQuery from "./modals/video.modal.js";

dotenv.config({
    path: './.env.sample'
})


const connectdb = async() => {
    db.connect((err) => {
        if (err) {
            console.log("MySql connection error", err);
            process.exit(1);
        } else {
            console.log("Database connected");
        }

        createUserQuery();
        createEventQuery();
        createsubEventQuery();
        createGuestQuery();
        createimageQuery();
        createVideoQuery();
    });
}



connectdb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mysql Database connection failed !!! ", err);
})