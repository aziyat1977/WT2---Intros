import React, { useState } from 'react';
import { analyzeWritingPrompt } from '../services/geminiService';
import { SurgicalAnalysis } from '../types';
import TopicCard from './TopicCard';
import { Sparkles, Loader2, BrainCircuit } from 'lucide-react';

const LiveTutor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState<SurgicalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await analyzeWritingPrompt(prompt);
      setAnalysis(result);
    } catch (err) {
      setError('The tutor is currently unavailable. Please check your connection or API Key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-20">
      <div className="bg-gradient-to-r from-cambridge to-[#3a5066] text-white p-8 rounded-t-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <BrainCircuit className="text-surgical" size={32} />
          <h2 className="text-2xl font-bold">Live Surgical Tutor</h2>
        </div>
        <p className="opacity-90 max-w-2xl">
          Enter any past exam question below. The AI model, trained on the principles of "The Invisible Work," will perform the analysis and write a Band 9.0 introduction for you instantly.
        </p>
      </div>

      <div className="bg-white p-8 rounded-b-xl shadow-md border-x border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <textarea
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cambridge focus:ring-0 transition-colors font-serif text-lg resize-none min-h-[120px]"
            placeholder="Paste your IELTS Writing Task 2 Prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !prompt.trim()}
            className="bg-surgical hover:bg-red-600 text-white font-bold py-3 px-8 rounded shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Performing Surgery...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Analyze Prompt
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded">
            {error}
          </div>
        )}
      </div>

      {analysis && (
        <div className="mt-12 animate-fade-in">
           <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-gray-300 flex-grow"></div>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Analysis Results</span>
              <div className="h-px bg-gray-300 flex-grow"></div>
           </div>
           <TopicCard 
             data={analysis} 
             prompt={prompt} 
             year="Just Now" 
             isLive={true} 
            />
        </div>
      )}
    </div>
  );
};

export default LiveTutor;