import Head from 'next/head';

export default function Lesson() {
  return (
    <>
      <Head>
        <title>AI Tutor - Lesson</title>
      </Head>
      <div className="container">
        <div className="header">
          <h1><i className="fas fa-graduation-cap"></i> AI Tutor</h1>
          <p>Your personalized learning companion</p>
        </div>
        <div className="nav-tabs">
          <a className="nav-tab" href="/"> <i className="fas fa-home"></i> Dashboard</a>
          <a className="nav-tab" href="/subjects"><i className="fas fa-book"></i> Subjects</a>
          <a className="nav-tab active" href="/lesson"><i className="fas fa-chalkboard-teacher"></i> Current Lesson</a>
          <a className="nav-tab" href="/progress"><i className="fas fa-chart-line"></i> Progress</a>
          <a className="nav-tab" href="/ai-tutor"><i className="fas fa-robot"></i> AI Tutor</a>
        </div>
        <div id="lesson" className="tab-content active">
            <div id="lessonContent" style={{padding: '2rem', background: '#f8f9fa', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <h2>Today's Lesson: Introduction to Artificial Intelligence</h2>
              <p>Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn. AI is used in various fields such as healthcare, finance, education, and more.</p>
              <ul>
                <li><b>Definition:</b> AI refers to systems that can perform tasks that typically require human intelligence.</li>
                <li><b>Applications:</b> Virtual assistants, recommendation systems, autonomous vehicles, and more.</li>
                <li><b>Key Concepts:</b> Machine Learning, Neural Networks, Natural Language Processing.</li>
              </ul>
              <div style={{marginTop: '2rem', background: '#e3f2fd', padding: '1rem', borderRadius: '8px'}}>
                <h3>Quick Quiz</h3>
                <p>Which of the following is an application of AI?</p>
                <ul>
                  <li>Self-driving cars</li>
                  <li>Weather forecasting</li>
                  <li>Online shopping recommendations</li>
                </ul>
                <p style={{fontStyle: 'italic', color: '#1976d2'}}>Answer: Self-driving cars, Online shopping recommendations</p>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
