import { useState } from 'react';
import Link from 'next/link';
import { modernStyles } from '../components/ModernLayout';

export default function Subjects() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      id: 1,
      name: 'Artificial Intelligence',
      icon: '🤖',
      color: '#667eea',
      progress: 75,
      completedLessons: 12,
      totalLessons: 16,
      estimatedTime: '4h 30m remaining',
      nextLesson: 'Deep Learning Fundamentals',
      difficulty: 'Intermediate',
      topics: ['Introduction to AI', 'Machine Learning Basics', 'Neural Networks', 'Deep Learning', 'Natural Language Processing', 'Computer Vision'],
      recentActivity: [
        { lesson: 'Neural Network Architecture', date: '2 hours ago', score: 95 },
        { lesson: 'Backpropagation Explained', date: '1 day ago', score: 88 }
      ],
      performance: { average: 91, quizzesPassed: 10, totalQuizzes: 12 }
    },
    {
      id: 2,
      name: 'Machine Learning',
      icon: '🧠',
      color: '#ed8936',
      progress: 60,
      completedLessons: 9,
      totalLessons: 15,
      estimatedTime: '6h 15m remaining',
      nextLesson: 'Random Forests',
      difficulty: 'Advanced',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Regression', 'Classification', 'Clustering', 'Model Evaluation'],
      recentActivity: [
        { lesson: 'Decision Trees', date: '1 day ago', score: 82 },
        { lesson: 'K-Means Clustering', date: '3 days ago', score: 90 }
      ],
      performance: { average: 86, quizzesPassed: 7, totalQuizzes: 9 }
    },
    {
      id: 3,
      name: 'Data Science',
      icon: '📊',
      color: '#48bb78',
      progress: 85,
      completedLessons: 17,
      totalLessons: 20,
      estimatedTime: '2h 45m remaining',
      nextLesson: 'Advanced Visualization',
      difficulty: 'Intermediate',
      topics: ['Data Analysis', 'Statistics', 'Data Visualization', 'Pandas', 'NumPy', 'Matplotlib'],
      recentActivity: [
        { lesson: 'Statistical Analysis', date: '3 hours ago', score: 94 },
        { lesson: 'Data Cleaning Techniques', date: '2 days ago', score: 89 }
      ],
      performance: { average: 92, quizzesPassed: 16, totalQuizzes: 17 }
    },
    {
      id: 4,
      name: 'Python Programming',
      icon: '🐍',
      color: '#4299e1',
      progress: 100,
      completedLessons: 25,
      totalLessons: 25,
      estimatedTime: 'Completed',
      nextLesson: 'Course Completed!',
      difficulty: 'Beginner',
      topics: ['Python Basics', 'Data Structures', 'OOP', 'File Handling', 'Modules', 'Error Handling'],
      recentActivity: [
        { lesson: 'Advanced Python Concepts', date: '1 week ago', score: 96 },
        { lesson: 'Final Project', date: '1 week ago', score: 98 }
      ],
      performance: { average: 94, quizzesPassed: 25, totalQuizzes: 25 }
    },
    {
      id: 5,
      name: 'Web Development',
      icon: '🌐',
      color: '#9f7aea',
      progress: 45,
      completedLessons: 9,
      totalLessons: 20,
      estimatedTime: '8h 20m remaining',
      nextLesson: 'React Components',
      difficulty: 'Intermediate',
      topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'APIs', 'Database Integration'],
      recentActivity: [
        { lesson: 'CSS Flexbox & Grid', date: '5 hours ago', score: 87 },
        { lesson: 'JavaScript ES6', date: '2 days ago', score: 91 }
      ],
      performance: { average: 89, quizzesPassed: 7, totalQuizzes: 9 }
    },
    {
      id: 6,
      name: 'Database Management',
      icon: '💾',
      color: '#38b2ac',
      progress: 30,
      completedLessons: 6,
      totalLessons: 20,
      estimatedTime: '10h 30m remaining',
      nextLesson: 'JOIN Operations',
      difficulty: 'Intermediate',
      topics: ['SQL Basics', 'Database Design', 'Normalization', 'Indexes', 'Transactions', 'NoSQL'],
      recentActivity: [
        { lesson: 'SELECT Statements', date: '1 day ago', score: 85 },
        { lesson: 'Database Schema Design', date: '4 days ago', score: 80 }
      ],
      performance: { average: 83, quizzesPassed: 5, totalQuizzes: 6 }
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
            <Link href="/subjects" className="nav-item active">
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
            <h1 className="page-title">My Learning Subjects 📚</h1>
            <p className="page-subtitle">Track individual progress for each course</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="subject-card"
                onClick={() => setSelectedSubject(subject.id === selectedSubject ? null : subject.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="subject-icon" style={{ background: `${subject.color}15`, color: subject.color }}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1a202c', marginBottom: '0.25rem' }}>
                        {subject.name}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#718096' }}>
                        {subject.difficulty} Level
                      </p>
                    </div>
                  </div>
                  {subject.progress === 100 ? (
                    <span className="badge badge-success">Completed</span>
                  ) : (
                    <span className="badge badge-info">In Progress</span>
                  )}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4a5568' }}>
                      Progress: {subject.completedLessons}/{subject.totalLessons} lessons
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: subject.color }}>
                      {subject.progress}%
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${subject.progress}%`, background: subject.color }}></div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f7fafc',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '0.25rem' }}>Average Score</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: subject.performance.average >= 90 ? '#48bb78' : subject.performance.average >= 70 ? '#ed8936' : '#f56565' }}>
                      {subject.performance.average}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '0.25rem' }}>Quizzes Passed</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#667eea' }}>
                      {subject.performance.quizzesPassed}/{subject.performance.totalQuizzes}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '0.75rem 1rem',
                  background: `${subject.color}10`,
                  borderRadius: '8px',
                  borderLeft: `3px solid ${subject.color}`
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '0.25rem' }}>Next Lesson</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a202c' }}>{subject.nextLesson}</div>
                  <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '0.25rem' }}>
                    ⏱ {subject.estimatedTime}
                  </div>
                </div>

                {selectedSubject === subject.id && (
                  <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e2e8f0',
                    animation: 'fadeIn 0.3s ease-out'
                  }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1a202c', marginBottom: '1rem' }}>
                      📋 Course Topics
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {subject.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#f7fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            color: '#4a5568',
                            fontWeight: 500
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1a202c', marginBottom: '1rem' }}>
                      📊 Recent Activity
                    </h4>
                    {subject.recentActivity.map((activity, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          background: '#f7fafc',
                          borderRadius: '8px',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a202c' }}>
                            {activity.lesson}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#718096' }}>{activity.date}</div>
                        </div>
                        <div
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: activity.score >= 90 ? '#48bb78' : activity.score >= 70 ? '#ed8936' : '#f56565'
                          }}
                        >
                          {activity.score}%
                        </div>
                      </div>
                    ))}

                    <Link href="/lesson">
                      <button
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                      >
                        Continue Learning →
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
