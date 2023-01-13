import express, { Router } from "express";
import { getUser } from "../Models/user.js";
export const userRouter = express.Router();

userRouter.post("/", async function (req, res) {
  console.log("fired userroute before body thing", req.body);
  const backendUserReply = await getUser(req.body.uid);
  res.json({ success: true, payload: backendUserReply });
});
