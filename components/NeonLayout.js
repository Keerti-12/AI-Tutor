export const neonStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;500;700&display=swap');

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 15px currentColor, 0 0 30px currentColor; }
    50% { box-shadow: 0 0 25px currentColor, 0 0 50px currentColor; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes glow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Rajdhani', sans-serif;
    background: linear-gradient(135deg, #0a0e27, #1a1f3a, #0f172a);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    color: #fff;
  }
  
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
    z-index: 2;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    animation: slideIn 0.8s ease-out;
  }

  .header h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: 4rem;
    font-weight: 900;
    background: linear-gradient(90deg, #00f5ff, #ff00ff, #00f5ff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s linear infinite;
    text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    margin-bottom: 0.5rem;
    letter-spacing: 3px;
  }

  .header .subtitle {
    font-size: 1.4rem;
    color: #0ff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    font-weight: 300;
    letter-spacing: 2px;
  }

  .nav-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    animation: slideIn 1s ease-out;
  }

  .nav-tab {
    background: rgba(10, 14, 39, 0.6);
    border: 2px solid rgba(0, 255, 255, 0.3);
    color: #0ff;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .nav-tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  .nav-tab:hover::before {
    left: 100%;
  }

  .nav-tab:hover {
    border-color: #0ff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .nav-tab.active {
    background: rgba(0, 255, 255, 0.1);
    border-color: #0ff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
    animation: neonPulse 2s ease-in-out infinite;
  }

  .tab-content {
    animation: slideIn 1.2s ease-out;
  }

  .neon-card {
    background: rgba(10, 14, 39, 0.8);
    border: 2px solid rgba(0, 255, 255, 0.4);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
  }

  .neon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
    border-color: #0ff;
  }

  .neon-button {
    background: linear-gradient(135deg, #0ff, #f0f);
    border: none;
    color: #000;
    padding: 1rem 2rem;
    border-radius: 15px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
  }

  .neon-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.5);
  }

  .neon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .header h1 {
      font-size: 2.5rem;
    }
    
    .container {
      padding: 1rem;
    }
  }
`;
