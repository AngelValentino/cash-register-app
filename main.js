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




const currencyUnitCentsArr = (Object.entries(currencyUnitCents));
console.log(currencyUnitCentsArr);

// VALIDATION

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

    console.log(totalInDrawer)

  const currQantObj = {};
  let closestChangeName = '';
  

  while (moneyToReturn > 0) {
    const closestChange = Object.values(currencyUnitCents)
      .reverse()
      .find((number) => number <= moneyToReturn);

    for (const key in currencyUnitCents) {
      if (currencyUnitCents[key] === closestChange) {
        closestChangeName = key;   
      }
    }

    if (totalInDrawer < moneyToReturn) {
      cidStatus = 'INSUFFICIENT_FUNDS';
      console.log(1)
      return;
    }

    if (totalInDrawer === changeDue) {
      cidStatus = 'CLOSED';
      // moneyToReturn -= closestChange; DOESN'T TAKE INTO ACCOUNT THE CASH BALANCE
      console.log(closestChange)
      cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] =- closestChange; 
    }

    // if value of cid[item](value) >= closestChange

    if (cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] >= closestChange) {
      moneyToReturn -= closestChange;
      cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] =- closestChange;
      console.log(closestChange)

    // else if value of cid[item](value) < closestChange
   
    } else if (cashInDrawerCents.find((row) => row[0] === closestChangeName)[1] < closestChange) {
      // GET THE SMALLESET CID(VALUE) AFTER IT AND CHECK IF IS >= closestChange
      // GET AS MANY smaller CID(VALUE) AS NEEDED TO === closestChange
      // REMOVE FROM moneyToReturn AND cashInDrawer
      // IF NO SMALLEST CID(VALUE) IS FOUND RETURN => STATUS = INSUFFICIENT_FUNDS
    }


    moneyToReturn -= closestChange;


    /*while (moneyToReturn > 0) {
      if (cid[specificItem](value) >= closestChange) {
        moneyToReturn -= closestChange;
        cid[specificItem] = cid[specificItem] - closestChange;
        STATUS: OPEN;
      
      } else if (cid[specificItem](value) < closestChange) {
        TRY TO GET THE SMALLEST cid(VALUE) AFTER {
          if (item) {
            STATUS: OPEN;
            moneyToReturn -= cid(VALUE);
            cid[specificItem] = cid[specificItem] - cid(VALUE);
          } else {
             STATUS: INSUFFICIENT_FUNDS
             return;
          }
        }
      } 
    }

    */

    for (const key in currencyUnitCents) {
      if (currencyUnitCents[key] === closestChange) {
        currQantObj[key]
          ? currQantObj[key]++
          : currQantObj[key] = 1;            
      }
    }
    
  }

  console.log(currQantObj);
  console.log(cashInDrawerCents);
}

    



purchaseBtn.addEventListener('click', returnChange);
