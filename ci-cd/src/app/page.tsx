"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import image from "../../public/aliabbas.jpeg";



export default function BirthdayWish() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [buttonText, setButtonText] = useState('Send Birthday Wishes to Ali!');
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showWishes, setShowWishes] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const wishes = [
    "May your day be filled with laughter and joy!",
    "Wishing you success in all your endeavors!",
    "May this year bring you closer to your dreams!",
    "You're an amazing friend - enjoy your special day!",
    "Cheers to health, happiness, and prosperity!"
  ];

  useEffect(() => {
    setIsMounted(true);

    const newStars = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3}px`,
      height: `${Math.random() * 3}px`,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setStars(newStars);
  }, []);

  const handleCongratulate = () => {
    setIsCelebrating(true);
    setButtonText('🎉 HAPPY BIRTHDAY ALI! 🎉');
    setShowWishes(true);
  };

  interface Star {
    left: string;
    top: string;
    width: string;
    height: string;
    opacity: number;
  }

  type ConfettiShape = 'circle' | 'square' | 'triangle';

  interface ConfettiPiece {
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
    shape: ConfettiShape;
    delay: number;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setGlowPosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  };

  useEffect(() => {
    if (isCelebrating && isMounted) {
      const newConfetti = [];
      const shapes = ['circle', 'square', 'triangle'];
      for (let i = 0; i < 100; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 20,
          rotation: Math.random() * 360,
          color: `hsl(${Math.random() * 360}, 100%, ${50 + Math.random() * 20}%)`,
          size: 5 + Math.random() * 10,
          shape: shapes[Math.floor(Math.random() * shapes.length)] as ConfettiShape,
          delay: Math.random() * 2
        });
      }
      setConfetti(newConfetti);

      setTimeout(() => {
        setIsCelebrating(false);
      }, 5000);
      setTimeout(() => {
        setConfetti([]);
      }, 6000);
    }
  }, [isCelebrating, isMounted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading birthday celebration...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <Head>
        <title>Happy Birthday Ali Abbas!</title>
      </Head>

      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(156, 39, 176, 0.15) 0%, transparent 70%)`,
          opacity: isCelebrating ? 0.8 : 0.4
        }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            opacity: star.opacity,
            animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`
          }}
        />
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.shape === 'circle' ? 'rounded-full' : piece.shape === 'triangle' ? 'triangle' : ''}`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `fall ${3 + Math.random() * 2}s ${piece.delay}s linear forwards`,
            clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
          }}
        />
      ))}

      <div className={`max-w-6xl w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transition-all duration-1000 ${isCelebrating ? 'scale-105 ring-2 ring-purple-500' : ''}`}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Image */}
          <div className="relative group flex-shrink-0">
            <div className={`w-80 h-80 rounded-full border-4 ${isCelebrating ? 'border-purple-500' : 'border-purple-600'} overflow-hidden transition-all duration-500 ${isCelebrating ? 'scale-110 rotate-3' : ''}`}>
              <img
                src={image.src}
                alt="Ali Abbas"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className={`absolute -inset-4 rounded-full border-2 ${isCelebrating ? 'border-pink-500' : 'border-purple-400'} opacity-70 animate-ping-slow pointer-events-none`}></div>
          </div>

          {/* Text + Button */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4 animate-text-pulse">
              Happy Birthday <span className="text-white">Ali Abbas!</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              On this special day, I wish you endless happiness, tremendous success,
              and all the love your heart can hold. May this year be your best one yet!
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={handleCongratulate}
                className={`px-8 py-4 rounded-full font-bold text-white transition-all duration-500 transform ${isCelebrating
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-110 shadow-xl ring-4 ring-purple-400/50'
                  : 'bg-gradient-to-r from-purple-700 to-pink-700 hover:scale-105 hover:shadow-lg'
                  } relative overflow-hidden group`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {buttonText}
                </span>
                <span className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isCelebrating ? 'animate-button-glow' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Wishes */}
        {showWishes && (
          <div className="mt-12 pt-6 border-t border-gray-700 transition-all duration-1000">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4 text-center">Birthday Wishes for Ali</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishes.map((wish, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg bg-gray-700 bg-opacity-50 backdrop-blur-sm border-l-4 ${index % 3 === 0 ? 'border-purple-500' : index % 3 === 1 ? 'border-pink-500' : 'border-blue-500'} transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-70`}
                  style={{
                    animation: `fadeInUp ${0.5 + index * 0.2}s ease-out forwards`,
                    opacity: 0
                  }}
                >
                  <p className="text-gray-200">{wish}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Balloons */}
      {isCelebrating && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="absolute balloon"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: '-50px',
                width: '40px',
                height: '50px',
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animation: `floatUp ${4 + Math.random() * 3}s ease-in forwards`,
                animationDelay: `${Math.random() * 2}s`,
                zIndex: 10
              }}
            >
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gray-400"></div>
            </div>
          ))}
        </>
      )}

      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-120vh) rotate(360deg); }
        }
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes text-pulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes button-glow {
          0% { box-shadow: 0 0 5px rgba(192, 132, 252, 0); }
          50% { box-shadow: 0 0 20px rgba(192, 132, 252, 0.7); }
          100% { box-shadow: 0 0 5px rgba(192, 132, 252, 0); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          70%, 100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-text-pulse {
          animation: text-pulse 6s ease infinite;
          background-size: 200% 200%;
        }
        .animate-button-glow {
          animation: button-glow 2s infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .balloon::before {
          content: '';
          position: absolute;
          width: 6px;
          height: 8px;
          background-color: inherit;
          border-radius: 50%;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
}
