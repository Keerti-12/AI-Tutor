import Head from 'next/head';
import { useState } from 'react';
// import '../public/style.css'; // Removed global CSS import

const subjects = [
  {
    key: 'calculus',
    icon: <i className="fas fa-calculator"></i>,
    name: 'Calculus',
    desc: 'Master derivatives, integrals, and limits',
    progressId: 'calculus-progress',
  },
  {
    key: 'javascript',
    icon: <i className="fab fa-js-square"></i>,
    name: 'JavaScript Programming',
    desc: 'Learn modern web development',
    progressId: 'javascript-progress',
  },
  {
    key: 'python',
    icon: <i className="fab fa-python"></i>,
    name: 'Python Programming',
    desc: 'Data science and general programming',
    progressId: 'python-progress',
  },
];

const overviewData = {
  calculus: {
    theme: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-left: 8px solid #ff6b6b;',
    title: 'Calculus - Course Overview',
    icon: <i className="fas fa-calculator"></i>,
    structure: ['Limits and Continuity', 'Derivatives', 'Applications of Derivatives', 'Integrals', 'Applications of Integrals'],
    syllabus: ['Introduction to Limits', 'Limit Laws', 'Continuity', 'Definition of Derivative', 'Power Rule, Chain Rule', 'Definite and Indefinite Integrals', 'Area under Curve, Volume'],
  },
  javascript: {
    theme: 'background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; border-left: 8px solid #ffa500;',
    title: 'JavaScript Programming - Course Overview',
    icon: <i className="fab fa-js-square"></i>,
    structure: ['Basics of JavaScript', 'Functions and Objects', 'DOM Manipulation', 'Events and Interactivity', 'Advanced Topics'],
    syllabus: ['Variables and Data Types', 'Functions and Arrow Functions', 'Objects and Arrays', 'Selecting Elements', 'Event Handling', 'ES6 Features'],
  },
  python: {
    theme: 'background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; border-left: 8px solid #4ecdc4;',
    title: 'Python Programming - Course Overview',
    icon: <i className="fab fa-python"></i>,
    structure: ['Python Basics', 'Data Structures', 'Control Flow', 'Functions and Modules', 'Applications in Data Science'],
    syllabus: ['Python Syntax', 'Variables and Print', 'If Statements and Loops', 'Lists, Tuples, Dictionaries', 'Functions and Imports', 'Basic Data Science Libraries'],
  },
};

