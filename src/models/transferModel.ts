import { ITransfer } from '@interfaces/ITransfer';

export class Transfer implements ITransfer {
  constructor(
    public from: string, 
    public to: string, 
    public amount: number,
    public created_at: Date
  ) {}
}
