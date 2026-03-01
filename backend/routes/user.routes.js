import express from "express";
import isAuth from "../middlewares/auth.middleware.js";
import { getOtherUsers, getUser } from "../controllers/user.controller.js";
import { editProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile", isAuth, getUser);
userRouter.put("/profile", isAuth, upload.single("image"), editProfile);
userRouter.get("/others", isAuth, getOtherUsers);

export default userRouter;
