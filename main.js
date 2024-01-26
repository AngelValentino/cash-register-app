const priceCents = 326;
const cashLm = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const resultLm = document.getElementById('change-due');


const currencyUnitCents = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  THEN: 1000,
  TWENTY: 2000,
  'ONE HUNDRED': 10000
}

const cashInDrawerCents = [
  ['PENNY', 101],
  ['NICKEL', 205],
  ['DIME', 310],
  ['QUARTER', 425],
  ['ONE', 9000],
  ['FIVE', 5500],
  ['THEN', 2000],
  ['TWENTY', 6000],
  ['ONE HUNDRED', 10000]
];




const currencyUnitCentsArr = (Object.entries(currencyUnitCents));
console.log(currencyUnitCentsArr)

function returnChange() {
  const cashCents = cashLm.value * 100;
  
  if (!cashCents) {
    alert('Please insert a valid number')
    return;
  
  } else if (cashCents < priceCents) {
    alert('Customer does not have enough money to purchase the item');
    return;
  
  } else if (cashCents === priceCents) {
    resultLm.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }





  let moneyToReturn = cashCents - priceCents;
  const newCurrObj = {};

  while (moneyToReturn > 0) {
    const closestFromGoal = currencyUnitCentsArr
    .map((row) => row[1])
    .reverse()
    .find((number) => number <= moneyToReturn)

    moneyToReturn -= closestFromGoal;

    for (const currencyVal in currencyUnitCents) {
      if (currencyUnitCents[currencyVal] === closestFromGoal) {
        if (newCurrObj[currencyVal]) {
          newCurrObj[currencyVal]++;
        } else {
          newCurrObj[currencyVal] = 1;
        }
      }
    }
  }

  const keysArr = Object.keys(currencyUnitCents);
  const newCurrObjVal = {};

  for (let key in newCurrObj) {
    newCurrObjVal[key] = currencyUnitCents[key] * newCurrObj[key];
  }

  const cashToReturnMatrix = Object.entries(newCurrObjVal);
  console.log(newCurrObj);
  console.log(cashToReturnMatrix);

  cashToReturnMatrix.forEach((row) => {
    const currencyName = row[0];
    const currencyVal = row[1];

  });

   // MATCH CURRENT NAME AND ARRAY NAME
   // SUBTRACT CURRENT VALUE FROM ARRAY VALUE
   // RETURN THE ARRAY

}




purchaseBtn.addEventListener('click', returnChange);
