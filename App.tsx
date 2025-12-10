import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, X, Play, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { STATIC_TOPICS } from './constants';
import { StaticTopic } from './types';

// --- TYPES FOR SLIDES ---
type SlideType = 'cover' | 'prompt' | 'trap' | 'logic' | 'intro' | 'quiz' | 'gap' | 'done';

interface Slide {
  type: SlideType;
  title?: string;
  content: string[]; // Each string is a "line"
  accent?: string;
  data?: any; // For interactive elements
}

// --- UTILS ---
const generateSlides = (topic: StaticTopic): Slide[] => {
  const slides: Slide[] = [];

  // 1. Cover
  slides.push({
    type: 'cover',
    title: topic.year,
    content: [topic.topicTitle],
  });

  // 2. Prompt (Split if long)
  // Simple heuristic: just show it as one big block, but we treat sentences as lines for the "3 lines" rule visual
  slides.push({
    type: 'prompt',
    title: "The Task",
    content: [topic.prompt],
  });

  // 3. The Trap
  slides.push({
    type: 'trap',
    title: "⚠️ The Trap",
    content: [topic.theTrap],
    accent: 'text-surgical'
  });

  // 4. Specific Question
  slides.push({
    type: 'logic',
    title: "The Invisible Work",
    content: ["What is the specific question?", topic.specificQuestion],
  });

  // 5. Logic Map A
  slides.push({
    type: 'logic',
    title: "Logic Map: View A",
    content: [topic.logicMap.viewA],
  });

  // 6. Logic Map B
  slides.push({
    type: 'logic',
    title: "Logic Map: View B",
    content: [topic.logicMap.viewB],
  });

  // 7. My Position
  slides.push({
    type: 'logic',
    title: "My Position",
    content: [topic.logicMap.position],
    accent: 'text-surgical'
  });

  // 8. Intro (Split into chunks for readability)
  // We'll split by sentence roughly
  const introSentences = topic.introduction.match(/[^.!?]+[.!?]+/g) || [topic.introduction];
  
  introSentences.forEach((sentence, index) => {
    slides.push({
      type: 'intro',
      title: index === 0 ? "Surgical Introduction" : "Continuing...",
      content: [sentence.trim()],
    });
  });

  // 9. Practice - Logic
  if (topic.practice) {
    slides.push({
      type: 'quiz',
      title: "Quick Check: Logic",
      content: [topic.practice.logic.question],
      data: topic.practice.logic
    });

    // 10. Practice - Trap
    slides.push({
      type: 'quiz',
      title: "Quick Check: The Trap",
      content: [topic.practice.trap.question],
      data: topic.practice.trap
    });
    
    // 11. Practice - Gap
    slides.push({
       type: 'gap',
       title: "Vocabulary Gap Fill",
       content: ["Fill in the missing words."],
       data: topic.practice.gap
    });
  }

  // 12. Done
  slides.push({
    type: 'done',
    title: "Module Complete",
    content: ["You have mastered this topic.", "Ready for the next?"],
  });

  return slides;
};

// --- COMPONENTS ---

