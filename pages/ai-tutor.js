import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { modernStyles } from "../components/ModernLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiTutor() {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your AI tutor. I can help explain concepts, provide hints, or answer questions about your lessons. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user", timestamp: new Date() },
    ]);

    setInput("");
    setLoading(true);
    setTyping(true);

    try {
      const aiResponse = await getAIResponse(userMessage);

      setTyping(false);

      setMessages((prev) => [
        ...prev,
        { text: aiResponse, sender: "ai", timestamp: new Date() },
      ]);
    } catch {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error connecting to the AI model.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }

    setLoading(false);
  };

  async function getAIResponse(userMessage) {
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "API error");
      }

      const result = await response.json();

      if (result.reply) return result.reply;

      return "No response from AI.";
    } catch (error) {
      console.error("Fetch error:", error);
      return "Error connecting to AI service.";
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const quickSuggestions = [
    "Explain neural networks",
    "What is machine learning?",
    "Help with Python syntax",
    "Tips for studying effectively",
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
          0%,
          100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
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

        <main
          className="main-content"
          style={{ padding: "1rem" }}
        >
          <div
            className="card"
            style={{
              maxWidth: "100%",
              margin: "0 auto",
              height: "calc(100vh - 32px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="card-header"
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <h2
                className="card-title"
                style={{ fontSize: "1.25rem", margin: 0 }}
              >
                🤖 AI Tutor Chat
              </h2>
            </div>

            <div
              ref={chatContainerRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                background: "#f7fafc",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="chat-message"
                  style={{
                    alignSelf:
                      msg.sender === "user"
                        ? "flex-end"
                        : "flex-start",
                    maxWidth: "85%",
                  }}
                >
                  <div
                    style={{
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg, #667eea, #764ba2)"
                          : "white",
                      color:
                        msg.sender === "user"
                          ? "white"
                          : "#1a202c",
                      padding: "0.875rem 1rem",
                      borderRadius:
                        msg.sender === "user"
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                    }}
                  >
                    {msg.sender === "ai" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}

                    <div
                      style={{
                        fontSize: "0.65rem",
                        marginTop: "0.4rem",
                        opacity: 0.7,
                        textAlign: "right",
                      }}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div style={{ padding: "1rem" }}>
                {quickSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    style={{
                      margin: "4px",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
              }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                disabled={loading}
                rows={3}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="btn btn-primary"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}