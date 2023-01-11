import express from "express";

// const reviewsRouter = require("./routes/reviews.js");
import { userFoodRouter, newItemRouter } from "./Routes/routes.js";

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());

app.use("/pantry", userFoodRouter);
app.use("/addItem", newItemRouter);

app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
});
