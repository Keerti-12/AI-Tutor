import { useState } from 'react';
import Link from 'next/link';
import { modernStyles } from '../components/ModernLayout';

export default function Lesson() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const lesson = {
    subject: 'Artificial Intelligence',
    lessonNumber: 12,
    title: 'Neural Networks: Deep Learning Fundamentals',
    duration: '45 min',
    difficulty: 'Intermediate',
    progress: 65,
    totalSteps: 5
  };

  const steps = [
    {
      type: 'intro',
      title: 'Introduction to Neural Networks',
      content: 'Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) that process information in layers.'
    },
    {
      type: 'concept',
      title: 'Architecture Components',
      content: 'A neural network consists of three main components:',
      points: [
        { title: 'Input Layer', description: 'Receives the initial data for processing' },
        { title: 'Hidden Layers', description: 'Perform complex transformations and feature extraction' },
        { title: 'Output Layer', description: 'Produces the final prediction or classification' }
      ]
    },
    {
      type: 'example',
      title: 'Real-World Application',
      content: 'Image recognition in self-driving cars uses deep neural networks to identify objects like pedestrians, other vehicles, and traffic signs in real-time.',
      image: '🚗'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      question: 'Which layer of a neural network receives the initial input data?',
      options: [
        { id: 'a', text: 'Hidden Layer', correct: false },
        { id: 'b', text: 'Input Layer', correct: true },
        { id: 'c', text: 'Output Layer', correct: false },
        { id: 'd', text: 'Processing Layer', correct: false }
      ]
    },
    {
      type: 'summary',
      title: 'Lesson Summary',
      keyPoints: [
        'Neural networks mimic biological brain structures',
        'They consist of interconnected layers of nodes',
        'Deep learning uses multiple hidden layers',
        'Applications include image recognition, NLP, and more'
      ]
    }
  ];

  return (
    <>
      <style jsx global>{modernStyles}</style>
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
            <Link href="/lesson" className="nav-item active">
              <span className="nav-item-icon">📖</span>
              Current Lesson
            </Link>
            <Link href="/progress" className="nav-item">
              <span className="nav-item-icon">📈</span>
              Progress & Analytics
            </Link>
            <Link href="/ai-tutor" className="nav-item">
              <span className="nav-item-icon">🤖</span>
              AI Tutor Chat
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">{lesson.title} 🔥</h1>
              <p className="page-subtitle">{lesson.subject} - Lesson {lesson.lessonNumber}</p>
            </div>
          </div>

          <div className="content-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className="badge badge-info">{lesson.difficulty}</span>
                  <span style={{ fontSize: '0.9rem', color: '#718096' }}>⏱ {lesson.duration}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#4a5568', fontWeight: 600 }}>
                  Step {currentStep} of {lesson.totalSteps}
                </div>
              </div>

              <div className="progress-bar-container" style={{ marginBottom: '2rem' }}>
                <div className="progress-bar-fill" style={{ width: `${(currentStep / lesson.totalSteps) * 100}%` }}></div>
              </div>

              <div style={{ background: '#f7fafc', borderRadius: '16px', padding: '2.5rem', minHeight: '350px' }}>
                {steps[currentStep - 1].type === 'intro' && (
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '1.5rem' }}>
                      {steps[currentStep - 1].title}
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568' }}>
                      {steps[currentStep - 1].content}
                    </p>
                  </div>
                )}

                {steps[currentStep - 1].type === 'concept' && (
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '1rem' }}>
                      {steps[currentStep - 1].title}
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568', marginBottom: '2rem' }}>
                      {steps[currentStep - 1].content}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {steps[currentStep - 1].points.map((point, idx) => (
                        <div key={idx} style={{
                          padding: '1.5rem',
                          background: 'white',
                          borderRadius: '12px',
                          border: '2px solid #e2e8f0',
                          borderLeft: `4px solid #667eea`
                        }}>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#667eea', marginBottom: '0.5rem' }}>
                            {point.title}
                          </h4>
                          <p style={{ color: '#718096', fontSize: '1rem' }}>{point.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {steps[currentStep - 1].type === 'example' && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>{steps[currentStep - 1].image}</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '1rem' }}>
                      {steps[currentStep - 1].title}
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568', maxWidth: '600px', margin: '0 auto' }}>
                      {steps[currentStep - 1].content}
                    </p>
                  </div>
                )}

                {steps[currentStep - 1].type === 'quiz' && (
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '1.5rem' }}>
                      {steps[currentStep - 1].title}
                    </h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: 500, color: '#4a5568', marginBottom: '2rem' }}>
                      {steps[currentStep - 1].question}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {steps[currentStep - 1].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setAnswers({ ...answers, [currentStep]: option.id });
                            setShowFeedback(true);
                          }}
                          style={{
                            padding: '1.25rem 1.5rem',
                            background: answers[currentStep] === option.id
                              ? (showFeedback && option.correct ? '#c6f6d5' : showFeedback ? '#fed7d7' : 'white')
                              : 'white',
                            border: `2px solid ${answers[currentStep] === option.id ? (showFeedback && option.correct ? '#48bb78' : showFeedback ? '#f56565' : '#667eea') : '#e2e8f0'}`,
                            borderRadius: '12px',
                            fontSize: '1.05rem',
                            fontWeight: 500,
                            color: '#1a202c',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'left'
                          }}
                        >
                          {option.text}
                          {showFeedback && answers[currentStep] === option.id && (
                            <span style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>
                              {option.correct ? '✅' : '❌'}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {steps[currentStep - 1].type === 'summary' && (
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '1.5rem' }}>
                      🎓 {steps[currentStep - 1].title}
                    </h2>
                    <div style={{ background: '#eef2ff', borderRadius: '12px', padding: '2rem', border: '2px solid #667eea' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#667eea', marginBottom: '1.5rem' }}>Key Takeaways:</h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {steps[currentStep - 1].keyPoints.map((point, idx) => (
                          <li key={idx} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            marginBottom: '1rem',
                            fontSize: '1.05rem',
                            color: '#4a5568'
                          }}>
                            <span style={{ color: '#48bb78', fontSize: '1.2rem', marginTop: '0.1rem' }}>✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                      <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#48bb78', marginBottom: '1rem' }}>
                        🎉 Lesson Completed!
                      </p>
                      <Link href="/subjects">
                        <button className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
                          Back to Subjects
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setCurrentStep(Math.max(1, currentStep - 1));
                    setShowFeedback(false);
                  }}
                  disabled={currentStep === 1}
                  style={{ opacity: currentStep === 1 ? 0.5 : 1, cursor: currentStep === 1 ? 'not-allowed' : 'pointer' }}
                >
                  ← Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCurrentStep(Math.min(lesson.totalSteps, currentStep + 1));
                    setShowFeedback(false);
                  }}
                  disabled={currentStep === lesson.totalSteps}
                  style={{ opacity: currentStep === lesson.totalSteps ? 0.5 : 1, cursor: currentStep === lesson.totalSteps ? 'not-allowed' : 'pointer' }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
