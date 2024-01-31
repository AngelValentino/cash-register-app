const cashLm = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const resultLm = document.getElementById('change-due');

const price = 1.87;
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


const cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const getTotalCidCents = () => cid.reduce((acc, row) => acc + row[1] * 100, 0);

function validateInput(cashCents) {
  if (!cashCents) {
    alert('Please insert a valid number');
    return;
  
  } else if (cashCents < price * 100) {
    alert('Customer does not have enough money to purchase the item');
    return;
  
  } else if (cashCents === price * 100) {
    resultLm.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }
}

function getChangeDue() {
  const cashCents = cashLm.value * 100;
  const totalInCidCents = getTotalCidCents();
  const changeDueCents = cashCents - price * 100;
  
  validateInput(cashCents);

  if (totalInCidCents < changeDueCents) {
    cidStatus = 'INSUFFICIENT_FUNDS';
    return;
  }
}


purchaseBtn.addEventListener('click', getChangeDue);