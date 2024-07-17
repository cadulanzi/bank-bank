import { Request, Response } from 'express';
import { AccountController } from '../../../src/controllers/accountController';
import { AccountService } from '../../../src/services/accountService';

describe('AccountController', () => {
  let accountController: AccountController;
  let accountServiceMock: AccountService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    accountServiceMock = {
      createAccount: jest.fn(),
      getBalance: jest.fn(),
      deposit: jest.fn(),
      transfer: jest.fn(),
      history: jest.fn()
    } as unknown as AccountService;

    accountController = new AccountController(accountServiceMock);

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createAccount', () => {
    it('should create a new account and return a 201 status code', async () => {
      const accountData = { account_number: '1234' };
      mockRequest.body = accountData;
      accountServiceMock.createAccount.mockResolvedValueOnce({ account_number: '1234', balance: 0 });

      await accountController.createAccount(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ account_number: '1234', balance: 0 });
    });

    it('should handle errors and pass them to the error handler', async () => {
      const accountData = { account_number: '1234' };
      mockRequest.body = accountData;
      const errorMessage = 'Account already exists';
      accountServiceMock.createAccount.mockRejectedValueOnce(new Error(errorMessage));

      await accountController.createAccount(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getBalance', () => {
    it('should retrieve the account balance and return a 200 status code', async () => {
      const accountNumber = '1234';
      mockRequest.params = { accountNumber };
      accountServiceMock.getBalance.mockResolvedValueOnce({ balance: 100 });

      await accountController.getBalance(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ balance: 100 });
    });

    it('should handle errors and pass them to the error handler', async () => {
      const accountNumber = '1234';
      mockRequest.params = { accountNumber };
      const errorMessage = 'Account not found';
      accountServiceMock.getBalance.mockRejectedValueOnce(new Error(errorMessage));

      await accountController.getBalance(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Similar test cases for deposit, transfer, and history methods
});

