export function eatenStats(dataArray) {
    const arrayOfEaten = dataArray.filter((e) => e.eaten_on);
    const arrayOfWasted = dataArray.filter((e) => e.binned_on);


    const eatenPercentage =
        (arrayOfEaten.length / (arrayOfWasted.length + arrayOfEaten.length)) * 100;
    const wastedPercentage =
        (arrayOfWasted.length / (arrayOfEaten.length + arrayOfWasted.length)) * 100;
      

        let totalSpentEaten = 0;
        arrayOfEaten.forEach((elem) => (totalSpentEaten += +elem.price));
        let totalSpentBinned = 0;
        arrayOfWasted.forEach((elem) => (totalSpentBinned += +elem.price));


        return {
            eatenPercentage: Math.round(eatenPercentage),
            wastedPercentage: Math.round(wastedPercentage),
            moneyWasted: totalSpentBinned,
            spentWell: totalSpentEaten,
            totalNumberEaten: arrayOfEaten.length,
            totalNumberWasted: arrayOfWasted.length,
            totalNumberItems: arrayOfEaten.length + arrayOfWasted.length,
        };
    }
    




    
  