import {Router}from "express";
import { loginUser, registerUser ,logoutUser,refreshAccessToken} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js";

const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser)//middleware to verify user is logged in or not and also next is written in the verifyJWT middleware to call the logoutUser controller function if user is logged in
router.route("/refresh-token").post(refreshAccessToken)


export default router