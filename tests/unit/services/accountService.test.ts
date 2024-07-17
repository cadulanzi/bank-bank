import { AccountService } from '@services/accountService';
import { AccountRepository } from '@repositories/accountRepository';
import { TransferService } from '@services/transferService';
import { HttpError } from '@utils/httpError';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepoMock: AccountRepository;
  let transferServiceMock: TransferService;

  beforeEach(() => {
    accountRepoMock = {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn()
    } as unknown as AccountRepository;

    transferServiceMock = {
      transferAccountsHistory: jest.fn(),
      getTransferHistory: jest.fn()
    } as unknown as TransferService;

    accountService = new AccountService(accountRepoMock, transferServiceMock);
  });

  describe('createAccount', () => {
    it('should create a new account if it does not exist', async () => {
      const accountData = { account_number: '1234', balance: 100 };
      accountRepoMock.find.mockReturnValueOnce(undefined);

      await accountService.createAccount(accountData);

      expect(accountRepoMock.create).toHaveBeenCalledWith(expect.any(Account));
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
      const account = new Account(accountNumber, 100);
      accountRepoMock.find.mockReturnValueOnce(account);

      const result = await accountService.getBalance(accountNumber);

      expect(result).toEqual({ balance: 100 });
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

  // Similar test cases for transfer and history methods
});

