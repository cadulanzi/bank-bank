import 'jest-extended';  // Importação para utilizar jest-extended
import { TransferRepository } from '../../../src/repositories/transferRepository';
import { Transfer } from '../../../src/models/transferModel';

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

      // Usando comparação padrão do Jest para verificar se os arrays são iguais
      expect(result).toEqual(expect.arrayContaining([transfer1, transfer3]));
      expect(result).not.toEqual(expect.arrayContaining([transfer2]));
    });

    it('should return an empty array if no transfers involve the specified account', () => {
      const transfer = new Transfer('5678', '9012', 100, new Date());
      transferRepository.create(transfer);

      const result = transferRepository.findByAccount('1234');

      expect(result).toEqual([]);
    });
  });
});
