export function eatenStats(dataArray) {
    const arrayOfEaten = dataArray.filter((e) => e.eaten_on);
    const arrayOfWasted = dataArray.filter((e) => e.binned_on);
    const eatenPercentage =
        (arrayOfEaten.length / (arrayOfWasted.length + arrayOfEaten.length)) * 100;
    const wastedPercentage =
        (arrayOfWasted.length / (arrayOfEaten.length + arrayOfWasted.length)) * 100;
  
    // for loop to iterate through the arrayofwasted to find how much money has been wasted
    let wastedCost = 0;
    for (let fooditem of arrayOfWasted) {
        wastedCost = wastedCost + fooditem.price;
    }
  
    let spentWell = 0;
    for (let fooditem of arrayOfEaten){
      spentWell = spentWell + fooditem.price
    }
  
    return {
        eatenPercentage: Math.round(eatenPercentage),
        wastedPercentage: Math.round(wastedPercentage),
        moneyWasted: wastedCost,
        spentWell: spentWell,
        totalNumberEaten: arrayOfEaten.length,
        totalNumberWasted: arrayOfWasted.lengnth,
        totalNumberItems: arrayOfEaten.lengnth + arrayOfWasted.lengnth,
    };
  }