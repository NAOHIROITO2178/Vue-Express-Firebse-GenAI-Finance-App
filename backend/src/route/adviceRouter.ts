import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const adviceRouter = express.Router();

// Gemini インスタンス生成
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

adviceRouter.post('/', async (req, res) => {
  const { category, userQuestion, marketData } = req.body;

  const systemPrompt = `
あなたはアンクル・サムです。米国の象徴として、威厳とユーモアを持って投資アドバイスを行います。
ユーザーからの質問カテゴリは「${category}」で、現在の市場状況は以下の通りです：
${marketData}

この情報を踏まえて、個別の投資推奨を避けつつ、ユニークかつ有益な助言をお願いします。
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        text: `${systemPrompt}\n\nユーザーの質問: ${userQuestion}`
      }
    ]);

    const response = await result.response;
    const text = await response.text();

    res.json({ reply: text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to get advice from Uncle Sam' });
  }
});

export default adviceRouter;
