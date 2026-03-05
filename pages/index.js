import { useState } from 'react';
import Link from 'next/link';
import { modernStyles } from '../components/ModernLayout';

export default function Home() {
  const [userData, setUserData] = useState({
    name: 'Alex Chen',
    totalProgress: 68,
    currentStreak: 12,
    weeklyGoal: 75,
    weeklyProgress: 58
  });

  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Artificial Intelligence', progress: 75, lessons: 12, totalLessons: 16, icon: '🤖', color: '#667eea', lastStudied: '2h ago', status: 'In Progress' },
    { id: 2, name: 'Machine Learning', progress: 60, lessons: 9, totalLessons: 15, icon: '🧠', color: '#ed8936', lastStudied: '1d ago', status: 'In Progress' },
    { id: 3, name: 'Data Science', progress: 85, lessons: 17, totalLessons: 20, icon: '📊', color: '#48bb78', lastStudied: '3h ago', status: 'In Progress' },
    { id: 4, name: 'Python Programming', progress: 100, lessons: 25, totalLessons: 25, icon: '🐍', color: '#4299e1', lastStudied: '1w ago', status: 'Completed' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'lesson', title: 'Neural Networks Basics', subject: 'AI', time: '2 hours ago', score: 95 },
    { id: 2, type: 'quiz', title: 'ML Algorithms Quiz', subject: 'ML', time: '1 day ago', score: 88 },
    { id: 3, type: 'achievement', title: 'Week Streak Achieved!', subject: 'General', time: '2 days ago', score: null }
  ]);

  const stats = [
    { title: 'Total Progress', value: `${userData.totalProgress}%`, change: '+12% this month', icon: '📈', color: '#667eea', positive: true },
    { title: 'Active Subjects', value: subjects.filter(s => s.status === 'In Progress').length, change: `${subjects.length} total enrolled`, icon: '📚', color: '#ed8936', positive: false },
    { title: 'Current Streak', value: `${userData.currentStreak} days`, change: 'Keep it going!', icon: '🔥', color: '#48bb78', positive: true },
    { title: 'Weekly Goal', value: `${userData.weeklyProgress}/${userData.weeklyGoal}%`, change: `${userData.weeklyGoal - userData.weeklyProgress}% remaining`, icon: '🎯', color: '#4299e1', positive: false }
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
            <Link href="/" className="nav-item active">
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
            <Link href="/ai-tutor" className="nav-item">
              <span className="nav-item-icon">🤖</span>
              AI Tutor Chat
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Welcome back, {userData.name}! 👋</h1>
            <p className="page-subtitle">Here's your learning progress today</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">{stat.title}</span>
                  <div className="stat-card-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                <div className="stat-card-value">{stat.value}</div>
                <div className={`stat-card-change ${stat.positive ? 'positive' : 'neutral'}`}>
                  {stat.positive && '↗ '}{stat.change}
                </div>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">My Learning Path</h2>
                <Link href="/subjects" className="btn btn-secondary">View All</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {subjects.map(subject => (
                  <Link key={subject.id} href="/lesson" style={{ textDecoration: 'none' }}>
                    <div className="subject-card">
                      <div className="subject-header">
                        <div className="subject-title">
                          <div className="subject-icon" style={{ background: `${subject.color}15`, color: subject.color }}>
                            {subject.icon}
                          </div>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem', color: '#1a202c' }}>{subject.name}</h3>
                            <p style={{ fontSize: '0.875rem', color: '#718096' }}>Last studied: {subject.lastStudied}</p>
                          </div>
                        </div>
                        <span className={`badge ${subject.status === 'Completed' ? 'badge-success' : 'badge-info'}`}>
                          {subject.status}
                        </span>
                      </div>
                      <div style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4a5568' }}>
                            {subject.lessons}/{subject.totalLessons} lessons completed
                          </span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: subject.color }}>
                            {subject.progress}%
                          </span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: `${subject.progress}%`, background: subject.color }}></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Weekly Goal</h2>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    background: `conic-gradient(#667eea ${userData.weeklyProgress * 3.6}deg, #e2e8f0 ${userData.weeklyProgress * 3.6}deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <div style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '50%', 
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#667eea'
                    }}>
                      {userData.weeklyProgress}%
                    </div>
                  </div>
                  <p style={{ color: '#718096', fontSize: '0.95rem' }}>
                    {userData.weeklyGoal - userData.weeklyProgress}% left to reach your weekly goal
                  </p>
                  <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Continue Learning
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Recent Activity</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {recentActivity.map(activity => (
                    <div key={activity.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      padding: '0.75rem',
                      background: '#f7fafc',
                      borderRadius: '10px'
                    }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '10px',
                        background: activity.type === 'lesson' ? '#667eea15' : activity.type === 'quiz' ? '#ed893615' : '#48bb7815',
                        color: activity.type === 'lesson' ? '#667eea' : activity.type === 'quiz' ? '#ed8936' : '#48bb78',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        {activity.type === 'lesson' ? '📖' : activity.type === 'quiz' ? '✍️' : '🏆'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a202c' }}>{activity.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>{activity.time}</div>
                      </div>
                      {activity.score && (
                        <div style={{ 
                          fontWeight: 700, 
                          fontSize: '1.1rem',
                          color: activity.score >= 90 ? '#48bb78' : activity.score >= 70 ? '#ed8936' : '#f56565'
                        }}>
                          {activity.score}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
