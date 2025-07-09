import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import adviceRouter from './route/adviceRouter';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

app.use(cors());
app.use(express.json());
app.use('/api/advice', adviceRouter);

app.get('/api/indices', async (req, res) => {
  try {
    // S&P500, Dow Jones, NASDAQのシンボル（Alpha Vantageのsectorデータで取得していく）
    // Alpha Vantageに一括取得APIはないため、各指数の代表的なETFで代替（例: SPY, DIA, QQQ）
    const symbols = ['SPY', 'DIA', 'QQQ'];
    const results = await Promise.all(symbols.map(async (symbol) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const response = await axios.get(url);
      return {
        symbol,
        price: response.data['Global Quote']['05. price'],
        changePercent: response.data['Global Quote']['10. change percent']
      };
    }));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to fetch market data'});
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
