import { Request, Response } from 'express';
import { AccountController } from '../../../src/controllers/accountController';
import { AccountService } from '../../../src/services/accountService';

describe('AccountController', () => {
  let accountServiceMock: jest.Mocked<AccountService>;
  let accountController: AccountController;

  beforeEach(() => {
    accountServiceMock = {
      createAccount: jest.fn(),
      getBalance: jest.fn(),
      deposit: jest.fn(),
      transfer: jest.fn(),
      history: jest.fn()
    } as unknown as jest.Mocked<AccountService>;

    accountController = new AccountController();
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });
});
