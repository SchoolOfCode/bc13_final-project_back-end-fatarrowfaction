export function eatenStats(dataArray) {
  const numberOfEaten = dataArray.filter((e) => e.eaten_on).length;
  const arrayOfWasted = dataArray.filter((e) => e.binned_on);
  const eatenPercentage =
      (numberOfEaten / (arrayOfWasted.length + numberOfEaten)) * 100;
  const wastedPercentage =
      (arrayOfWasted.length / (numberOfEaten + arrayOfWasted.length)) * 100;

  // for loop to iterate through the arrayofwasted to find how much money has been wasted
  let wastedCost = 0;
  for (let fooditem of arrayOfWasted) {
      wastedCost = wastedCost + fooditem.price;
  }

  return {
      eatenPercentage: Math.round(eatenPercentage),
      wastedPercentage: Math.round(wastedPercentage),
      moneyWasted: wastedCost,
  };
}