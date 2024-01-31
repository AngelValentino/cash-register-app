const cashLm = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const resultLm = document.getElementById('change-due');

const price = 3.26;
let cidStatus = '';
let currUnitReturnObj = {};

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

const cid = [
  ["PENNY", 1.01], 
  ["NICKEL", 2.05], 
  ["DIME", 3.1], 
  ["QUARTER", 4.25], 
  ["ONE", 90], 
  ["FIVE", 55], 
  ["TEN", 20], 
  ["TWENTY", 60], 
  ["ONE HUNDRED", 100]];


function displayStatus() {
  resultLm.innerHTML = `<p>Status: ${cidStatus}</p>`;
}

function displayChangeDue() {
  for (key in currUnitReturnObj) {
    resultLm.innerHTML += `<p>${key}: $${currUnitReturnObj[key]}</p>`
  }
}

function validateInput(cashCents) {
  if (!cashCents) {
    alert('Please insert a valid number');
    return 1;
  
  } else if (cashCents < price * 100) {
    alert('Customer does not have enough money to purchase the item');
    return 2;
  
  } else if (cashCents === price * 100) {
    resultLm.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return 3;
  }
}

const getTotalCidCents = () => cid.reduce((acc, row) => acc + row[1] * 100, 0);

function removeFromCid(currUnitReturnObj) {
  cid.forEach((row) => {
    for (key in currUnitReturnObj) {
      if (key === row[0]) {
        row[1] = Number((row[1] - currUnitReturnObj[key]).toFixed(2));
      }
    }
  });
}

function getChangeDue(changeDueCts) {
  for (let i = cid.length - 1; i >= 0; i--) {
    const currUnitName = cid[i][0];
    const currUnitTotalCts = Math.ceil(cid[i][1] * 100);
    const currUnitValueCts = currencyUnitCents[currUnitName];
    let currUnitAmmount = currUnitTotalCts / currUnitValueCts;
    let currUnitReturn = 0;

    while (changeDueCts >= currUnitValueCts && currUnitAmmount > 0) {
      changeDueCts -= currUnitValueCts;
      currUnitAmmount--;
      currUnitReturn++;
    }

    if (currUnitReturn > 0) {
      currUnitReturnObj[currUnitName] = (currUnitReturn * currUnitValueCts) / 100;
    } 
  }

  if (changeDueCts) {
    cidStatus = 'INSUFFICIENT_FUNDS';
    displayStatus();
    return;
  }

  displayStatus();
  displayChangeDue();
  removeFromCid(currUnitReturnObj);
}


function checkChangeFromCid() {
  const cashCents = cashLm.value * 100;
  const totalCidCts = getTotalCidCents();
  let changeDueCts = cashCents - price * 100;
  
  currUnitReturnObj = {};
  resultLm.innerHTML = '';
  
  if (validateInput(cashCents)) {
    return;
  }

  if (totalCidCts < changeDueCts) {
    cidStatus = 'INSUFFICIENT_FUNDS';
    displayStatus();
    return;
  
  } else if (totalCidCts === changeDueCts) {
    cidStatus = 'CLOSED';
    getChangeDue(changeDueCts);
    return;
  
  } else {
    cidStatus = 'OPEN';
    getChangeDue(changeDueCts);
  }
}


purchaseBtn.addEventListener('click', checkChangeFromCid);

