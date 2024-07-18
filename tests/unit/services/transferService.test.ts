import { TransferService } from '../../../src/services/transferService';
import { TransferRepository } from '../../../src/repositories/transferRepository';
import { Transfer } from '../../../src/models/transferModel';

jest.mock('@repositories/transferRepository');

describe('TransferService', () => {
  let transferService: TransferService;
  let transferRepoMock: jest.Mocked<TransferRepository>;

  beforeEach(() => {
    transferRepoMock = new TransferRepository() as jest.Mocked<TransferRepository>;
    transferRepoMock.create = jest.fn();
    transferRepoMock.findByAccount = jest.fn();

    transferService = new TransferService();
  });

  describe('getTransferHistory', () => {
    it('should return the transfer history for the specified account', async () => {
      const accountNumber = '1234';
      const transfers = [
        new Transfer('1234', '5678', 100, new Date()),
        new Transfer('5678', '1234', 200, new Date())
      ];
      transferRepoMock.findByAccount.mockResolvedValueOnce(transfers as never);

      const result = await transferService.getTransferHistory(accountNumber);

      expect(result).toEqual(transfers);
    });
  });
});
