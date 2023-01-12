import express, { Router } from "express";
import { getUser } from "../Models/user.js";
export const userRouter = express.Router();

userFoodRouter.get("/", async function (req, res) {
  console.log(req.params);
  const backendUserReply = await getUser(req.params.id);
  res.json({ success: true, payload: backendUserReply });
});
