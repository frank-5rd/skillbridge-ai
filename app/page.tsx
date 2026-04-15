'use client';

import { useState } from 'react';
import { scenarios } from '@/lib/scenarios';

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState(null);

  const startSimulation = (scenario: any) => {
    window.location.href = `/simulation/${scenario.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-primary">جسر الخبرة</span>
            <span className="text-gray-400"> | SkillBridge AI</span>
          </h1>
          <p className="text-center text-gray-400 mt-2">
            لا تتعلم ماذا تفعل - تعلم كيف تتصرف تحت الضغط
          </p>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-400 font-bold">⚡ تحدي حقيقي - المدير ينتظرك</p>
          </div>
          <h2 className="text-5xl font-bold mb-6">
            واجه <span className="text-primary">المدير الغاضب</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            محاكاة بالذكاء الاصطناعي - سيناريوهات واقعية من عالم العمل
          </p>
        </div>
      </section>

      {/* Scenarios */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-center mb-8">اختر تحديك</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-primary transition-all duration-300 cursor-pointer"
              onClick={() => startSimulation(scenario)}
            >
              <div className="text-4xl mb-4">{scenario.icon}</div>
              <h4 className="text-xl font-bold mb-2">{scenario.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{scenario.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-danger">⏱ {scenario.timeLimit} دقيقة</span>
                <span className="text-primary">🎭 {scenario.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-black/30 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-4xl mb-3">🎭</div>
              <h4 className="font-bold mb-2">AI يتفاعل معك</h4>
              <p className="text-gray-400 text-sm">مدير غاضب، عميل صعب، زميل متعثر</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⏱️</div>
              <h4 className="font-bold mb-2">ضغط الوقت الحقيقي</h4>
              <p className="text-gray-400 text-sm">عدّاد يزيد التوتر كما في الواقع</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold mb-2">تقرير شخصي</h4>
              <p className="text-gray-400 text-sm">نقاط قوتك وضعفك السلوكية</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}