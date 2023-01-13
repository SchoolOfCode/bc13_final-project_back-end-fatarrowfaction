import express, { Router } from "express";
import {
  getUserFood,
  getStorageID,
  postFood,
  getUserProfile,
  postUsersID,
} from "../Models/models.js";
//gets from Pantry screen
export const userFoodRouter = express.Router();
//gets from addItem screen
export const newItemRouter = express.Router();
//gets from profile Screen
export const userProfileRouter = express.Router();
//updates food to the bin
export const binFoodRouter = express.Router();
//updates food to eaten
export const eatFoodRouter = express.Router();
//updates food to donated
export const donateFoodRouter = express.Router();

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

userProfileRouter.get("/:id", async function (req, res) {
  const userInfo = await getUserProfile(req.params.id);
  res.json({ success: true, payload: userInfo });
});

userProfileRouter.post("/", async function (req, res) {
  const userID = await postUsersID(req.body.uid);
  res.json({ success: true, payload: userID });
});

binFoodRouter.patch("/:id", async function (req, res) {
  const foodArray = await binFood(req.params.id);
  res.json({ success: true, payload: foodArray });
});

eatFoodRouter.patch("/:id", async function (req, res) {
  const foodArray = await eatFood(req.params.id);
  res.json({ success: true, payload: foodArray });
});

donateFoodRouter.patch("/:id", async function (req, res) {
  const foodArray = await donateFood(req.params.id);
  res.json({ success: true, payload: foodArray });
});
