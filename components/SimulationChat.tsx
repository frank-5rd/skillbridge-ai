'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function SimulationChat({ scenario, sessionId, onComplete }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // رسالة البداية من AI
    setMessages([
      {
        role: 'ai',
        content: scenario.initialMessage,
      },
    ]);
  }, [scenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isComplete) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          scenario: scenario,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);

      // حفظ المحادثة للتقرير
      localStorage.setItem(`session_${sessionId}`, JSON.stringify([
        ...messages,
        { role: 'user', content: userMessage },
        { role: 'ai', content: data.reply }
      ]));

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'حدث خطأ. حاول مرة أخرى.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const endSimulation = () => {
    setIsComplete(true);
    onComplete();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.role === 'user'
                  ? 'bg-primary rounded-tr-sm'
                  : 'bg-gray-700 rounded-tl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-2xl rounded-tl-sm p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-700 p-4 bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب ردك هنا..."
            className="flex-1 bg-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading || isComplete}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || isComplete || !input.trim()}
            className="bg-primary hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded-lg font-bold transition"
          >
            إرسال
          </button>
          <button
            onClick={endSimulation}
            className="bg-danger hover:bg-red-600 px-4 rounded-lg transition"
          >
            إنهاء
          </button>
        </div>
      </div>
    </div>
  );
}