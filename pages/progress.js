import Head from 'next/head';
import Link from 'next/link';

export default function Progress() {
  return (
    <>
      <Head>
        <title>AI Tutor - Progress</title>
      </Head>
      <div className="container">
        <div className="header">
          <h1><i className="fas fa-graduation-cap"></i> AI Tutor</h1>
          <p>Your personalized learning companion</p>
        </div>
        <div className="nav-tabs">
          <Link className="nav-tab" href="/"> <i className="fas fa-home"></i> Dashboard</Link>
          <Link className="nav-tab" href="/subjects"><i className="fas fa-book"></i> Subjects</Link>
          <Link className="nav-tab" href="/lesson"><i className="fas fa-chalkboard-teacher"></i> Current Lesson</Link>
          <Link className="nav-tab active" href="/progress"><i className="fas fa-chart-line"></i> Progress</Link>
          <Link className="nav-tab" href="/ai-tutor"><i className="fas fa-robot"></i> AI Tutor</Link>
        </div>
        <div id="progress" className="tab-content active">
          <h2>Your Learning Progress</h2>
          <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
            <div style={{flex: '1', minWidth: '220px', background: '#fff3e0', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <h3>Subjects Completed</h3>
              <ul>
                <li>Mathematics <span style={{color: 'green'}}>✔</span></li>
                <li>Science <span style={{color: 'green'}}>✔</span></li>
                <li>History <span style={{color: 'orange'}}>In Progress</span></li>
              </ul>
            </div>
            <div style={{flex: '1', minWidth: '220px', background: '#e8f5e9', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <h3>Quiz Performance</h3>
              <ul>
                <li>Mathematics: 8/10</li>
                <li>Science: 7/10</li>
                <li>History: 4/10</li>
              </ul>
            </div>
          </div>
          <div style={{background: '#e3f2fd', padding: '1rem', borderRadius: '8px'}}>
            <h3>Tips to Improve</h3>
            <ul>
              <li>Review incorrect quiz answers for each subject.</li>
              <li>Spend more time on History lessons.</li>
              <li>Try generating notes for difficult topics.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
