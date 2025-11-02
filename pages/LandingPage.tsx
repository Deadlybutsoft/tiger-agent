import React, { useState, useEffect, useRef } from 'react';
import { TvIcon } from '../components/Icons';
import LoginModal from '../components/LoginModal';

declare global {
  interface Window {
    TubesCursor: any;
  }
}

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesCursorApp = useRef<any>(null);

  useEffect(() => {
    if (window.TubesCursor && canvasRef.current) {
      const app = window.TubesCursor(canvasRef.current, {
        tubes: {
          colors: ["#f967fb", "#53bc28", "#6958d5"],
          lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
          }
        }
      });
      tubesCursorApp.current = app;
    }

    const randomColors = (count: number) => {
        return new Array(count)
            .fill(0)
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    };
    
    const handleClick = () => {
      if (tubesCursorApp.current?.tubes) {
        const colors = randomColors(3);
        const lightsColors = randomColors(4);
        tubesCursorApp.current.tubes.setColors(colors);
        tubesCursorApp.current.tubes.setLightsColors(lightsColors);
      }
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
      tubesCursorApp.current = null;
    };
  }, []);

  const tagline = "Generate leads, build excitement, and grow your email list ahead of launch day.";
  const titlePart1 = "Good things come to those";
  const titlePart2 = "who wait.";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center isolate p-4">
      <canvas ref={canvasRef} className="absolute inset-0 z-[5] w-full h-full"></canvas>
      {/* Background Effects */}
      <div className="stars"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Existing Stars */}
        <div className="twinkle-star" style={{ top: '10%', left: '10%', animationDelay: '0s', animationDuration: '2.5s' }}></div>
        <div className="twinkle-star" style={{ top: '25%', left: '85%', animationDelay: '0.2s', animationDuration: '1.8s' }}></div>
        <div className="twinkle-star" style={{ top: '50%', left: '50%', animationDelay: '0.4s', animationDuration: '2.2s' }}></div>
        <div className="twinkle-star" style={{ top: '5%', left: '40%', animationDelay: '0.8s', animationDuration: '2.8s' }}></div>
        <div className="twinkle-star" style={{ top: '60%', left: '95%', animationDelay: '1s', animationDuration: '1.9s' }}></div>
        <div className="twinkle-star" style={{ top: '80%', left: '70%', animationDelay: '1.2s', animationDuration: '2.1s' }}></div>
        <div className="twinkle-star" style={{ top: '35%', left: '5%', animationDelay: '1.4s', animationDuration: '1.7s' }}></div>
        {/* Added Stars */}
        <div className="twinkle-star" style={{ top: '15%', left: '30%', animationDelay: '0.1s', animationDuration: '2.0s' }}></div>
        <div className="twinkle-star" style={{ top: '20%', left: '70%', animationDelay: '0.3s', animationDuration: '1.6s' }}></div>
        <div className="twinkle-star" style={{ top: '12%', left: '90%', animationDelay: '0.5s', animationDuration: '2.4s' }}></div>
        <div className="twinkle-star" style={{ top: '30%', left: '25%', animationDelay: '0.7s', animationDuration: '1.9s' }}></div>
        <div className="twinkle-star" style={{ top: '8%', left: '65%', animationDelay: '0.9s', animationDuration: '2.6s' }}></div>
        <div className="twinkle-star" style={{ top: '40%', left: '55%', animationDelay: '1.1s', animationDuration: '2.3s' }}></div>
        {/* More stars for the top area */}
        <div className="twinkle-star" style={{ top: '8%', left: '22%', animationDelay: '1.3s', animationDuration: '1.8s' }}></div>
        <div className="twinkle-star" style={{ top: '18%', left: '58%', animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
        <div className="twinkle-star" style={{ top: '28%', left: '8%', animationDelay: '1.7s', animationDuration: '2.1s' }}></div>
        <div className="twinkle-star" style={{ top: '38%', left: '78%', animationDelay: '1.9s', animationDuration: '1.6s' }}></div>
        <div className="twinkle-star" style={{ top: '2%', left: '50%', animationDelay: '2.1s', animationDuration: '2.9s' }}></div>
        <div className="twinkle-star" style={{ top: '22%', left: '95%', animationDelay: '2.3s', animationDuration: '1.7s' }}></div>
        <div className="twinkle-star" style={{ top: '32%', left: '35%', animationDelay: '2.5s', animationDuration: '2.2s' }}></div>
        <div className="twinkle-star" style={{ top: '14%', left: '45%', animationDelay: '2.7s', animationDuration: '2.0s' }}></div>
        <div className="twinkle-star" style={{ top: '26%', left: '15%', animationDelay: '2.9s', animationDuration: '1.5s' }}></div>
        <div className="twinkle-star" style={{ top: '36%', left: '88%', animationDelay: '3.1s', animationDuration: '2.7s' }}></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(56,16,124,0.3),rgba(0,0,0,0))] z-0"></div>

      {/* Header */}
      <header
        className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-20 animate-fade-in-down"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="text-2xl font-bold tracking-wider font-saira">Suvo</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-full border border-white/30 bg-transparent px-5 py-2 text-sm font-semibold hover:bg-white/10 transition-colors duration-300"
        >
          Login
        </button>
      </header>

      {/* Main Content */}
      <main className="z-10 flex flex-col items-center justify-center text-center h-full w-full">
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          <h1
            className="text-6xl md:text-8xl font-bold tracking-normal text-white"
          >
             {titlePart1.split(' ').map((word, index) => (
              <span key={index} className="inline-block animate-fade-in-up" style={{ animationDelay: `${0.9 + index * 0.07}s` }}>
                {word}&nbsp;
              </span>
            ))}
             <span className="inline-block animate-fade-in-up font-script font-medium italic" style={{ animationDelay: `${0.9 + titlePart1.split(' ').length * 0.07}s` }}>
                {titlePart2}
             </span>
          </h1>

          <p
            className="max-w-lg text-xl text-gray-400"
          >
            {tagline.split(' ').map((word, index) => (
              <span key={index} className="inline-block animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </p>

          <div
            className="flex flex-col sm:flex-row items-center gap-5 mt-6 animate-fade-in-up"
            style={{ animationDelay: '1.5s' }}
          >
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-gray-200 px-8 py-4 text-black font-semibold hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gray-200/40 w-full sm:w-auto text-lg"
              >
                Get Started
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full border border-white/30 bg-transparent px-8 py-4 text-white font-semibold hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto flex items-center justify-center text-lg"
              >
                <TvIcon className="w-6 h-6 mr-3" />
                Watch Demo
              </button>
          </div>
        </div>
      </main>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;