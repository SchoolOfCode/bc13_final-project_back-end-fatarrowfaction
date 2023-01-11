import express, { Router } from "express";
import { getUserFood, getStorageID, postFood } from "../Models/models.js";
//gets from Pantry screen
export const userFoodRouter = express.Router();
//gets from addItem screen
export const newItemRouter = express.Router();

userFoodRouter.get("/:id", async function (req, res) {
	const foodArray = await getUserFood(req.params.id);
	res.json({ success: true, payload: foodArray });
});

// whenever a user posts a new item, we need to first send a get request to get the container ID and then a post request to put the new food item in there to the container ID
newItemRouter.get("/:id", async function (req, res) {
	const storageID = await getStorageID(req.params.id);
	res.json({ success: true, payload: storageID });
});

newItemRouter.post("/:id", async function (req, res) {
	const addFoodItem = await postFood(req.params.id, req.body);
	res.json({ success: true, payload: addFoodItem });
});
