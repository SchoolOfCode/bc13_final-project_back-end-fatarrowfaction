export function eatenStats(dataArray) {
  const numberOfEaten = dataArray.filter((e) => e.eaten_on).length;
  const numberOfWasted = dataArray.filter((e) => e.binned_on).length;
  const eatenPercentage =
    (numberOfEaten / (numberOfWasted + numberOfEaten)) * 100;
  const wastedPercentage =
    (numberOfWasted / (numberOfEaten + numberOfWasted)) * 100;
  return {
    eatenPercentage: Math.round(eatenPercentage),
    wastedPercentage: Math.round(wastedPercentage),
  };
}
