'use client';

import { useState, useEffect } from 'react';

export default function Timer({ seconds, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const getColor = () => {
    if (timeLeft < 30) return 'text-red-500';
    if (timeLeft < 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className={`font-mono text-2xl font-bold ${getColor()}`}>
      {minutes.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </div>
  );
}