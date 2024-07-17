import express from 'express';
import accountRoutes from '@routes/accountRoutes';
import { errorHandler } from '@middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/v1/accounts', accountRoutes);
app.use(errorHandler);

export default app;
