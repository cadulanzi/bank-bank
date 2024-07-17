import { AccountRepository } from '@repositories/accountRepository';
import { Account } from '@models/accountModel';

describe('AccountRepository', () => {
  let accountRepository: AccountRepository;

  beforeEach(() => {
    accountRepository = new AccountRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new account', () => {
      const account = new Account('1234', 100);

      const result = accountRepository.create(account);

      expect(result).toEqual(account);
    });
  });

  describe('find', () => {
    it('should return the account if it exists', () => {
      const account = new Account('1234', 100);
      accountRepository.create(account);

      const result = accountRepository.find('1234');

      expect(result).toEqual(account);
    });

    it('should return undefined if the account does not exist', () => {
      const result = accountRepository.find('1234');

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update the account if it exists', () => {
      const account = new Account('1234', 100);
      accountRepository.create(account);
      account.balance = 200;

      accountRepository.update(account);

      const updatedAccount = accountRepository.find('1234');
      expect(updatedAccount?.balance).toBe(200);
    });

    it('should not update if the account does not exist', () => {
      const account = new Account('1234', 100);

      accountRepository.update(account);

      expect(accountRepository.find('1234')).toBeUndefined();
    });
  });
});

