import express, { Router } from "express";
import {
  getUserFood,
  getStorageID,
  postFood,
  getUserProfile,
  patchEatenDate,
  patchBinnedDate,
  getAllUserWastedFood,
  getAllUserEatenFood,
  getLastWeeksWastedFood,
  getAllEatenAndWasted,
  getLastWeeksEatenFood,
  getWeekEatenAndWasted
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
//getsAllWastedFood
export const allWastedFoodRouter = express.Router();
//gets all eaten food
export const allEatenFoodRouter = express.Router();
//get last weeks eaten food 
export const lastWeeksEatenFoodRouter = express.Router();

// get all eaten and wasted
export const eatenAndWastedRouter = express.Router();

//get last weeks wasted food
export const lastWeeksWastedFoodRouter = express.Router();

//gets weeks eaten and wasted
export const weeksEatenWastedRouter = express.Router();

weeksEatenWastedRouter.get('/:id',async function (req, res){
  const allEatenFood = await getWeekEatenAndWasted(req.params.id);
  res.json({ success: true, payload: allEatenFood });} ))

lastWeeksWastedFoodRouter.get("/:id",async function (req, res){
  const allEatenFood = await getLastWeeksWastedFood(req.params.id);
  res.json({ success: true, payload: allEatenFood });} )

lastWeeksEatenFoodRouter.get("/:id",async function (req, res){
  const allEatenFood = await getLastWeeksEatenFood(req.params.id);
  res.json({ success: true, payload: allEatenFood });} )

allEatenFoodRouter.get("/:id", async function (req, res){
  const allEatenFood = await getAllUserEatenFood(req.params.id);
  res.json({ success: true, payload: allEatenFood });
})

allWastedFoodRouter.get("/:id", async function (req, res) {
  const allWastedFoodArray = await getAllUserWastedFood(req.params.id);
  res.json({ success: true, payload: allWastedFoodArray });
})

eatenAndWastedRouter.get('/:id', async function (req, res){
  const eatenAndWastedFoodArray = await getAllEatenAndWasted(req.params.id);
  res.json({success: true, payload: eatenAndWastedFoodArray})
})

userFoodRouter.get("/:id", async function (req, res) {
  const foodArray = await getUserFood(req.params.id);
  res.json({ success: true, payload: foodArray });
});

userFoodRouter.patch("/id", async function (req, res) {
  const editedFood = await patchFoodDate(
    req.body.eaten_on,
    req.body.binned_on,
    req.body.donated_on,
    req.params.id
  );
  res.json({ success: true, payload: editedFood });
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
  const foodItem = await patchBinnedDate(req.params.id);
  res.json({ success: true, payload: foodItem });
});

eatFoodRouter.patch("/:id", async function (req, res) {
  const foodItem = await patchEatenDate(req.params.id);
  res.json({ success: true, payload: foodItem });
});

donateFoodRouter.patch("/:id", async function (req, res) {
  const foodItem = await patchFoodDonatedDate(req.params.id);
  res.json({ success: true, payload: foodItem });
});
