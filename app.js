import express from "express";
import cors from "cors";

// const reviewsRouter = require("./routes/reviews.js");
import { userFoodRouter } from "./Routes/foodlist.js";
import { userRouter } from "./Routes/user.js";

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.use("/pantry", userFoodRouter);
app.use("/userVerify", userRouter);

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
