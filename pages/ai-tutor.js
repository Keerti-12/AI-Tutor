import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { modernStyles } from '../components/ModernLayout';

export default function AiTutor() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI tutor. I can help explain concepts, provide hints, or answer questions about your lessons. What would you like to know?", sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', timestamp: new Date() }]);
    setInput("");
    setLoading(true);
    setTyping(true);
    
    try {
      const aiResponse = await getCohereResponse(userMessage);
      setTyping(false);
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai', timestamp: new Date() }]);
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, { text: 'Sorry, there was an error connecting to the AI service.', sender: 'ai', timestamp: new Date() }]);
    }
    setLoading(false);
  };

  async function getCohereResponse(userMessage) {
    const endpoint = '/api/cohere';
    const data = {
      prompt: userMessage,
      max_tokens: 300,
      temperature: 0.7
    };
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.details || 'API error');
      }
      const result = await response.json();
      if (result.text) return result.text.trim();
      if (result.generations && result.generations[0] && result.generations[0].text) return result.generations[0].text.trim();
      return 'No response from AI.';
    } catch (error) {
      console.error('Fetch error:', error);
      return `Error: ${error.message || 'Unable to connect to AI service. Please check your API key and try again.'}`;
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const quickSuggestions = [
    "Explain neural networks",
    "What is machine learning?",
    "Help with Python syntax",
    "Tips for studying effectively"
  ];

  return (
    <>
      <style jsx global>{modernStyles}</style>
      <style jsx>{`
        .chat-message {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .typing-indicator {
          display: flex;
          gap: 0.3rem;
          padding: 1rem;
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #667eea;
          animation: typing 1.4s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
        }
      `}</style>
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">🎓 EduPro</div>
          </div>
          <nav className="nav-menu">
            <Link href="/" className="nav-item">
              <span className="nav-item-icon">📊</span>
              Dashboard
            </Link>
            <Link href="/subjects" className="nav-item">
              <span className="nav-item-icon">📚</span>
              My Subjects
            </Link>
            <Link href="/lesson" className="nav-item">
              <span className="nav-item-icon">📖</span>
              Current Lesson
            </Link>
            <Link href="/progress" className="nav-item">
              <span className="nav-item-icon">📈</span>
              Progress & Analytics
            </Link>
            <Link href="/ai-tutor" className="nav-item active">
              <span className="nav-item-icon">🤖</span>
              AI Tutor Chat
            </Link>
          </nav>
        </aside>

        <main className="main-content" style={{ padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '100%', margin: '0 auto', height: 'calc(100vh - 32px)', display: 'flex', flexDirection: 'column' }}>
            <div className="card-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h2 className="card-title" style={{ fontSize: '1.25rem', margin: 0 }}>🤖 AI Tutor Chat</h2>
              </div>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#48bb78', animation: 'pulse 2s ease-in-out infinite' }}></span>
                Online
              </span>
            </div>

            <div 
              ref={chatContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                background: '#f7fafc',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {messages.map((msg, idx) => (
                <div key={idx} className="chat-message" style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}>
                  <div style={{
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#1a202c',
                    padding: '0.875rem 1rem',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                  }}>
                    {msg.sender === 'ai' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1rem' }}>🤖</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667eea' }}>AI Tutor</span>
                      </div>
                    )}
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{msg.text}</div>
                    <div style={{
                      fontSize: '0.65rem',
                      marginTop: '0.4rem',
                      opacity: 0.7,
                      textAlign: 'right'
                    }}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {typing && (
                <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    background: 'white',
                    padding: '0.875rem 1rem',
                    borderRadius: '18px 18px 18px 4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🤖</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#667eea' }}>AI Tutor</span>
                    </div>
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div style={{ marginBottom: '0.75rem', padding: '0 1.5rem', background: 'white', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(suggestion)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: '#4a5568',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f7fafc';
                        e.target.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#e2e8f0';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', padding: '0 1.5rem 1.5rem 1.5rem', background: 'white' }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything about your lessons... (Shift + Enter for new line)"
                disabled={loading}
                rows={4}
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  resize: 'vertical',
                  minHeight: '100px',
                  maxHeight: '300px',
                  fontFamily: 'inherit',
                  lineHeight: '1.5'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="btn btn-primary"
                style={{
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  height: '56px'
                }}
              >
                {loading ? '...' : 'Send →'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
