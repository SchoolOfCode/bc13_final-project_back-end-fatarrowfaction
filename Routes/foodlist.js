import express, { Router } from "express";
import { getUserFood } from "../Models/foodlist.js";
export const userFoodRouter = express.Router();

userFoodRouter.get("/:id", async function (req, res) {
    console.log(req.params)
	const foodArray = await getUserFood(req.params.id);
	res.json({ success: true, payload: foodArray });
});
