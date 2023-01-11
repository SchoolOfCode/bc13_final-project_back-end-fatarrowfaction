import express from "express";

// const reviewsRouter = require("./routes/reviews.js");
import {
	userFoodRouter,
	newItemRouter,
	userProfileRouter,
} from "./Routes/routes.js";

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());

app.use("/pantry", userFoodRouter);
app.use("/addItem", newItemRouter);
app.use("/userProfile", userProfileRouter);

app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
});
