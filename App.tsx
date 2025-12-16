import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import { fetchOracleAnswer } from './services/oracleService';
import { AppState } from './types';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.IDLE);
  const [answer, setAnswer] = useState<string>('');
  const [userQuestion, setUserQuestion] = useState<string>('');

  const handleStart = async () => {
    if (currentState === AppState.LOADING) return;

    // Transition to loading (The "Tension" phase)
    setCurrentState(AppState.LOADING);
    setAnswer('');

    // Spec Requirement: 2.4 Wait & Tension.
    // We enforce a minimum wait time to simulate "consulting the spirits" 
    // even if the API is fast.
    const minWaitPromise = new Promise(resolve => setTimeout(resolve, 2000));
    const apiPromise = fetchOracleAnswer();

    try {
      const [_, result] = await Promise.all([minWaitPromise, apiPromise]);
      setAnswer(result);
      setCurrentState(AppState.RESULT);
    } catch (e) {
      // Should be handled in service, but double safety
      setAnswer("命運拒絕回答。滾。");
      setCurrentState(AppState.RESULT);
    }
  };

  const handleReset = () => {
    setUserQuestion('');
    setAnswer('');
    setCurrentState(AppState.IDLE);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-white overflow-hidden bg-gradient-to-b from-[#4a3b75] via-[#a66d90] to-[#ffb7b2]">
      
      {/* Dynamic Background Elements */}
      <StarBackground />
      
      {/* Clouds effect (CSS Gradient Overlay) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-transparent to-[rgba(255,255,255,0.2)] pointer-events-none z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-8 animate-fade-in">
        
        {/* Header Section */}
        <header className="space-y-2 drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider text-white">
            解答之書
          </h1>
          <h2 className="text-xl md:text-2xl font-serif tracking-widest opacity-90">
            The Book Of Answers
          </h2>
        </header>

        {/* Dynamic Card Area */}
        <div className="w-full">
          
          {currentState === AppState.IDLE && (
            <div className="flex flex-col items-center space-y-6 animate-fade-in">
              <p className="font-sans text-sm md:text-base tracking-wide text-white/90 drop-shadow-md">
                在心中默念你想要知道的答案，接著按下 Start...
              </p>
              
              {/* The "Ritual" Input - Not sent to AI, but used for user focus */}
              <div className="w-full h-64 glass-panel rounded-3xl p-1 shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <textarea
                  className="w-full h-full bg-transparent border-none outline-none resize-none p-6 text-center text-lg placeholder-white/50 text-white font-serif align-middle flex items-center justify-center"
                  placeholder="(此處可選填，或直接默念)"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  style={{ paddingTop: '30%' }} 
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStart}
                  className="group relative inline-flex items-center justify-center px-8 py-2 text-lg font-serif tracking-widest text-white transition-all duration-300 ease-out hover:scale-105 focus:outline-none"
                >
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-white transition-all duration-300 group-hover:h-[2px] group-hover:shadow-[0_0_10px_white]"></span>
                  Start
                </button>
              </div>
            </div>
          )}

          {currentState === AppState.LOADING && (
            <div className="w-full h-64 flex flex-col items-center justify-center space-y-4 animate-fade-in">
              {/* Mystical Loading Indicator */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-2xl animate-pulse">🔮</span>
                </div>
              </div>
              <p className="font-serif text-lg tracking-widest animate-pulse text-white/90">
                正在通靈...
              </p>
            </div>
          )}

          {currentState === AppState.RESULT && (
            <div className="flex flex-col items-center space-y-8 animate-fade-in">
              
              {/* Answer Card */}
              <div className="w-full min-h-[16rem] glass-panel rounded-3xl p-8 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                 {/* Glowing orb effect behind text */}
                 <div className="absolute w-32 h-32 bg-purple-500/30 blur-3xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-purple-400/40 transition-all duration-700"></div>
                 
                 <h3 className="relative text-2xl md:text-3xl font-serif font-bold leading-relaxed tracking-wide drop-shadow-md text-white break-words w-full">
                   {answer}
                 </h3>
              </div>

              <div className="flex space-x-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-white/40 rounded-full hover:bg-white/10 transition text-sm font-serif tracking-wider"
                >
                  再問一次
                </button>
                {/* Share interaction simulation */}
                <button
                  onClick={() => alert('截圖分享給你的備胎朋友吧！')}
                  className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full transition text-sm font-serif tracking-wider"
                >
                  分享
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-4 text-white/40 text-xs font-sans">
        The Aggressive Oracle v1.0
      </div>
    </main>
  );
};

export default App;