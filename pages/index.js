import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  // Example state, you can expand this to match your app logic
  const [stats, setStats] = useState({
    totalLessons: 0,
    averageScore: '0%',
    currentStreak: 0,
    totalTime: '0h',
  });

  return (
    <>
      <Head>
        <title>AI Tutor - Personalized Learning</title>
      </Head>
      <div className="container">
        <div className="header">
          <h1><i className="fas fa-graduation-cap"></i> AI Tutor</h1>
          <p>Your personalized learning companion</p>
        </div>
        <div className="nav-tabs">
          <Link className="nav-tab active" href="/"> <i className="fas fa-home"></i> Dashboard</Link>
          <Link className="nav-tab" href="/subjects"><i className="fas fa-book"></i> Subjects</Link>
          <Link className="nav-tab" href="/lesson"><i className="fas fa-chalkboard-teacher"></i> Current Lesson</Link>
          <Link className="nav-tab" href="/progress"><i className="fas fa-chart-line"></i> Progress</Link>
          <Link className="nav-tab" href="/ai-tutor"><i className="fas fa-robot"></i> AI Tutor</Link>
        </div>
        <div id="dashboard" className="tab-content active">
          <h2>Welcome back! Ready to continue learning?</h2>
          <div className="stats-grid">
            <div className="stat-card" style={{
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              color: 'white',
              borderRadius: 18,
              boxShadow: '0 4px 16px #764ba244',
              padding: '1.2rem',
              margin: '0.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}>
              <div style={{fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.2rem'}}><i className="fas fa-book-open"></i></div>
              <div className="stat-value" id="totalLessons" style={{fontSize: '2.1rem', fontWeight: 700}}>{stats.totalLessons}</div>
              <div style={{fontSize: '1.1rem', marginTop: '0.2rem'}}>Lessons Completed</div>
            </div>
            <div className="stat-card" style={{
              background: 'linear-gradient(135deg, #64b5f6 0%, #90caf9 100%)',
              color: 'white',
              borderRadius: 18,
              boxShadow: '0 4px 16px #64b5f644',
              padding: '1.2rem',
              margin: '0.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}>
              <div style={{fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.2rem'}}><i className="fas fa-star"></i></div>
              <div className="stat-value" id="averageScore" style={{fontSize: '2.1rem', fontWeight: 700}}>{stats.averageScore}</div>
              <div style={{fontSize: '1.1rem', marginTop: '0.2rem'}}>Average Quiz Score</div>
            </div>
            <div className="stat-card" style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              color: '#764ba2',
              borderRadius: 18,
              boxShadow: '0 4px 16px #a8edea44',
              padding: '1.2rem',
              margin: '0.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}>
              <div style={{fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.2rem'}}><i className="fas fa-fire"></i></div>
              <div className="stat-value" id="currentStreak" style={{fontSize: '2.1rem', fontWeight: 700}}>{stats.currentStreak}</div>
              <div style={{fontSize: '1.1rem', marginTop: '0.2rem'}}>Day Streak</div>
            </div>
            <div className="stat-card" style={{
              background: 'linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%)',
              color: 'white',
              borderRadius: 18,
              boxShadow: '0 4px 16px #44a08d44',
              padding: '1.2rem',
              margin: '0.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}>
              <div style={{fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.2rem'}}><i className="fas fa-clock"></i></div>
              <div className="stat-value" id="totalTime" style={{fontSize: '2.1rem', fontWeight: 700}}>{stats.totalTime}</div>
              <div style={{fontSize: '1.1rem', marginTop: '0.2rem'}}>Study Time</div>
            </div>
          </div>
          <div style={{marginTop: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
            <div style={{
              flex: 1, 
              minWidth: 260, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(118,75,162,0.25)', 
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600}}>Quick Links</h3>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, lineHeight: '2'}}>
                <li><Link href="/subjects" style={{color: '#fff', textDecoration: 'none', opacity: 0.9, transition: 'opacity 0.2s'}}>Go to Subjects</Link></li>
                <li><Link href="/lesson" style={{color: '#fff', textDecoration: 'none', opacity: 0.9, transition: 'opacity 0.2s'}}>Continue Lesson</Link></li>
                <li><Link href="/progress" style={{color: '#fff', textDecoration: 'none', opacity: 0.9, transition: 'opacity 0.2s'}}>View Progress</Link></li>
                <li><Link href="/ai-tutor" style={{color: '#fff', textDecoration: 'none', opacity: 0.9, transition: 'opacity 0.2s'}}>Ask AI Tutor</Link></li>
              </ul>
            </div>
            <div style={{
              flex: 2, 
              minWidth: 300, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(118,75,162,0.25)', 
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600}}>Motivational Quote</h3>
              <blockquote style={{
                fontStyle: 'italic', 
                fontSize: '1.1rem', 
                margin: 0,
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                borderLeft: '4px solid rgba(255,255,255,0.4)'
              }}>
                &ldquo;Success is the sum of small efforts, repeated day in and day out.&rdquo;
                <footer style={{fontSize: '0.9rem', marginTop: '1rem', opacity: 0.8}}>— Robert Collier</footer>
              </blockquote>
            </div>
            <div style={{
              flex: 1, 
              minWidth: 260, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(118,75,162,0.25)', 
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600}}>Recent Activity</h3>
              <ul style={{paddingLeft: 0, margin: 0, lineHeight: '1.8', listStyle: 'none'}}>
                <li style={{marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative'}}>
                  <span style={{position: 'absolute', left: 0, opacity: 0.7}}>•</span>
                  Completed: Calculus - Derivatives
                </li>
                <li style={{marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative'}}>
                  <span style={{position: 'absolute', left: 0, opacity: 0.7}}>•</span>
                  Quiz: JavaScript - 7/10
                </li>
                <li style={{marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative'}}>
                  <span style={{position: 'absolute', left: 0, opacity: 0.7}}>•</span>
                  Lesson: Python - Data Structures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
