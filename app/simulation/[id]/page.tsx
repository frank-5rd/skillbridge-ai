'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { scenarios } from '@/lib/scenarios';
import SimulationChat from '@/components/SimulationChat';
import Timer from '@/components/Timer';

export default function SimulationPage() {
  const { id } = useParams();
  const [scenario, setScenario] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    const found = scenarios.find(s => s.id === id);
    if (found) setScenario(found);
  }, [id]);

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  if (timeUp) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold mb-4">انتهى الوقت!</h2>
          <p className="text-gray-400 mb-6">لقد انتهت المحاكاة. سيتم تحليل أدائك...</p>
          <a
            href={`/report/${sessionId}`}
            className="btn-primary inline-block"
          >
            عرض التقرير
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold">{scenario.title}</h1>
          <p className="text-sm text-red-200">{scenario.role}</p>
        </div>
        <Timer
          seconds={scenario.timeLimit * 60}
          onTimeUp={() => setTimeUp(true)}
        />
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-hidden">
        <SimulationChat
          scenario={scenario}
          sessionId={sessionId}
          onComplete={() => setTimeUp(true)}
        />
      </div>
    </div>
  );
}