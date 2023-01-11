import express, { Router } from "express";
import { getUserFood, getContainerID } from "../Models/models.js";
export const userFoodRouter = express.Router();
export const newItemRouter = express.Router();

userFoodRouter.get("/:id", async function (req, res) {
	const foodArray = await getUserFood(req.params.id);
	res.json({ success: true, payload: foodArray });
});

newItemRouter.get("/:id", async function (req, res) {
	const containerID = await getContainerID(req.params.id);
	res.json({ success: true, payload: containerID });
});
