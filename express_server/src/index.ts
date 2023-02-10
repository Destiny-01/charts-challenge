import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import csv from 'csvtojson';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/data', async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    const filePath = path.join(__dirname, '../../cpu_hours.csv');

    const jsonArray = await csv().fromFile(filePath);

    return res.status(200).json({
      message: 'success',
      data: jsonArray.filter((arrElement) => arrElement.year == year),
    });
  } catch (err: any) {
    return res.status(500).json({ message: 'error', data: err.message });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
