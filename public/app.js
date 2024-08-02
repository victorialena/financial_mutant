var min_mo_debt = 0;
var total_debt = 0;

var assets = null;

var income = 0;
var expenses = 0;

var debts = [];


class Debt {
  constructor(nickname, interest_rate, balance, minimum_monthly) {
    this.interest_rate = interest_rate;
    this.balance = balance;
    this.minimum_monthly = minimum_monthly;
    this.id = nickname;
  }
}
  
class Assets {
  constructor(checking, saving, retirement, investments) {
    this.checking = checking;
    this.saving = saving;
    this.retirement = retirement;
    this.investments = investments;
  }

  get sum() {
    return this.checking + this.saving + this.retirement + this.investments;
  }

  get cash() {
    return this.checking + this.saving;
  }
}