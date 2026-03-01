import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';

const MAX_INPUT_LENGTH = 500;

export default function AiTutor() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI tutor. I can help explain concepts, provide hints, or answer questions about your lessons. What would you like to know?", sender: 'ai' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (trimmed.length > MAX_INPUT_LENGTH) {
      setError(`Message is too long. Please keep it under ${MAX_INPUT_LENGTH} characters.`);
      return;
    }
    setError("");
    setMessages(prev => [...prev, { text: trimmed, sender: 'user' }]);
    setInput("");
    setLoading(true);
    try {
      const aiResponse = await getCohereResponse(trimmed);
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch {
      setMessages(prev => [...prev, { text: 'Sorry, there was an error connecting to the AI service. Please try again.', sender: 'ai' }]);
    }
    setLoading(false);
    scrollToBottom();
  };

  async function getCohereResponse(userMessage) {
    const response = await fetch('/api/cohere', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'command', prompt: userMessage, max_tokens: 100, temperature: 0.7 }),
    });
    if (!response.ok) {
      let message = 'AI service error.';
      try {
        const err = await response.json();
        if (err.error) message = err.error;
      } catch { /* ignore parse error */ }
      throw new Error(message);
    }
    const result = await response.json();
    if (result.text) return result.text.trim();
    if (result.generations?.[0]?.text) return result.generations[0].text.trim();
    return 'No response from AI.';
  }

  return (
    <>
      <Head>
        <title>AI Tutor - Chatbot</title>
        <style>{`
          body, .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .header {
            text-align: center;
            margin-top: 2rem;
            margin-bottom: 1.5rem;
          }
          .header h1 {
            font-size: 2.2rem;
            color: #fff;
            margin-bottom: 0.3rem;
            text-shadow: 0 2px 8px #764ba2aa;
          }
          .header p {
            color: #e0e0e0;
            font-size: 1.1rem;
          }
          .nav-tabs {
            display: flex;
            justify-content: center;
            gap: 1.2rem;
            margin-bottom: 2rem;
          }
          .nav-tab {
            background: #fff;
            color: #764ba2;
            border-radius: 8px;
            padding: 0.7rem 1.3rem;
            font-weight: 500;
            text-decoration: none;
            box-shadow: 0 2px 8px #764ba244;
            transition: background 0.2s, color 0.2s;
          }
          .nav-tab.active, .nav-tab:hover {
            background: linear-gradient(90deg,#667eea 60%,#764ba2 100%);
            color: #fff;
          }
          .ai-tutor {
            max-width: 750px;
            margin: 2.5rem auto;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 8px 32px #764ba244;
            padding: 2.5rem 2rem 2rem 2rem;
            position: relative;
          }
          .ai-tutor h2 {
            text-align: center;
            font-size: 2rem;
            font-weight: 700;
            color: #764ba2;
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
          }
          .chat-container {
            background: #ede7f6;
            border-radius: 16px;
            padding: 1.2rem;
            min-height: 220px;
            max-height: 340px;
            overflow-y: auto;
            margin-bottom: 1.2rem;
            box-shadow: 0 2px 12px #764ba244;
            display: flex;
            flex-direction: column;
          }
          .chat-message {
            margin: 0.7rem 0;
            padding: 0.9rem 1.2rem;
            border-radius: 18px;
            max-width: 80%;
            word-break: break-word;
            font-size: 1.08rem;
            box-shadow: 0 2px 12px #764ba244;
            position: relative;
            transition: box-shadow 0.2s;
          }
          .ai-message {
            background: linear-gradient(90deg,#fffde7 80%,#e1bee7 100%);
            color: #333;
            align-self: flex-start;
            border: 1.5px solid #ba68c8;
            box-shadow: 0 0 8px #ba68c844;
          }
          .user-message {
            background: linear-gradient(90deg,#bbdefb 80%,#667eea 100%);
            color: #764ba2;
            align-self: flex-end;
            margin-left: auto;
            border: 1.5px solid #764ba2;
            box-shadow: 0 0 8px #764ba244;
          }
          .chat-input {
            flex: 1;
            padding: 0.8rem 1.1rem;
            border-radius: 12px;
            border: 1.5px solid #ba68c8;
            font-size: 1.08rem;
            margin-right: 0.7rem;
            outline: none;
            transition: border 0.2s;
            background: #fff;
            box-shadow: 0 1px 4px #ba68c844;
          }
          .chat-input:focus {
            border: 2px solid #764ba2;
            box-shadow: 0 2px 8px #764ba244;
          }
          .send-btn {
            background: linear-gradient(90deg,#667eea 60%,#764ba2 100%);
            color: #fff;
            border: none;
            border-radius: 50px;
            padding: 0.8rem 2.2rem;
            font-size: 1.08rem;
            cursor: pointer;
            box-shadow: 0 4px 16px #764ba244;
            transition: background 0.2s, box-shadow 0.2s;
            font-weight: 600;
            position: relative;
            z-index: 2;
          }
          .send-btn:disabled {
            background: #b0bec5;
            cursor: not-allowed;
            box-shadow: none;
          }
          .loading-dots::after {
            content: '...';
            animation: blink 1.2s infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </Head>
      <div className="container">
        <div className="header">
          <h1><i className="fas fa-graduation-cap"></i> AI Tutor</h1>
          <p>Your personalized learning companion</p>
        </div>
        <div className="nav-tabs">
          <Link className="nav-tab" href="/"><i className="fas fa-home"></i> Dashboard</Link>
          <Link className="nav-tab" href="/subjects"><i className="fas fa-book"></i> Subjects</Link>
          <Link className="nav-tab" href="/lesson"><i className="fas fa-chalkboard-teacher"></i> Current Lesson</Link>
          <Link className="nav-tab" href="/progress"><i className="fas fa-chart-line"></i> Progress</Link>
          <Link className="nav-tab active" href="/ai-tutor"><i className="fas fa-robot"></i> AI Tutor</Link>
        </div>
        <div id="ai-tutor" className="tab-content active">
          <div className="ai-tutor">
            <h2><i className="fas fa-robot"></i> AI Tutor Chat</h2>
            <p>Ask me anything about your studies!</p>
            <div className="chat-container" id="chatContainer" ref={chatContainerRef} style={{display: 'flex', flexDirection: 'column'}}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.sender}-message`}>
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="chat-message ai-message">
                  AI Tutor is thinking<span className="loading-dots"></span>
                </div>
              )}
            </div>
            {error && (
              <p role="alert" style={{ color: '#c62828', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{error}</p>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                className="chat-input"
                id="chatInput"
                placeholder="Ask a question..."
                value={input}
                maxLength={MAX_INPUT_LENGTH}
                onChange={e => { setInput(e.target.value); if (error) setError(""); }}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                disabled={loading}
                aria-label="Chat input"
              />
              <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: input.length > MAX_INPUT_LENGTH * 0.9 ? '#c62828' : '#999', marginTop: '0.3rem' }}>
              {input.length}/{MAX_INPUT_LENGTH}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
