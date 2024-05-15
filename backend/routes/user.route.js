import { loginUser,logout, adduser,changeCurrentpassword, updateAccountDetails, refreshAccessToken , getcurrentuser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { Router } from "express";


const userRouter = Router()
userRouter.route("/register").post(
    adduser
    )

    userRouter.route("/login").post(loginUser)

//secured routes
userRouter.route("/logout").post(verifyJWT,  logout)
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/change-password").post(verifyJWT, changeCurrentpassword)
userRouter.route("/current-user").get(verifyJWT, getcurrentuser)
userRouter.route("/update-account").post(verifyJWT, upload.fields([
    {
      name:'avatar',
      maxCount: 1
    },
]), updateAccountDetails)


export default userRouter;
