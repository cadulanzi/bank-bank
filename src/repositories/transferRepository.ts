import { Transfer } from '@models/transferModel';

const transfers: Transfer[] = [];

export class TransferRepository {
  create(transfer: Transfer) {
    transfers.push(transfer);
    return transfer;
  }
  
  findByAccount(accountNumber: string) {
    return transfers.filter(transfer => transfer.from === accountNumber || transfer.to === accountNumber);
  }
}
