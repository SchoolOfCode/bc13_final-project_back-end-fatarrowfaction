//sql format : 2023-01-12 15:28:40 +0000
// //date obj console-log : 2023-01-15T00:00:00.000Z

//the functions here are written using dummy data and will be used to calculate the ratios of food eat to food wasted and ouputted in percentges

// const numberOfEaten = expiredData.filter((e) => e.eaten_on).length;
// const numberOfWasted = expiredData.filter((e) => e.binned_on).length;

// const eatenPercentage =
//   (numberOfEaten / (numberOfWasted + numberOfEaten)) * 100;
// const wastedPercentage =
//   (numberOfWasted / (numberOfEaten + numberOfWasted)) * 100;






export default function expiryDateConverter(annoyingDate) {
  const goodDate = 
    (annoyingDate.getMonth() + 1).toString().slice(-2) +
    `/${annoyingDate.getDate()}/
    ${annoyingDate.getFullYear()} 23:59:00`;
  return goodDate;
}

console.log(expiryDateConverter("2023-01-25T12:04:00.938Z"))