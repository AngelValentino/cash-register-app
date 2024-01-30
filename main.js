const priceCents = 326;
const cashLm = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const resultLm = document.getElementById('change-due');

let cidStatus = '';

const currencyUnitCents = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  'ONE HUNDRED': 10000
};

const cashInDrawerCents = [
  ['PENNY', 101],
  ['NICKEL', 205],
  ['DIME', 310],
  ['QUARTER', 425],
  ['ONE', 9000],
  ['FIVE', 5500],
  ['TEN', 2000],
  ['TWENTY', 6000],
  ['ONE HUNDRED', 10000]
];


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
  const changeDue = moneyToReturn;
  const totalInDrawer = cashInDrawerCents
    .map((row) => row[1])
    .reduce((acc, num) => acc + num, 0);

  const currQantObj = {};
  let closestChangeName = '';

  

  
  while (moneyToReturn > 0) {
    // get closest change
    const closestChange = Object.values(currencyUnitCents)
      .reverse()
      .find((number) => number <= moneyToReturn);

    // get closest change name  
    for (const key in currencyUnitCents) {
      if (currencyUnitCents[key] === closestChange) {
        closestChangeName = key;   
      }
    }

    // there isn't enough money in the drawer to return the changeDue
    if (totalInDrawer < moneyToReturn) {
      cidStatus = 'INSUFFICIENT_FUNDS';
      console.log(1)
      return;
    }

    // all the money left in the drawer is === to the changeDue
    if (totalInDrawer === changeDue) {
      cidStatus = 'CLOSED';
      getClosestChange();
      return;
    }

     // there is enough money to return the changeDue
/*     if (totalInDrawer > changeDue) {
      cidStatus = 'OPEN';
      getClosestChange();
      return;
    } */

    if (cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] >= closestChange) {
      moneyToReturn -= closestChange;
      cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] = cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] - closestChange;

        // crate the object with the return values

      for (const key in currencyUnitCents) {
        if (currencyUnitCents[key] === closestChange) {
          currQantObj[key]
            ? currQantObj[key]++
            : currQantObj[key] = 1;            
        }
      }

      // else if there isn't enough change in the drawer
       // get the next smaller value in the drawer and return that until the current closestChange is complete

    } else if (cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] < closestChange) {
      console.log('else')
      let indexRowClosestCurr = cashInDrawerCents.findIndex((row) => row[0] === closestChangeName) - 1;
      let closestCurrVal = cashInDrawerCents[indexRowClosestCurr][1];
      const closestCurrName = cashInDrawerCents[indexRowClosestCurr][0];
      let smallerCurrVal = 0;

      while (smallerCurrVal !== closestChange) {
        
        // create the return values

        for (const key in currencyUnitCents) {
          if (key === closestCurrName) {
            currQantObj[key]
              ? currQantObj[key]++
              : currQantObj[key] = 1;            
          }
        }
        
        smallerCurrVal += currencyUnitCents[closestCurrName];
        moneyToReturn -= currencyUnitCents[closestCurrName];
        cashInDrawerCents[indexRowClosestCurr][1] = cashInDrawerCents[indexRowClosestCurr][1] - currencyUnitCents[closestCurrName];

        if (closestCurrVal === 0 && smallerCurrVal !== closestChange && indexRowClosestCurr > 0) {
          indexRowClosestCurr--;
        }
      }
    }

    console.log(currQantObj);
  }

  console.log(currQantObj);
  console.log(cashInDrawerCents);

  resultLm.innerText = '';
  let resultSum = '';

  for (key in currQantObj) {
    resultSum += `${key} = ${currQantObj[key]}
    `;  }

  resultLm.innerText = resultSum;
}

// create a getClosestChange function() to be reused in the === case

function getClosestChange() {
  if (cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] >= closestChange) {
    moneyToReturn -= closestChange;
    cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] = cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] - closestChange;

    for (const key in currencyUnitCents) {
      if (currencyUnitCents[key] === closestChange) {
        currQantObj[key]
          ? currQantObj[key]++
          : currQantObj[key] = 1;            
      }
    }

  } else if (cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] < closestChange) {
    console.log('else')
    let indexRowClosestCurr = cashInDrawerCents.findIndex((row) => row[0] === closestChangeName) - 1;
    let closestCurrVal = cashInDrawerCents[indexRowClosestCurr][1];
    const closestCurrName = cashInDrawerCents[indexRowClosestCurr][0];
    let smallerCurrVal = 0;

    while (smallerCurrVal !== closestChange) {

      for (const key in currencyUnitCents) {
        if (key === closestCurrName) {
          currQantObj[key]
            ? currQantObj[key]++
            : currQantObj[key] = 1;            
        }
      }
      
      smallerCurrVal += currencyUnitCents[closestCurrName];
      moneyToReturn -= currencyUnitCents[closestCurrName];
      cashInDrawerCents[indexRowClosestCurr][1] = cashInDrawerCents[indexRowClosestCurr][1] - currencyUnitCents[closestCurrName];

      if (closestCurrVal === 0 && smallerCurrVal !== closestChange && indexRowClosestCurr > 0) {
        indexRowClosestCurr--;
      }
    }
  }  
}







purchaseBtn.addEventListener('click', returnChange);