const MenuScreen: React.FC<{ onSelect: (t: StaticTopic) => void }> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-serif font-black text-cambridge mb-2 tracking-tighter">
          Invisible
          <span className="block text-surgical">Work.</span>
        </h1>
        <p className="text-gray-500 font-sans text-lg mb-12 tracking-wide uppercase">Pauline Cullen Method • 2025 Edition</p>
        
        <div className="space-y-4">
          {STATIC_TOPICS.map((topic, idx) => (
            <button
              key={topic.id}
              onClick={() => onSelect(topic)}
              className="group w-full text-left p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-surgical/20 transition-all duration-500 rounded-xl flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Module 0{idx + 1}</span>
                <h3 className="text-3xl font-serif font-bold text-cambridge group-hover:text-surgical transition-colors">
                  {topic.topicTitle}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-surgical group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SlideView: React.FC<{ slide: Slide; onNext: () => void }> = ({ slide, onNext }) => {
  // Reset interaction state when slide changes
  const [interacted, setInteracted] = useState(false);
  const [gapInput, setGapInput] = useState<string[]>([]);
  
  // Re-run effect when slide changes
  useEffect(() => {
    setInteracted(false);
    setGapInput([]);
  }, [slide]);

  const isInteractive = slide.type === 'quiz' || slide.type === 'gap';

  const handleQuizOption = (option: string) => {
    if (interacted) return;
    setInteracted(true);
    // Auto advance if correct after a delay? Or let user click next.
    // We'll let user click next to read explanation (answer)
  };

  const renderContent = () => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="text-center">
            <span className="inline-block text-surgical font-bold tracking-widest uppercase mb-6 text-sm animate-fade-in">{slide.title}</span>
            <h2 className="text-7xl md:text-8xl font-serif font-black text-cambridge leading-[0.9] mb-8 animate-fade-in-up">
              {slide.content[0]}
            </h2>
          </div>
        );
      
      case 'prompt':
         return (
          <div className="max-w-2xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">{slide.title}</h3>
            <p className="text-4xl md:text-5xl font-serif leading-tight text-cambridge text-center animate-fade-in-up">
              "{slide.content[0]}"
            </p>
          </div>
         );

      case 'trap':
        return (
          <div className="max-w-3xl border-l-8 border-surgical pl-10 py-4 animate-fade-in-up bg-red-50/50">
            <h3 className="text-2xl font-bold text-surgical uppercase tracking-widest mb-6">{slide.title}</h3>
            <p className="text-4xl md:text-5xl font-serif font-bold text-cambridge leading-tight">
              {slide.content[0]}
            </p>
          </div>
        );

      case 'quiz':
        return (
          <div className="max-w-2xl w-full animate-fade-in-up">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">{slide.title}</h3>
             <p className="text-3xl font-serif text-cambridge text-center mb-12 font-bold">{slide.content[0]}</p>
             
             <div className="space-y-3">
               {slide.data.options.map((opt: string, idx: number) => {
                 const isCorrect = opt === slide.data.answer;
                 const isSelected = interacted; // Simplified logic: show answer immediately on any click
                 
                 let btnClass = "w-full p-6 text-left text-xl rounded-xl border-2 transition-all duration-300 font-medium ";
                 if (!interacted) {
                    btnClass += "border-gray-200 hover:border-cambridge hover:bg-white bg-transparent text-gray-600";
                 } else if (opt.includes(slide.data.answer) || slide.data.answer.includes(opt)) {
                    // Note: Simple string matching might fail if answer text is different from option text.
                    // Based on constants, answer is usually full text description. 
                    // Let's assume the answer in constants usually *is* the full correct option text or explains it.
                    // For safety in this prompt structure, we will highlight the Correct Answer box provided in data
                    btnClass += "border-gray-200 opacity-50"; 
                 } else {
                    btnClass += "border-gray-200 opacity-50";
                 }
                 
                 // We need to match loosely because constants format varies. 
                 // Actually, let's just show the specific ANSWER TEXT below when any is clicked.
                 return (
                   <button 
                    key={idx} 
                    onClick={() => handleQuizOption(opt)}
                    className={btnClass}
                   >
                     {opt}
                   </button>
                 )
               })}
             </div>

             {interacted && (
               <div className="mt-8 p-6 bg-success/10 border border-success rounded-xl text-success animate-fade-in-up">
                 <div className="flex items-start gap-3">
                    <CheckCircle2 className="shrink-0 mt-1" />
                    <p className="text-lg font-bold">{slide.data.answer}</p>
                 </div>
               </div>
             )}
          </div>
        )

      case 'gap':
        // Simplified Gap Fill for "Big Font" mode
        return (
           <div className="max-w-3xl w-full animate-fade-in-up">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">{slide.title}</h3>
              <div className="text-3xl font-serif leading-relaxed text-center text-gray-700">
                {slide.data.textParts.map((part: string, i: number) => (
                  <span key={i}>
                    {part}
                    {i < slide.data.textParts.length - 1 && (
                      <span className="inline-block border-b-2 border-cambridge min-w-[100px] text-surgical font-bold px-2">
                        {interacted ? slide.data.answers[i] : "?"}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              {!interacted && (
                <div className="mt-12 text-center">
                  <button onClick={() => setInteracted(true)} className="bg-cambridge text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-surgical transition-colors">
                    Reveal Answers
                  </button>
                </div>
              )}
           </div>
        );

      case 'intro':
        return (
          <div className="max-w-3xl">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">{slide.title}</h3>
             <p className="text-4xl md:text-5xl font-serif leading-tight text-cambridge text-center animate-fade-in-up" 
                dangerouslySetInnerHTML={{ __html: slide.content[0].replace(/\*\*(.*?)\*\*/g, '<span class="text-surgical">$1</span>') }}>
             </p>
          </div>
        );

      default:
        return (
          <div className="max-w-2xl text-center">
            {slide.title && <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">{slide.title}</h3>}
            {slide.content.map((line, i) => (
              <p key={i} className={`text-4xl md:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-in-up ${slide.accent || 'text-cambridge'}`} style={{animationDelay: `${i * 0.1}s`}}>
                {line}
              </p>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col relative overflow-hidden">
       {/* Progress Bar */}
       <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 z-10">
          <div className="h-full bg-cambridge transition-all duration-300" style={{ width: `${(onNext ? 0 : 100)}%` }}></div> {/* Handled by parent really */}
       </div>

       {/* Content Area */}
       <div className="flex-grow flex flex-col justify-center items-center p-8 z-0 cursor-pointer" onClick={() => !isInteractive && onNext()}>
          {renderContent()}
          {!isInteractive && (
             <div className="fixed bottom-10 animate-bounce text-gray-300 text-sm font-bold uppercase tracking-widest">
               Tap to continue
             </div>
          )}
          {isInteractive && interacted && (
             <button onClick={onNext} className="mt-8 flex items-center gap-2 text-cambridge font-bold uppercase tracking-widest hover:text-surgical transition-colors animate-pulse-slow">
               Next Slide <ChevronRight size={20} />
             </button>
          )}
       </div>
    </div>
  );
};

const LessonPlayer: React.FC<{ topic: StaticTopic; onClose: () => void }> = ({ topic, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = React.useMemo(() => generateSlides(topic), [topic]);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-paper">
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
        <div className="h-full bg-surgical transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 bg-white/50 rounded-full hover:bg-white text-cambridge hover:text-red-500 transition-all"
      >
        <X size={24} />
      </button>

      {/* Slide Render */}
      <SlideView 
        key={currentSlideIndex} // Key forces re-render for animation reset
        slide={slides[currentSlideIndex]} 
        onNext={handleNext} 
      />
    </div>
  );
};

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<StaticTopic | null>(null);

  return (
    <>
      {activeTopic ? (
        <LessonPlayer topic={activeTopic} onClose={() => setActiveTopic(null)} />
      ) : (
        <MenuScreen onSelect={setActiveTopic} />
      )}
    </>
  );
};

export default App;