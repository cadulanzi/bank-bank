import { IAccount } from '@interfaces/IAccount';

export class Account implements IAccount {
  constructor(
    public accountNumber: string, 
    public balance: number
  ) {}
}
