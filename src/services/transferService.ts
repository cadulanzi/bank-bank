import { Transfer } from '@models/transferModel';
import { TransferRepository } from '@repositories/transferRepository';

const transferRepo = new TransferRepository();

export class TransferService {
  async transferAccountsHistory(data: any) {
    const transfer = new Transfer(data.from, data.to, data.amount, new Date());
    return transferRepo.create(transfer);
  }

  async getTransferHistory(accountNumber: string) {
    return transferRepo.findByAccount(accountNumber);
  }
}
