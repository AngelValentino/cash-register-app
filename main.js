const resultLm = document.getElementById('change-due');
const cashLm = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

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


function displatCid() {
  const totalLm = document.getElementById('total');
  const cidLm = document.getElementById('cash-in-drawer');

  totalLm.innerText = `$${price}`;
  cidLm.innerHTML = cid
    .map((row) => `
      <p>
        <span class="unit">${row[0][0] + row[0].slice(1).toLowerCase()}</span> 
        <span class="equal-sign">=</span> 
        <span class="unit-value">$${row[1]}</span>
      </p>
    `)
    .join('');
}  


function displayStatus() {
  resultLm.innerHTML = `<p class="cid-status">Status: ${cidStatus}</p>`;
  resultLm.classList.add('remove-background-color');
}

function displayChangeDue() {
  for (const key in currUnitReturnObj) {
    resultLm.innerHTML += `<p>${key}: $${currUnitReturnObj[key]}</p>
    `
  }

  resultLm.classList.add('remove-background-color');

  /*`<div class="unit-change" id="change-receipt-container">
      <p>${key}:</p> <p>$${currUnitReturnObj[key]}</p>
      </div>
    `*/ 

  /*const changeDue = (cashLm.value - price).toFixed(2);
  resultLm.innerHTML += `<div class="total-change"><p>Total:</p><p>$${changeDue}</p></div>`*/
}

function validateInput(cashCts) {
  if (!cashCts) {
    alert('Please insert a valid number');
    return 1;
  
  } else if (cashCts < price * 100) {
    alert('Customer does not have enough money to purchase the item');
    return 2;
  
  } else if (cashCts === price * 100) {
    resultLm.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return 3;
  }
}

const getTotalCidCents = () => cid.reduce((acc, row) => acc + row[1] * 100, 0);

function removeFromCid(currUnitReturnObj) {
  cid.forEach((row) => {
    for (const key in currUnitReturnObj) {
      if (key === row[0]) {
        row[1] = Number((row[1] - currUnitReturnObj[key]).toFixed(2));
      }
    }
    displatCid();
  });
}

function getChangeDue(changeDueCts) {
  for (let i = cid.length - 1; i >= 0; i--) {
    const currUnitName = cid[i][0];
    const currUnitTotalCts = Math.round(cid[i][1] * 100);
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
  const cashCts = cashLm.value * 100;
  const totalCidCts = getTotalCidCents();
  let changeDueCts = cashCts - price * 100;
  
  currUnitReturnObj = {};
  resultLm.innerHTML = '';
  
  if (validateInput(cashCts)) {
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


displatCid();

purchaseBtn.addEventListener('click', checkChangeFromCid);

cashLm.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkChangeFromCid();
  }
})