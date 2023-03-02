import express from 'express';
import { calculateBMI } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/exercises', (req, res) => {
  
});

app.get('/bmi', (req, res) => {
  let { height, weight} = req.body;
  if (!height || !weight) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBMI(Number(height), Number(weight));

  return res.json({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

