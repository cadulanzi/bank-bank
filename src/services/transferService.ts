import { Transfer } from '@models/transferModel';
import { TransferRepository } from '@repositories/transferRepository';

export class TransferService {
  private transferRepo: TransferRepository;

  constructor() {
    this.transferRepo = new TransferRepository();
  }

  async transferAccountsHistory(data: any) {
    const transfer = new Transfer(data.from, data.to, data.amount, new Date());
    return this.transferRepo.create(transfer);
  }

  async getTransferHistory(accountNumber: string) {
    return this.transferRepo.findByAccount(accountNumber);
  }
}
