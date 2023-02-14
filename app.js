import express from "express";
import cors from "cors";

import {
  userFoodRouter,
  newItemRouter,
  userProfileRouter,
  binFoodRouter,
  eatFoodRouter,
  donateFoodRouter,
  allWastedFoodRouter,
  allEatenFoodRouter,
  eatenAndWastedRouter,
  lastWeeksEatenFoodRouter,
  lastWeeksWastedFoodRouter,
  weeksEatenWastedRouter,
  userDetailsRouter,
} from "./Routes/routes.js";
import { userRouter } from "./Routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/weekEatenWasted", weeksEatenWastedRouter);
app.use("/allEatenAndWasted", eatenAndWastedRouter);

app.use("/lastWeekWasted", lastWeeksWastedFoodRouter);
app.use("/lastWeekEaten", lastWeeksEatenFoodRouter);
app.use("/allEatenFood", allEatenFoodRouter);
app.use("/allWastedFood", allWastedFoodRouter);
app.use("/pantry", userFoodRouter);
app.use("/userVerify", userRouter);
app.use("/addItem", newItemRouter);
app.use("/userProfile", userProfileRouter);
app.use("/binFood", binFoodRouter);
app.use("/eatFood", eatFoodRouter);
app.use("/donateFood", donateFoodRouter);
app.use("/userDetailsRouter", userDetailsRouter);

export default app;
