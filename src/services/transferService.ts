import { Transfer } from '../models/transferModel';
import { TransferRepository } from '../repositories/transferRepository';

export class TransferService {
  private transferRepo: TransferRepository;

  constructor(transferRepo: TransferRepository) {
    this.transferRepo = transferRepo;
  }

  async transferAccountsHistory(data: { from: string; to: string; amount: number }) {
    const transfer = new Transfer(data.from, data.to, data.amount, new Date());
    return this.transferRepo.create(transfer);
  }

  async getTransferHistory(accountNumber: string): Promise<Transfer[]> {
    return this.transferRepo.findByAccount(accountNumber);
  }
}
