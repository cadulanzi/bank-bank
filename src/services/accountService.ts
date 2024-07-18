import { Account } from '@models/accountModel';
import { AccountRepository } from '@repositories/accountRepository';
import { TransferService } from '@services/transferService';
import { HttpError } from '@utils/httpError';

export class AccountService {
  private accountRepo: AccountRepository;
  private transferService: TransferService;
  constructor() {
    this.accountRepo = new AccountRepository();
    this.transferService = new TransferService();
  }

  async createAccount(data: any) {
    const accountExists = this.accountRepo.find(data.account_number);
    if (accountExists) {
      throw new HttpError('Account already exists', 409);
    }
    const account = new Account(data.account_number, 0);
    return this.accountRepo.create(account);
  }

  async getBalance(accountNumber: string) {
    const account = this.accountRepo.find(accountNumber);
    if (!account) {
      throw new HttpError('Account not found', 404);
    }
    return { balance: account.balance };
  }

  async deposit(data: any, accountNumber: string) {
    const account = this.accountRepo.find(accountNumber);
    if (!account) {
      throw new HttpError('Account not found', 404);
    }
    if (data.amount <= 0) {
      throw new HttpError('Invalid deposit amount', 400);
    }
    account.balance += data.amount;
    this.accountRepo.update(account);
    data.from = accountNumber;
    data.to = accountNumber;
    await this.transferService.transferAccountsHistory(data);
    return { message: 'Deposit made successfully' };
  }

  async transfer(data: any) {
    const { from, to, amount } = data;

    if (amount <= 0) {
      throw new HttpError('Bad request', 400);
    }

    const fromAccount = this.accountRepo.find(from);
    const toAccount = this.accountRepo.find(to);

    if (!fromAccount || !toAccount) {
      throw new HttpError('Bad request', 400);
    }

    if (fromAccount.balance < amount) {
      throw new HttpError('Insufficient balance', 409);
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;
    this.accountRepo.update(fromAccount);
    this.accountRepo.update(toAccount);

    await this.transferService.transferAccountsHistory(data);

    return { message: 'Transfer made successfully' };
  }

  async history(accountNumber: string) {
    const account = this.accountRepo.find(accountNumber);
    if (!account) {
      throw new HttpError('Account not found', 404);
    }
    const history = await this.transferService.getTransferHistory(accountNumber);
    if (!history || history.length === 0) {
      throw new HttpError('That account has no history', 404);
    }
    history.sort((a: any, b: any) => b.created_at.getTime() - a.created_at.getTime());
    return {
      balance: account.balance,
      history: history
    };
  }
}
