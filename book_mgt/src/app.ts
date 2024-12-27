import  express, { Response } from 'express';
import bookRoutes from './routes/index';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));


app.use('/api', bookRoutes);


app.get('/', (req:any, res:Response) => {
    res.send('Welcome to the Book API');
});

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
