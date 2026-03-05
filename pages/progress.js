import { useState } from 'react';
import Link from 'next/link';
import { modernStyles } from '../components/ModernLayout';

export default function Progress() {
  const [timeRange, setTimeRange] = useState('week');

  const overallStats = {
    totalLessonsCompleted: 73,
    totalQuizzesPassed: 59,
    averageScore: 88,
    totalStudyTime: '42h 15m',
    currentStreak: 12,
    longestStreak: 18
  };

  const subjectProgress = [
    { name: 'Artificial Intelligence', progress: 75, lessonsCompleted: 12, totalLessons: 16, averageScore: 91, timeSpent: '12h 30m', color: '#667eea' },
    { name: 'Machine Learning', progress: 60, lessonsCompleted: 9, totalLessons: 15, averageScore: 86, timeSpent: '9h 45m', color: '#ed8936' },
    { name: 'Data Science', progress: 85, lessonsCompleted: 17, totalLessons: 20, averageScore: 92, timeSpent: '14h 20m', color: '#48bb78' },
    { name: 'Python Programming', progress: 100, lessonsCompleted: 25, totalLessons: 25, averageScore: 94, timeSpent: '18h 30m', color: '#4299e1' },
    { name: 'Web Development', progress: 45, lessonsCompleted: 9, totalLessons: 20, averageScore: 89, timeSpent: '7h 15m', color: '#9f7aea' },
    { name: 'Database Management', progress: 30, lessonsCompleted: 6, totalLessons: 20, averageScore: 83, timeSpent: '5h 45m', color: '#38b2ac' }
  ];

  const weeklyActivity = [
    { day: 'Mon', lessons: 3, time: 120 },
    { day: 'Tue', lessons: 2, time: 90 },
    { day: 'Wed', lessons: 4, time: 150 },
    { day: 'Thu', lessons: 3, time: 110 },
    { day: 'Fri', lessons: 5, time: 180 },
    { day: 'Sat', lessons: 2, time: 80 },
    { day: 'Sun', lessons: 1, time: 45 }
  ];

  const maxLessons = Math.max(...weeklyActivity.map(d => d.lessons));

  const achievements = [
    { title: 'Python Master', description: 'Completed Python Programming', icon: '🐍', color: '#4299e1', unlocked: true },
    { title: '7 Day Streak', description: 'Studied for 7 days in a row', icon: '🔥', color: '#ed8936', unlocked: true },
    { title: 'Quiz Champion', description: 'Scored 95%+ on 10 quizzes', icon: '🏆', color: '#f6e05e', unlocked: false },
    { title: 'Night Owl', description: 'Completed 5 lessons after 10 PM', icon: '🦉', color: '#9f7aea', unlocked: true }
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
            <Link href="/lesson" className="nav-item">
              <span className="nav-item-icon">📖</span>
              Current Lesson
            </Link>
            <Link href="/progress" className="nav-item active">
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
            <h1 className="page-title">Progress & Analytics 📊</h1>
            <p className="page-subtitle">Detailed insights into your learning journey</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-title">Total Lessons</span>
                <div className="stat-card-icon" style={{ background: '#667eea15', color: '#667eea' }}>📚</div>
              </div>
              <div className="stat-card-value">{overallStats.totalLessonsCompleted}</div>
              <div className="stat-card-change neutral">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-title">Average Score</span>
                <div className="stat-card-icon" style={{ background: '#48bb7815', color: '#48bb78' }}>⭐</div>
              </div>
              <div className="stat-card-value">{overallStats.averageScore}%</div>
              <div className="stat-card-change positive">↗ +5% this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-title">Study Time</span>
                <div className="stat-card-icon" style={{ background: '#ed893615', color: '#ed8936' }}>⏱</div>
              </div>
              <div className="stat-card-value">{overallStats.totalStudyTime}</div>
              <div className="stat-card-change neutral">Total invested</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-title">Current Streak</span>
                <div className="stat-card-icon" style={{ background: '#f5656515', color: '#f56565' }}>🔥</div>
              </div>
              <div className="stat-card-value">{overallStats.currentStreak}</div>
              <div className="stat-card-change neutral">days</div>
            </div>
          </div>

          <div className="content-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Subject Progress</h2>
                <span style={{ fontSize: '0.9rem', color: '#718096' }}>Individual performance breakdown</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {subjectProgress.map((subject, idx) => (
                  <div key={idx} style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a202c' }}>{subject.name}</h4>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: subject.color }}>{subject.progress}%</span>
                    </div>
                    <div className="progress-bar-container" style={{ marginBottom: '1rem' }}>
                      <div className="progress-bar-fill" style={{ width: `${subject.progress}%`, background: subject.color }}></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', fontSize: '0.85rem' }}>
                      <div>
                        <div style={{ color: '#718096' }}>Lessons</div>
                        <div style={{ fontWeight: 600, color: '#1a202c' }}>{subject.lessonsCompleted}/{subject.totalLessons}</div>
                      </div>
                      <div>
                        <div style={{ color: '#718096' }}>Avg Score</div>
                        <div style={{ fontWeight: 600, color: subject.averageScore >= 90 ? '#48bb78' : subject.averageScore >= 70 ? '#ed8936' : '#f56565' }}>{subject.averageScore}%</div>
                      </div>
                      <div>
                        <div style={{ color: '#718096' }}>Time Spent</div>
                        <div style={{ fontWeight: 600, color: '#1a202c' }}>{subject.timeSpent}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Weekly Activity</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '0.5rem' }}>
                  {weeklyActivity.map((day, idx) => (
                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <div style={{
                        width: '100%',
                        height: `${(day.lessons / maxLessons) * 160}px`,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px 8px 0 0',
                        position: 'relative',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-25px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#667eea'
                        }}>{day.lessons}</div>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#718096' }}>{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Achievements</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {achievements.map((achievement, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: achievement.unlocked ? '#f7fafc' : '#edf2f7',
                      borderRadius: '10px',
                      opacity: achievement.unlocked ? 1 : 0.5
                    }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '12px',
                        background: achievement.unlocked ? `${achievement.color}15` : '#cbd5e0',
                        color: achievement.unlocked ? achievement.color : '#a0aec0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>{achievement.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: achievement.unlocked ? '#1a202c' : '#718096' }}>{achievement.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#718096' }}>{achievement.description}</div>
                      </div>
                      {achievement.unlocked && <span style={{ color: '#48bb78' }}>✓</span>}
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
