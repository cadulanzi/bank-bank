import { Router } from 'express';
import { AccountController } from '@controllers/accountController';

const router = Router();
const accountController = new AccountController();

// Accounts
router.post('/', accountController.createAccount);
router.get('/:accountNumber/balance', accountController.getBalance);
router.post('/:accountNumber/deposit', accountController.deposit);

// Transfer
router.post('/transfer', accountController.transfer);
router.get('/:accountNumber/history', accountController.history);

export default router;
