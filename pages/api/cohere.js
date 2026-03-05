// Next.js API route to proxy requests to Cohere

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Cohere API key not set in environment variables' });
  }

  const { prompt, max_tokens = 300, temperature = 0.7 } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Use Chat API instead of deprecated Generate API
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        preamble: "You are a helpful educational AI tutor. Answer questions clearly, provide explanations, and help students learn. Keep responses concise but informative.",
        max_tokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cohere API error:', errorData);
      return res.status(response.status).json({ 
        error: 'API request failed', 
        details: errorData.message || errorData 
      });
    }

    const data = await response.json();
    if (data.text) {
      res.status(200).json({ text: data.text.trim() });
    } else {
      console.error('Unexpected API response:', data);
      res.status(500).json({ error: 'No response from Cohere API', details: data });
    }
  } catch (error) {
    console.error('Error calling Cohere API:', error);
    res.status(500).json({ error: 'Error connecting to Cohere API', details: error.message });
  }
}
