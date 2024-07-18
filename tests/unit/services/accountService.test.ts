import { AccountService } from '../../../src/services/accountService';
import { AccountRepository } from '../../../src/repositories/accountRepository';
import { TransferService } from '../../../src/services/transferService';
import { Account } from '../../../src/models/accountModel';
import { HttpError } from '../../../src/utils/httpError';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepoMock: jest.Mocked<AccountRepository>;
  let transferServiceMock: jest.Mocked<TransferService>;

  beforeEach(() => {
    accountRepoMock = {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn()
    } as jest.Mocked<AccountRepository>;

    transferServiceMock = {
      transferAccountsHistory: jest.fn(),
      getTransferHistory: jest.fn().mockResolvedValue([]),
      transferRepo: {} as any
    } as unknown as jest.Mocked<TransferService>;

    accountService = new AccountService();
  });

  describe('createAccount', () => {
    it('should create a new account if it does not exist', async () => {
      const accountData = { account_number: '1234', balance: 100 };
      accountRepoMock.find.mockReturnValueOnce(undefined);

      await accountService.createAccount(accountData);

      expect(accountRepoMock.create).toHaveBeenCalledWith(expect.objectContaining(accountData));
    });

    it('should throw an error if the account already exists', async () => {
      const accountData = { account_number: '1234' };
      accountRepoMock.find.mockReturnValueOnce(new Account('1234', 0));

      await expect(accountService.createAccount(accountData)).rejects.toThrow(HttpError);
    });
  });

  describe('getBalance', () => {
    it('should return the account balance if the account exists', async () => {
      const accountNumber = '1234';
      const account = new Account(accountNumber);
      accountRepoMock.find.mockReturnValueOnce(account);

      const result = await accountService.getBalance(accountNumber);

      expect(result).toEqual({ balance: 0 });
    });

    it('should throw an error if the account does not exist', async () => {
      const accountNumber = '1234';
      accountRepoMock.find.mockReturnValueOnce(undefined);

      await expect(accountService.getBalance(accountNumber)).rejects.toThrow(HttpError);
    });
  });

  describe('deposit', () => {
    it('should deposit the specified amount and update transfer history', async () => {
      const accountNumber = '1234';
      const depositData = { amount: 100 };
      const account = new Account(accountNumber, 0);
      accountRepoMock.find.mockReturnValueOnce(account);

      await accountService.deposit(depositData, accountNumber);

      expect(accountRepoMock.update).toHaveBeenCalledWith(expect.any(Account));
      expect(transferServiceMock.transferAccountsHistory).toHaveBeenCalledWith({
        from: accountNumber,
        to: accountNumber,
        amount: depositData.amount
      });
    });

    it('should throw an error if the account does not exist', async () => {
      const accountNumber = '1234';
      const depositData = { amount: 100 };
      accountRepoMock.find.mockReturnValueOnce(undefined);

      await expect(accountService.deposit(depositData, accountNumber)).rejects.toThrow(HttpError);
    });

    it('should throw an error if the deposit amount is invalid', async () => {
      const accountNumber = '1234';
      const depositData = { amount: -100 };
      const account = new Account(accountNumber, 0);
      accountRepoMock.find.mockReturnValueOnce(account);

      await expect(accountService.deposit(depositData, accountNumber)).rejects.toThrow(HttpError);
    });
  });

  describe('transfer', () => {
    it('should transfer funds between accounts and update transfer history', async () => {
      const transferData = {
        from: '1234',
        to: '5678',  
        amount: 100
      };
      const fromAccount = new Account(transferData.from, 200);
      const toAccount = new Account(transferData.to, 0);
      accountRepoMock.find
        .mockReturnValueOnce(fromAccount)
        .mockReturnValueOnce(toAccount);

      await accountService.transfer(transferData);

      expect(accountRepoMock.update).toHaveBeenCalledTimes(2);
      expect(transferServiceMock.transferAccountsHistory).toHaveBeenCalledWith(transferData);
    });

    it('should throw an error if the transfer amount is invalid', async () => {
      const transferData = {
        from: '1234',
        to: '5678',
        amount: -100
      };

      await expect(accountService.transfer(transferData)).rejects.toThrow(HttpError);
    });

    it('should throw an error if the source or destination account does not exist', async () => {
      const transferData = {
        from: '1234',
        to: '5678',
        amount: 100
      };
      accountRepoMock.find
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(new Account(transferData.to, 0));

      await expect(accountService.transfer(transferData)).rejects.toThrow(HttpError);
    });
  });
});
