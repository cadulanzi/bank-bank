import { Account } from '@models/accountModel';


export class AccountRepository {
  private accounts: Account[] = [];
  create(account: Account) {
    this.accounts.push(account);
    return account;
  }

  find(accountNumber: string): Account | undefined {
    return this.accounts.find(account => account.accountNumber === accountNumber);
  }

  update(account: Account) {
    const index = this.accounts.findIndex(a => a.accountNumber === account.accountNumber);
    if (index !== -1) {
      this.accounts[index] = account;
    }
  }
}
