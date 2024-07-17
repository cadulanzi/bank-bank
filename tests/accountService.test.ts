import { AccountService } from '../src/services/accountService';
import { AccountRepository } from '../src/repositories/accountRepository';
import { HttpError } from '../src/utils/httpError';

jest.mock('../src/repositories/accountRepository');

const accountRepoMock = AccountRepository as jest.MockedClass<typeof AccountRepository>;

describe('AccountService', () => {
  let accountService: AccountService;

  beforeEach(() => {
    accountService = new AccountService();
  });

  it('should create a new account', async () => {
    accountRepoMock.prototype.find.mockReturnValueOnce(null);
    accountRepoMock.prototype.create.mockReturnValueOnce({ account_number: '123456', balance: 0 });

    const account = await accountService.createAccount({ account_number: '123456' });

    expect(account).toEqual({ account_number: '123456', balance: 0 });
  });

  it('should not create a new account if account already exists', async () => {
    accountRepoMock.prototype.find.mockReturnValueOnce({ account_number: '123456', balance: 100 });

    await expect(accountService.createAccount({ account_number: '123456' }))
      .rejects
      .toThrow(HttpError);
  });

  it('should return the account balance', async () => {
    accountRepoMock.prototype.find.mockReturnValueOnce({ account_number: '123456', balance: 100 });

    const balance = await accountService.getBalance('123456');

    expect(balance).toEqual({ balance: 100 });
  });

  it('should throw an error if account not found', async () => {
    accountRepoMock.prototype.find.mockReturnValueOnce(null);

    await expect(accountService.getBalance('123456'))
      .rejects
      .toThrow(HttpError);
  });
});
