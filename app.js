import express from "express";
import cors from "cors";

import {
  userFoodRouter,
  newItemRouter,
  userProfileRouter,
  binFoodRouter,
  eatFoodRouter,
  donateFoodRouter,
} from "./Routes/routes.js";
import { userRouter } from "./Routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pantry", userFoodRouter);
app.use("/userVerify", userRouter);
app.use("/addItem", newItemRouter);
app.use("/userProfile", userProfileRouter);
app.use("/binFood", binFoodRouter);
app.use("/eatFood", eatFoodRouter);
app.use("/donateFood", donateFoodRouter);

export default app;
