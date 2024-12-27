import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', todoRoutes);

app.get('/', (req, res):any => res.send('To-Do Backend is Running'));

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
