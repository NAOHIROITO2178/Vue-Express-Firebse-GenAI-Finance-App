import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors()); // Vueと通信するためCORSを有効に
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'TypescriptベースのVueとExpressの世界へようこそ! 今後はFirebase + GeminiAPI + VantageAPIを実装予定！' });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
