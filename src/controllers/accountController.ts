import { Request, Response } from 'express';
import { AccountService } from '@services/accountService';
import { errorHandler } from '@middlewares/errorHandler';
import { AccountRepository } from '@src/repositories/accountRepository';
import { TransferService } from '@src/services/transferService';
import { TransferRepository } from '@src/repositories/transferRepository';

const accountRepository = new AccountRepository();
const transferRepository = new TransferRepository();
const transferService = new TransferService(transferRepository);
const accountService = new AccountService(accountRepository, transferService);

export class AccountController {
  async createAccount(req: Request, res: Response) {
    try {
      const account = await accountService.createAccount(req.body);
      res.status(201).json(account);
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const balance = await accountService.getBalance(req.params.accountNumber);
      res.status(200).json(balance);
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }

  async deposit(req: Request, res: Response) {
    try {
      const depositResult = await accountService.deposit(req.body, req.params.accountNumber);
      res.status(200).json(depositResult);
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }

  async transfer(req: Request, res: Response) {
    try {
      const transferResult = await accountService.transfer(req.body);
      res.status(200).json(transferResult);
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }

  async history(req: Request, res: Response) {
    try {
      const extractResult = await accountService.history(req.params.accountNumber);
      res.status(200).json(extractResult);
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }
}
