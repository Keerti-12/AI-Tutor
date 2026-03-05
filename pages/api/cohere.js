// Next.js API route to proxy requests to Cohere
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Cohere API key not set in environment variables' });
  }

  const { prompt, model = 'command', max_tokens = 100, temperature = 0.7 } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        max_tokens,
        temperature,
      }),
    });
    const data = await response.json();
    if (data.generations && data.generations[0] && data.generations[0].text) {
      res.status(200).json({ text: data.generations[0].text.trim() });
    } else {
      res.status(500).json({ error: 'No response from Cohere API', details: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to Cohere API', details: error.message });
  }
}
