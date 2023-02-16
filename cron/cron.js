import { schedule } from 'node-cron';
import axios from 'axios';
import { getTodaysFood } from '../Models/models.js';

console.log('cron.js is live')

async function getNotification(){
    try{
    console.log('fired');
    const uid = '303Ut9TLrAQjyq5hlJrmlsB66Tl2';
    const todaysFood = await getTodaysFood(uid);
      const data =  JSON.stringify(todaysFood);
     axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${uid}`,
      appId: 6107,
      appToken: 'RscfdJGUHSLru74JJd6STe',
      title: 'Food due to expire today...',
      message: `You have ${data.length} items going off today, better eat em up!`
 });}
 catch(exception){
    console.log(exception)
 }
    }

    schedule('* * * * * ', async() => getNotification(), {
      scheduled: true,
      timezone: "Europe/London"
    });

