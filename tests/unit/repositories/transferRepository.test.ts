import { TransferRepository } from '@repositories/transferRepository';
import { Transfer } from '@models/transferModel';

describe('TransferRepository', () => {
  let transferRepository: TransferRepository;

  beforeEach(() => {
    transferRepository = new TransferRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new transfer', () => {
      const transfer = new Transfer('1234', '5678', 100, new Date());

      const result = transferRepository.create(transfer);

      expect(result).toEqual(transfer);
    });
  });

  describe('findByAccount', () => {
    it('should return transfers involving the specified account', () => {
      const transfer1 = new Transfer('1234', '5678', 100, new Date());
      const transfer2 = new Transfer('5678', '1234', 200, new Date());
      const transfer3 = new Transfer('1234', '9012', 300, new Date());
      transferRepository.create(transfer1);
      transferRepository.create(transfer2);
      transferRepository.create(transfer3);

      const result = transferRepository.findByAccount('1234');

      expect(result).toEqual([transfer1, transfer2, transfer3]);
    });

    it('should return an empty array if no transfers involve the specified account', () => {
      const transfer = new Transfer('5678', '9012', 100, new Date());
      transferRepository.create(transfer);

      const result = transferRepository.findByAccount('1234');

      expect(result).toEqual([]);
    });
  });
});

