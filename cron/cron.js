import { schedule } from "node-cron";
import axios from "axios";
import { getTodaysFood } from "../Models/models.js";
import { getAllUsers } from "../Models/models.js";

async function forEachFunction(uid){
try {
    console.log('trying this')
  const todaysFood = await getTodaysFood(uid);
  console.log('todays food :', todaysFood)
//   const data = JSON.stringify(todaysFood);
//   console.log('data : ', data)
  if (todaysFood.length > 0) {
    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${uid}`,
      appId: 6107,
      appToken: "RscfdJGUHSLru74JJd6STe",
      title: "Food due to expire today...",
      message: `You have ${todaysFood.length} items going off today, better eat em up!`,
    });
  }
} catch (exception) {
  console.log(exception);
}
}
async function getNotification() {
    console.log('cronnybobs')
    const userArray = await getAllUsers()
    userArray.forEach((obj)=>{
        console.log(obj.uid)
        forEachFunction(obj.uid)
    })
}


schedule("0 9 * * * ", async () => getNotification(), {
  scheduled: true,
  timezone: "Europe/London",
});
