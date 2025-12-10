import React, { useState } from 'react';
import { SurgicalAnalysis } from '../types';
import { AlertTriangle, ArrowRight, CheckCircle2, FlaskConical, HelpCircle } from 'lucide-react';

interface TopicCardProps {
  data: SurgicalAnalysis;
  prompt: string;
  year?: string;
  isLive?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ data, prompt, year, isLive = false }) => {
  const [revealed, setRevealed] = useState<{ [key: string]: boolean }>({});

  const toggleReveal = (key: string) => {
    setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`bg-white mb-12 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border ${isLive ? 'border-surgical/30' : 'border-transparent'}`}>
      <div className={`${isLive ? 'bg-surgical' : 'bg-cambridge'} text-white px-8 py-5 flex justify-between items-center`}>
        <span className="text-xl font-bold">{data.topicTitle}</span>
        <span className="bg-white/20 px-3 py-1 rounded text-sm font-medium backdrop-blur-sm">
          {year || "Live Analysis"}
        </span>
      </div>
      
      <div className="p-8">
        {/* The Prompt */}
        <div className="bg-highlight p-6 rounded-lg font-serif italic mb-8 border-l-4 border-[#4a90e2] text-gray-700">
          "{prompt}"
        </div>

        {/* The Invisible Work Container */}
        <div className="bg-greybg border border-dashed border-gray-400 p-6 mb-8 relative rounded">
          <span className="absolute -top-3 left-5 bg-surgical text-white px-3 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">
            The Invisible Work
          </span>
          
          <div className="flex items-start gap-2 text-surgical font-bold mb-4 mt-2">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <span>THE TRAP: {data.theTrap}</span>
          </div>

          <div className="mb-4 text-cambridge">
            <strong>Specific Question:</strong> {data.specificQuestion}
          </div>

          <div className="bg-white p-5 rounded border border-gray-200">
            <h4 className="font-bold text-cambridge mb-3 border-b pb-2">Logic Map:</h4>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <ArrowRight className="text-cambridge shrink-0" size={18} />
                <span><strong className="text-gray-900">View A / Agree:</strong> {data.logicMap.viewA}</span>
              </li>
              <li className="flex gap-3">
                <ArrowRight className="text-cambridge shrink-0" size={18} />
                <span><strong className="text-gray-900">View B / Disagree:</strong> {data.logicMap.viewB}</span>
              </li>
              <li className="flex gap-3">
                <ArrowRight className="text-cambridge shrink-0" size={18} />
                <span><strong className="text-surgical">My Position:</strong> {data.logicMap.position}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The Surgical Intro */}
        <div className="border-l-4 border-cambridge pl-6 py-2 mb-10">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">The Surgical Introduction</h4>
          <p className="font-serif text-lg text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.introduction.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>

        {/* Surgical Practice Chamber */}
        {data.practice && (
          <div className="border-t-2 border-gray-100 pt-8">
            <h3 className="text-lg font-extrabold text-cambridge uppercase tracking-wider mb-6 flex items-center gap-2">
              <FlaskConical className="text-surgical" /> Surgical Practice Chamber
            </h3>

            {/* Test: Logic & Structure */}
            <div className="bg-[#fcfcfc] border border-gray-200 rounded-lg p-5 mb-5">
              <span className="block text-sm font-bold text-surgical mb-2 uppercase">Test: Logic & Structure</span>
              <p className="mb-4 font-medium text-gray-800">{data.practice.logic.question}</p>
              <ul className="space-y-2 mb-4">
                {data.practice.logic.options.map((opt, idx) => (
                  <li key={idx} className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer text-sm transition-colors">{opt}</li>
                ))}
              </ul>
              <button 
                onClick={() => toggleReveal('logic')}
                className="bg-cambridge text-white px-4 py-2 rounded text-sm hover:bg-[#3b4e60] transition-colors"
              >
                {revealed['logic'] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {revealed['logic'] && (
                <div className="mt-4 p-3 bg-success_bg border-l-4 border-success text-success_text text-sm rounded-r animate-fade-in">
                  <strong>Correct:</strong> {data.practice.logic.answer}
                </div>
              )}
            </div>

            {/* Quiz: The Trap */}
            <div className="bg-[#fcfcfc] border border-gray-200 rounded-lg p-5 mb-5">
              <span className="block text-sm font-bold text-surgical mb-2 uppercase">Quiz: The Trap</span>
              <p className="mb-4 font-medium text-gray-800">{data.practice.trap.question}</p>
              <ul className="space-y-2 mb-4">
                {data.practice.trap.options.map((opt, idx) => (
                  <li key={idx} className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer text-sm transition-colors">{opt}</li>
                ))}
              </ul>
              <button 
                onClick={() => toggleReveal('trap')}
                className="bg-cambridge text-white px-4 py-2 rounded text-sm hover:bg-[#3b4e60] transition-colors"
              >
                {revealed['trap'] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {revealed['trap'] && (
                <div className="mt-4 p-3 bg-success_bg border-l-4 border-success text-success_text text-sm rounded-r animate-fade-in">
                  <strong>Correct:</strong> {data.practice.trap.answer}
                </div>
              )}
            </div>

            {/* Gap Fill */}
            <div className="bg-[#fcfcfc] border border-gray-200 rounded-lg p-5 mb-5">
              <span className="block text-sm font-bold text-surgical mb-2 uppercase">Gap Fill: Academic Vocabulary</span>
              <p className="mb-4 leading-loose text-gray-800 font-serif text-lg">
                {data.practice.gap.textParts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < data.practice.gap.answers.length && (
                      <input 
                        type="text" 
                        className="mx-1 border-b border-gray-400 bg-gray-100 w-32 px-2 py-1 text-center font-bold text-surgical focus:outline-none focus:border-cambridge"
                      />
                    )}
                  </React.Fragment>
                ))}
              </p>
              <button 
                onClick={() => toggleReveal('gap')}
                className="bg-cambridge text-white px-4 py-2 rounded text-sm hover:bg-[#3b4e60] transition-colors"
              >
                {revealed['gap'] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {revealed['gap'] && (
                <div className="mt-4 p-3 bg-success_bg border-l-4 border-success text-success_text text-sm rounded-r animate-fade-in">
                  {data.practice.gap.answers.map((ans, i) => (
                    <span key={i} className="mr-4"><strong>{i + 1}.</strong> {ans}</span>
                  ))}
                </div>
              )}
            </div>

             {/* Vocab Match */}
             <div className="bg-[#fcfcfc] border border-gray-200 rounded-lg p-5">
              <span className="block text-sm font-bold text-surgical mb-2 uppercase">Vocabulary Match</span>
              <p className="mb-4 font-medium text-gray-800">{data.practice.vocab.question}</p>
              <ul className="space-y-2 mb-4">
                {data.practice.vocab.options.map((opt, idx) => (
                  <li key={idx} className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer text-sm transition-colors">{opt}</li>
                ))}
              </ul>
              <button 
                onClick={() => toggleReveal('vocab')}
                className="bg-cambridge text-white px-4 py-2 rounded text-sm hover:bg-[#3b4e60] transition-colors"
              >
                {revealed['vocab'] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {revealed['vocab'] && (
                <div className="mt-4 p-3 bg-success_bg border-l-4 border-success text-success_text text-sm rounded-r animate-fade-in">
                  <strong>Definition:</strong> {data.practice.vocab.answer}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default TopicCard;