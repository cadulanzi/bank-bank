import { Account } from '@models/accountModel';

const accounts: Account[] = [];

export class AccountRepository {
  create(account: Account) {
    accounts.push(account);
    return account;
  }

  find(accountNumber: string): Account | undefined {
    return accounts.find(account => account.accountNumber === accountNumber);
  }

  update(account: Account) {
    const index = accounts.findIndex(a => a.accountNumber === account.accountNumber);
    if (index !== -1) {
      accounts[index] = account;
    }
  }
}
