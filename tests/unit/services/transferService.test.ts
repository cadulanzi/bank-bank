import { TransferService } from '@services/transferService';
import { TransferRepository } from '@repositories/transferRepository';
import { Transfer } from '@models/transferModel';

describe('TransferService', () => {
  let transferService: TransferService;
  let transferRepoMock: TransferRepository;

  beforeEach(() => {
    transferRepoMock = {
      create: jest.fn(),
      findByAccount: jest.fn()
    } as unknown as TransferRepository;

    transferService = new TransferService(transferRepoMock);
  });

  describe('transferAccountsHistory', () => {
    it('should create a new transfer record', async () => {
      const transferData = { from: '1234', to: '5678', amount: 100 };

      await transferService.transferAccountsHistory(transferData);

      expect(transferRepoMock.create).toHaveBeenCalledWith(expect.any(Transfer));
    });
  });

  describe('getTransferHistory', () => {
    it('should return the transfer history for the specified account', async () => {
      const accountNumber = '1234';
      const transfers = [
        new Transfer('1234', '5678', 100, new Date()),
        new Transfer('5678', '1234', 200, new Date())
      ];
      transferRepoMock.findByAccount.mockReturnValueOnce(transfers);

      const result = await transferService.getTransferHistory(accountNumber);

      expect(result).toEqual(transfers);
    });
  });
});

