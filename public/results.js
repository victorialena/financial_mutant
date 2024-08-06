import { overlayOn } from "./collapsible.js"

const CUTTOFF_INTEREST = 5.0;
const TIMELINE_ELEMENT = "timeline-container";
var total_time = 0;


function calcEmergencyFund(months=6) {
  return expenses*months;
}


function createTODO(title, description) {
  let template = document.querySelector("#template");
  var element = template.cloneNode(true);

  element.className = TIMELINE_ELEMENT;
  element.id = TIMELINE_ELEMENT;

  element.querySelector(".timeline-badge").textContent = title;
  element.querySelector(".timeline-description").textContent = description;

  let timeline = document.body.querySelector(".timeline");
  timeline.append(element);
}


function clearTimeline() {
  console.log("clearing timeline");
  let ellist =  document.getElementsByClassName(TIMELINE_ELEMENT);
  while (ellist.length > 0) {
    ellist[0].remove();
  }
}


function evalResults(event) {
  event.preventDefault();

  clearTimeline();
  total_time = 0;

  var cash = assets.cash;
  var remainder = income - expenses;

  // 0. You cannot pay off your debt.
  if (remainder < 0) {
    var err_msg = `You don't make enough to cover your expenses. We suggest \
                  1) asking for a raise, \
                  2) get another job for additional income, or \
                  3) find a higher paying occupation.\
                  [This is based on the assumption that you provided me with your minimum monthly budget]`;
    console.log("popup: You don't make enough to cover your expenses. [...]");
    overlayOn(err_msg);
    return;
  }

  // 1. Calculate 1 mo emergency fund.
  var emergency_fund = calcEmergencyFund(1);
  if (cash < emergency_fund) {
    const months = Math.ceil((emergency_fund-cash)/remainder);
    total_time = total_time + months;
    createTODO(`Emergency Fund`, `[${months} mo.] Save 1 mo. worth of expenses, i.e., save an additional $${emergency_fund-cash} \
                                  and put $${emergency_fund} in your savings account.`);
    cash = 0;
  } else {
    cash = cash - emergency_fund;
  }

  // 2. Sort debts from worst to least interest rate, and using savings to pay off as much as possible!
  debts.sort(function(first, second) { return second.interest_rate - first.interest_rate; });
  var d = 0;
  var current_balance = (0 < debts.length) ? debts[0].balance : 0;

  for (d=0; (d<debts.length) && (cash > 0); d++) {
    let debt = debts[d];
    if ((debt.interest_rate < CUTTOFF_INTEREST) || (cash <= 0)) {
      break;
    }

    current_balance = debt.balance;
    if (cash > current_balance) {
      createTODO(`Pay off Debt`, `Use your savings to pay off ${debt.id} in full!`);
      cash = cash - current_balance;
      remainder = remainder + debt.minimum_monthly;
    } else {
      createTODO(`Pay off Debt`, `Use your savings to pay $${cash} off ${debt.id}.`);
      current_balance = current_balance - cash;
      cash = 0;
      break;
    }
  }

  // 3. Distribute monthly remainder post budget to pay off bad debts are fast as possible.
  while (d < debts.length) {
    let debt = debts[d];
    if (debt.interest_rate < CUTTOFF_INTEREST) {
      break;
    }

    const months = Math.ceil(current_balance/remainder);
    total_time = total_time + months;
    current_balance = current_balance - months*remainder;

    createTODO(`Pay off Debt`, `[${months} mo.] Pay off ${debt.id} by contributing $${remainder.toFixed(2)} each month.`);
    remainder = remainder + debt.minimum_monthly;

    if (d+1 < debts.length) {
      current_balance = current_balance + debts[d+1].balance;
    } 
    d = d + 1;
  }

  // 3. b. Clarify that the remaning open debts are below the set threshold and can be
  // paid off w/ minimum monthly's.
  if (d < debts.length) {
    createTODO(`Done w/ BAD debt!`, `All your remeining debts are below ${CUTTOFF_INTEREST}% interest.\
               We recommend just paying the minimum monthly until they are done.`);
  }

  // 4. Stock up Emergency Fund
  emergency_fund = calcEmergencyFund(6);
  if (cash < emergency_fund) {
    const months = Math.ceil((emergency_fund-calcEmergencyFund(1))/remainder);
    createTODO(`Emergency Fund`, `[${months} mo.] Save 6 mo. worth of expenses (i.e., $${emergency_fund})`);
  } else {
    cash = cash - emergency_fund;
    createTODO(`Emergency Fund`, `Move 6 mo. worth of expenses (i.e., $${emergency_fund}) into your savings \
                                  account, the rest remains in checking.`);
  }

  var err_msg = `Using this method you will be BAD debt free in ${total_time} months.`
  overlayOn(err_msg);
}

document.querySelector("#evalResults").addEventListener("click", evalResults);