export default function Subjects() {
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [quiz, setQuiz] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const fetchNotes = async (subject) => {
    setLoadingNotes(true);
    setNotes('');
    try {
      const response = await fetch('/api/cohere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'command',
          prompt: `Give me concise study notes for the subject: ${subject}`,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });
      const result = await response.json();
      if (result.text) setNotes(result.text.trim());
      else if (result.generations && result.generations[0] && result.generations[0].text) setNotes(result.generations[0].text.trim());
      else setNotes('No notes found.');
    } catch {
      setNotes('Error fetching notes.');
    }
    setLoadingNotes(false);
  };

  const generateQuiz = async (subject) => {
    setLoadingQuiz(true);
    setQuiz('');
    try {
      const response = await fetch('/api/cohere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'command',
          prompt: `Generate a multiple-choice quiz (question and 4 options, mark the correct one) for the subject: ${subject}`,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });
      const result = await response.json();
      if (result.text) setQuiz(result.text.trim());
      else if (result.generations && result.generations[0] && result.generations[0].text) setQuiz(result.generations[0].text.trim());
      else setQuiz('No quiz found.');
    } catch {
      setQuiz('Error fetching quiz.');
    }
    setLoadingQuiz(false);
  };

  const checkQuizAnswer = () => {
    // Try to extract correct answer from quiz text
    const match = quiz.match(/correct answer is:\s*([A-D])/i);
    if (!match) {
      setQuizFeedback('Could not determine correct answer.');
      return;
    }
    const correct = match[1].toUpperCase();
    if (quizAnswer.trim().toUpperCase() === correct) {
      setQuizFeedback('Correct! 🎉');
    } else {
      setQuizFeedback(`Incorrect. The correct answer is ${correct}.`);
    }
  };

  return (
    <>
      <Head>
        <title>AI Tutor - Subjects</title>
      </Head>
      <div className="container">
        <div className="header">
          <h1><i className="fas fa-graduation-cap"></i> AI Tutor</h1>
          <p>Your personalized learning companion</p>
        </div>
        <div className="nav-tabs">
          <a className="nav-tab" href="/"> <i className="fas fa-home"></i> Dashboard</a>
          <a className="nav-tab active" href="/subjects"><i className="fas fa-book"></i> Subjects</a>
          <a className="nav-tab" href="/lesson"><i className="fas fa-chalkboard-teacher"></i> Current Lesson</a>
          <a className="nav-tab" href="/progress"><i className="fas fa-chart-line"></i> Progress</a>
          <a className="nav-tab" href="/ai-tutor"><i className="fas fa-robot"></i> AI Tutor</a>
        </div>
        <div id="subjects" className="tab-content active">
          <h2>Choose Your Subject</h2>
          <div className="subject-grid">
            {subjects.map(subj => (
              <div className="subject-card" key={subj.key} onClick={() => setSelected(subj.key)}>
                {subj.icon}
                <h3>{subj.name}</h3>
                <p>{subj.desc}</p>
                <div className="progress-bar">
                  <div className="progress-fill" id={subj.progressId} style={{ width: '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
          <div id="topicList" className="topic-list"></div>
          <div id="course-overview" style={{ marginTop: 40 }}>
            {selected && (
              <div className="overview-card" style={{ borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: '32px 40px', marginBottom: 20, ...parseStyle(overviewData[selected].theme) }}>
                <h2>{overviewData[selected].icon} {overviewData[selected].title}</h2>
                <h4>Course Structure:</h4>
                <ul>
                  {overviewData[selected].structure.map((item, idx) => (
                    <li key={idx} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                      <span>{item}</span>
                      <button 
                        onClick={() => fetchNotes(item)}
                        disabled={loadingNotes}
                        style={{
                          background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                          border: '1px solid rgba(255,255,255,0.3)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          color: overviewData[selected].theme.includes('color:') ? overviewData[selected].theme.split('color:')[1].split(';')[0].trim() : 'white',
                          fontSize: '1rem',
                          cursor: loadingNotes ? 'not-allowed' : 'pointer',
                          opacity: loadingNotes ? 0.5 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          if (!loadingNotes) {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                        title="Generate notes for this topic"
                      >
                        <i className="fas fa-file-alt"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <h4>Syllabus:</h4>
                <ul>
                  {overviewData[selected].syllabus.map((item, idx) => (
                    <li key={idx} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                      <span>{item}</span>
                      <button 
                        onClick={() => fetchNotes(item)}
                        disabled={loadingNotes}
                        style={{
                          background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                          border: '1px solid rgba(255,255,255,0.3)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          color: overviewData[selected].theme.includes('color:') ? overviewData[selected].theme.split('color:')[1].split(';')[0].trim() : 'white',
                          fontSize: '1rem',
                          cursor: loadingNotes ? 'not-allowed' : 'pointer',
                          opacity: loadingNotes ? 0.5 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          if (!loadingNotes) {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                        title="Generate notes for this topic"
                      >
                        <i className="fas fa-file-alt"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    className="btn themed-btn notes-btn"
                    style={{
                      background: overviewData[selected].theme.split(';')[0].replace('background:', '').trim(),
                      color: overviewData[selected].theme.includes('color:') ? overviewData[selected].theme.split('color:')[1].split(';')[0].trim() : 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      cursor: loadingNotes ? 'not-allowed' : 'pointer',
                      marginBottom: '8px',
                    }}
                    onClick={() => fetchNotes(overviewData[selected].title.split(' - ')[0])}
                    disabled={loadingNotes}
                  >
                    Get {overviewData[selected].title.split(' ')[0]} Notes
                  </button>
                  <button
                    className="btn themed-btn quiz-btn"
                    style={{
                      background: 'linear-gradient(90deg, #8f00ff 0%, #e100ff 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      cursor: loadingQuiz ? 'not-allowed' : 'pointer',
                      marginBottom: '8px',
                    }}
                    onClick={() => generateQuiz(selected)}
                    disabled={loadingQuiz}
                  >
                    Start {overviewData[selected].title.split(' ')[0]} Quiz
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
                  <div style={{
                    flex: 1,
                    background: overviewData[selected].theme.split(';')[0].replace('background:', '').trim(),
                    color: overviewData[selected].theme.includes('color:') ? overviewData[selected].theme.split('color:')[1].split(';')[0].trim() : '#333',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    padding: 18,
                    minHeight: 80,
                  }}>
                    <h4 style={{ marginBottom: 8, color: 'inherit' }}>Notes</h4>
                    {loadingNotes ? <em>Loading notes...</em> : notes && <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1em', margin: 0, color: 'inherit', background: 'transparent' }}>{notes}</pre>}
                  </div>
                  <div style={{
                    flex: 1,
                    background: overviewData[selected].theme.split(';')[0].replace('background:', '').trim(),
                    color: overviewData[selected].theme.includes('color:') ? overviewData[selected].theme.split('color:')[1].split(';')[0].trim() : '#333',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    padding: 18,
                    minHeight: 80,
                  }}>
                    <h4 style={{ marginBottom: 8, color: 'inherit' }}>Quiz</h4>
                    {loadingQuiz ? <em>Generating quiz...</em> : quiz && <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1em', margin: 0, color: 'inherit', background: 'transparent' }}>{quiz}</pre>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function parseStyle(styleString) {
  // Converts inline CSS string to JS style object
  return styleString.split(';').filter(Boolean).reduce((acc, rule) => {
    const [key, value] = rule.split(':');
    if (key && value) {
      acc[key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase())] = value.trim();
    }
    return acc;
  }, {});
}
