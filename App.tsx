import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowRight, X, Lock, Unlock, CheckCircle2, 
  BrainCircuit, Trophy, Star, Moon, Sun, Globe
} from 'lucide-react';
import { STATIC_TOPICS, UI_LABELS } from './constants';
import { StaticTopic, Slide, SlideTheme, UserProgress, Language } from './types';

// --- UTILS ---

const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return offset;
};

const Reveal: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-20 blur-sm'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- TRANSLATION HELPER ---
const getTranslatedLine = (text: string, lang: Language, topic: StaticTopic): string => {
  if (lang === 'en') return text;
  // Try to find exact line match
  const transMap = lang === 'ru' ? topic.translations?.ru?.lines : topic.translations?.uz?.lines;
  if (transMap && transMap[text]) return transMap[text];
  
  // Try structural fallback for known big blocks
  if (text === topic.topicTitle) return (lang === 'ru' ? topic.translations?.ru?.topicTitle : topic.translations?.uz?.topicTitle) || text;
  if (text === topic.prompt) return (lang === 'ru' ? topic.translations?.ru?.prompt : topic.translations?.uz?.prompt) || text;
  if (text === topic.theTrap) return (lang === 'ru' ? topic.translations?.ru?.theTrap : topic.translations?.uz?.theTrap) || text;
  if (text === topic.specificQuestion) return (lang === 'ru' ? topic.translations?.ru?.specificQuestion : topic.translations?.uz?.specificQuestion) || text;

  // Logic Maps
  if (text === topic.logicMap.viewA) return (lang === 'ru' ? topic.translations?.ru?.logicMap?.viewA : topic.translations?.uz?.logicMap?.viewA) || text;
  if (text === topic.logicMap.viewB) return (lang === 'ru' ? topic.translations?.ru?.logicMap?.viewB : topic.translations?.uz?.logicMap?.viewB) || text;
  if (text === topic.logicMap.position) return (lang === 'ru' ? topic.translations?.ru?.logicMap?.position : topic.translations?.uz?.logicMap?.position) || text;

  // Fallback
  return text;
};

// --- SLIDE GENERATOR ---
const generateJourney = (topic: StaticTopic): Slide[] => {
  const slides: Slide[] = [];
  let id = 0;
  const add = (s: Partial<Slide>) => slides.push({ id: `s-${id++}`, type: 'text', theme: 'neutral', lines: [], ...s } as Slide);

  // 1. Cover
  add({ type: 'cover', theme: 'neutral', overline: "Module 0" + topic.id, title: topic.topicTitle, lines: ["The Invisible Work", "2025 Edition"] });

  // 2. The Task
  add({ theme: 'neutral', overline: "The Task", title: "Analyze Prompt", lines: [topic.prompt] });

  // 3. The Trap
  add({ theme: 'trap', overline: "Warning", title: "The Trap", lines: ["Most students write:", `"${topic.theTrap}"`, "This limits you to Band 6.0."] });
  
  // >> QUIZ: TRAP <<
  if (topic.practice) add({ type: 'interactive', theme: 'trap', title: "Check: The Trap", data: { type: 'quiz', ...topic.practice.trap } });

  // 4. The Shift
  add({ theme: 'logic', overline: "The Shift", title: "Invisible Work", lines: ["Stop writing.", "Start thinking.", "Find the specific question."] });

  // 5. Specific Question
  add({ theme: 'logic', overline: "Precision", title: "Specific Question", lines: [topic.specificQuestion] });

  // 6. Logic Map A/B/Pos
  add({ theme: 'logic', overline: "Logic Map", title: "View A", lines: [topic.logicMap.viewA] });
  add({ theme: 'logic', overline: "Logic Map", title: "View B", lines: [topic.logicMap.viewB] });
  add({ theme: 'logic', overline: "Critical Thinking", title: "My Position", lines: [topic.logicMap.position] });

  // >> QUIZ: LOGIC <<
  if (topic.practice) add({ type: 'interactive', theme: 'logic', title: "Check: Logic", data: { type: 'quiz', ...topic.practice.logic } });

  // 7. Intro
  const introSentences = topic.introduction.match(/[^.!?]+[.!?]+/g) || [topic.introduction];
  introSentences.forEach((sent, i) => {
    add({ theme: 'neutral', overline: "Surgical Introduction", title: i === 0 ? "Thesis" : "Development", lines: [sent.trim()] });
  });

  // >> QUIZ: VOCAB / GAP <<
  if (topic.practice) {
    add({ type: 'interactive', theme: 'neutral', title: "Vocab Check", data: { type: 'quiz', ...topic.practice.vocab } });
    add({ type: 'interactive', theme: 'neutral', title: "Gap Fill", data: { type: 'gap', ...topic.practice.gap } });
  }

  // 8. Reward
  add({ type: 'reward', theme: 'success', title: "Module Complete", lines: ["XP Gained: +100", "Next Level Unlocked"] });

  return slides;
};

// --- COMPONENTS ---

const KineticText: React.FC<{ lines: string[], theme: SlideTheme, lang: Language, topic: StaticTopic }> = ({ lines, theme, lang, topic }) => {
  const isDark = theme === 'trap' || theme === 'logic'; // These themes are always 'dark' background
  
  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl w-full px-4 text-center md:text-left">
      {lines.map((line, i) => {
        const text = getTranslatedLine(line, lang, topic);
        return (
          <p 
            key={i} 
            className={`
              text-3xl md:text-5xl lg:text-6xl font-serif font-black leading-[1.2] tracking-tight animate-blur-in drop-shadow-sm
              ${theme === 'trap' ? 'text-white' : theme === 'logic' ? 'text-white' : 'text-ink dark:text-gray-100'}
            `}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
};

const InteractiveModule: React.FC<{ data: any, onComplete: () => void, lang: Language }> = ({ data, onComplete, lang }) => {
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  
  const handleChoice = (opt: string) => {
    if (status === 'correct') return;
    if (data.type === 'quiz') {
       if (data.options.includes(opt)) {
         if (opt === data.answer) {
            setStatus('correct');
            setTimeout(onComplete, 1500);
         } else {
            setStatus('wrong');
            setTimeout(() => setStatus('idle'), 500);
         }
       }
    }
  };

  const labels = UI_LABELS[lang];

  if (data.type === 'gap') {
      return (
        <div className="w-full max-w-4xl animate-blur-in">
             <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-cambridge/10 dark:border-white/10 shadow-2xl">
                <p className="text-xl md:text-3xl font-serif leading-loose text-ink dark:text-gray-200 mb-10">
                    {data.textParts.map((part: string, i: number) => (
                        <span key={i}>
                            {part}
                            {i < data.textParts.length - 1 && (
                                <span className="inline-block mx-2 border-b-4 border-surgical text-surgical font-mono font-bold px-2">
                                    {status === 'correct' ? data.answers[i] : "____"}
                                </span>
                            )}
                        </span>
                    ))}
                </p>
                {status !== 'correct' && (
                    <button 
                        onClick={() => { setStatus('correct'); setTimeout(onComplete, 2000); }}
                        className="w-full py-4 bg-ink dark:bg-zinc-950 text-white font-mono text-lg font-bold uppercase tracking-widest hover:bg-surgical transition-colors rounded-xl shadow-lg"
                    >
                        {labels.reveal}
                    </button>
                )}
             </div>
        </div>
      )
  }

  return (
    <div className="w-full max-w-3xl animate-blur-in">
      <div className="mb-6 p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl backdrop-blur-sm">
         <h4 className="font-serif text-xl md:text-2xl font-bold text-ink dark:text-white text-center">{data.question}</h4>
      </div>
      <div className="grid gap-3">
        {data.options.map((opt: string, i: number) => (
          <button
            key={i}
            onClick={() => handleChoice(opt)}
            className={`
              p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.01]
              ${status === 'wrong' ? 'animate-shake border-red-500 bg-red-50 dark:bg-red-900/30' : ''}
              ${status === 'correct' && opt === data.answer ? 'border-success bg-success text-white scale-105 shadow-xl' : 'border-ink/5 dark:border-white/10 bg-white dark:bg-zinc-800 hover:border-ink dark:hover:border-white hover:shadow-lg dark:text-gray-200'}
            `}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-40 block mb-1">{labels.option} 0{i+1}</span>
            <span className="font-serif text-lg md:text-xl font-bold">{opt}</span>
          </button>
        ))}
      </div>
      {status === 'correct' && (
        <div className="mt-8 text-center animate-pop">
            <div className="inline-flex items-center gap-2 bg-success text-white px-8 py-3 rounded-full font-mono font-bold text-lg shadow-lg">
                <CheckCircle2 size={24} /> {labels.correct}
            </div>
        </div>
      )}
    </div>
  );
};

// 3. Immersive Player
const ImmersivePlayer: React.FC<{ topic: StaticTopic, onClose: (completed: boolean) => void, isDark: boolean, lang: Language, setLang: (l: Language) => void }> = ({ topic, onClose, isDark, lang, setLang }) => {
  const [idx, setIdx] = useState(0);
  const slides = useMemo(() => generateJourney(topic), [topic]);
  const slide = slides[idx];
  const [showTranslate, setShowTranslate] = useState(false); // Mobile toggle if needed

  const advance = () => {
    if (idx < slides.length - 1) {
      setIdx(prev => prev + 1);
    } else {
      onClose(true);
    }
  };

  const bgColors: Record<SlideTheme, string> = {
    neutral: 'bg-paper dark:bg-zinc-900',
    trap: 'bg-ink', 
    logic: 'bg-cambridge',
    success: 'bg-success'
  };

  const labels = UI_LABELS[lang];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-700 ${bgColors[slide.theme]}`}>
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-black/10 dark:bg-white/10 z-50">
        <div className="h-full bg-surgical transition-all duration-500" style={{ width: `${((idx + 1) / slides.length) * 100}%` }} />
      </div>

      <div className="absolute top-6 right-6 z-50 flex gap-2">
         {/* Language Toggle in Player */}
         <div className="flex bg-black/10 dark:bg-white/10 rounded-full p-1 backdrop-blur-md">
            {(['en', 'ru', 'uz'] as Language[]).map(l => (
              <button 
                key={l}
                onClick={(e) => { e.stopPropagation(); setLang(l); }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? 'bg-white text-ink shadow-sm' : 'text-white/50 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
         </div>
         <button onClick={(e) => { e.stopPropagation(); onClose(false); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md">
            <X size={20} />
         </button>
      </div>

      {/* Main Stage */}
      <div 
        className="flex-grow flex flex-col justify-center items-center p-6 md:p-12 cursor-pointer relative"
        onClick={() => slide.type !== 'interactive' && advance()}
      >
         {/* Overline */}
         <span className={`absolute top-24 font-mono text-xs uppercase tracking-[0.2em] animate-enter-slide ${slide.theme === 'neutral' ? 'text-ink/40 dark:text-gray-500' : 'text-white/60'}`}>
            {getTranslatedLine(slide.overline || "Module " + topic.id, lang, topic)}
         </span>

         {/* Title */}
         {slide.title && (
             <h2 className={`text-sm md:text-lg font-bold uppercase tracking-widest mb-8 md:mb-16 animate-enter-slide ${slide.theme === 'trap' ? 'text-surgical' : slide.theme === 'neutral' ? 'text-surgical' : 'text-white/90'}`}>
                 {getTranslatedLine(slide.title, lang, topic)}
             </h2>
         )}

         {/* Content */}
         {slide.type === 'text' || slide.type === 'cover' ? (
             <KineticText lines={slide.lines} theme={slide.theme} lang={lang} topic={topic} />
         ) : slide.type === 'interactive' ? (
             <InteractiveModule data={slide.data} onComplete={advance} lang={lang} />
         ) : (
             <div className="text-center animate-pop text-white">
                 <Trophy size={100} className="mx-auto mb-8 text-yellow-300 animate-float drop-shadow-lg" />
                 <h1 className="text-5xl md:text-8xl font-serif font-black mb-6">{getTranslatedLine(slide.lines[0], lang, topic)}</h1>
                 <p className="font-mono text-xl opacity-80">{getTranslatedLine(slide.lines[1], lang, topic)}</p>
                 <button className="mt-16 bg-white text-success px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                     {labels.continue}
                 </button>
             </div>
         )}

         {/* Hint */}
         {slide.type !== 'interactive' && slide.type !== 'reward' && (
             <div className={`fixed bottom-10 font-mono text-xs uppercase tracking-widest animate-pulse opacity-50 ${slide.theme === 'neutral' ? 'text-ink dark:text-white' : 'text-white'}`}>
                 {labels.tap}
             </div>
         )}
      </div>
    </div>
  );
};

// 4. World Map
const WorldMap: React.FC<{ progress: UserProgress, onSelect: (t: StaticTopic) => void, isDark: boolean, toggleDark: () => void, lang: Language, setLang: (l: Language) => void }> = ({ progress, onSelect, isDark, toggleDark, lang, setLang }) => {
    const bgParallax = useParallax(0.1);
    const labels = UI_LABELS[lang];

    return (
        <div className="min-h-screen bg-paper dark:bg-zinc-950 pb-32 relative overflow-hidden transition-colors duration-500">
            <div 
              className="bg-grid dark:bg-grid-dark absolute -top-20 -left-20 -right-20 -bottom-20 opacity-[0.04] pointer-events-none"
              style={{ transform: `translateY(${bgParallax}px)` }}
            ></div>
            
            <div className="fixed top-6 right-6 z-50 flex gap-4 items-center">
               <button onClick={toggleDark} className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md text-ink dark:text-white hover:scale-110 transition-transform">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               <div className="flex bg-white dark:bg-zinc-800 rounded-full p-1 shadow-md">
                  {(['en', 'ru', 'uz'] as Language[]).map(l => (
                    <button 
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? 'bg-surgical text-white shadow-sm' : 'text-ink/50 dark:text-white/50 hover:text-ink dark:hover:text-white'}`}
                    >
                      {l}
                    </button>
                  ))}
               </div>
            </div>

            <header className="pt-32 pb-24 px-8 max-w-5xl mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-6 animate-blur-in">
                    <div className="w-3 h-3 bg-surgical rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/40 dark:text-gray-500">Pauline Cullen Method</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-serif font-black text-ink dark:text-gray-100 mb-8 tracking-tighter leading-[0.85] animate-blur-in delay-100">
                    The <br/> <span className="text-surgical">Invisible</span> Work
                </h1>
                <div className="flex gap-8 font-mono text-sm text-ink/60 dark:text-gray-400 animate-blur-in delay-200">
                    <span className="flex items-center gap-2"><Star size={16} className="text-yellow-500" /> {labels.level} {progress.completedModules.length + 1}</span>
                    <span className="flex items-center gap-2"><BrainCircuit size={16} /> {progress.completedModules.length * 100} {labels.xp}</span>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-6 space-y-24 relative z-20">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ink/10 dark:via-white/10 to-transparent -translate-x-1/2 z-0 hidden md:block"></div>

                {STATIC_TOPICS.map((topic, i) => {
                    const isLocked = i > 0 && !progress.completedModules.includes(STATIC_TOPICS[i-1].id);
                    const isCompleted = progress.completedModules.includes(topic.id);
                    
                    return (
                        <Reveal key={topic.id} delay={i * 100}>
                          <div className="relative z-10 flex flex-col items-center group">
                              <button
                                  onClick={() => !isLocked && onSelect(topic)}
                                  disabled={isLocked}
                                  className={`
                                      relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
                                      ${isLocked ? 'bg-gray-100 dark:bg-zinc-900 grayscale cursor-not-allowed opacity-60' : 'bg-white dark:bg-zinc-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer'}
                                      ${isCompleted ? 'ring-2 ring-success/30' : ''}
                                  `}
                              >
                                  <div className={`
                                      absolute -top-6 bg-white dark:bg-zinc-800 p-4 rounded-full shadow-lg border-2 transition-transform duration-500 group-hover:scale-110
                                      ${isLocked ? 'border-gray-200 dark:border-zinc-700 text-gray-400' : isCompleted ? 'border-success text-success' : 'border-ink dark:border-gray-200 text-ink dark:text-gray-200'}
                                  `}>
                                      {isLocked ? <Lock size={24} /> : isCompleted ? <CheckCircle2 size={24} /> : <Unlock size={24} />}
                                  </div>

                                  <span className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-40 text-ink dark:text-white">{labels.module} 0{i+1}</span>
                                  <h3 className="text-4xl md:text-5xl font-serif font-black text-center text-ink dark:text-gray-100 group-hover:text-cambridge dark:group-hover:text-white mb-3 transition-colors">
                                      {getTranslatedLine(topic.topicTitle, lang, topic)}
                                  </h3>
                                  <p className="font-sans text-sm text-ink/50 dark:text-gray-400 font-medium tracking-wide">{topic.year}</p>

                                  {!isLocked && !isCompleted && (
                                      <div className="mt-8 flex items-center gap-2 text-surgical font-bold font-mono text-xs uppercase tracking-widest animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                          {labels.start} <ArrowRight size={14} />
                                      </div>
                                  )}
                              </button>
                          </div>
                        </Reveal>
                    );
                })}
            </div>
            
            <div className="text-center py-32 opacity-30 font-mono text-xs tracking-[0.5em] animate-pulse text-ink dark:text-white">
                GEN Z LEARNING ENGINE v3.0
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<StaticTopic | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    unlockedModules: [1],
    completedModules: []
  });
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const handleModuleComplete = (completed: boolean) => {
    if (completed && activeTopic) {
        setProgress(prev => ({
            ...prev,
            completedModules: [...new Set([...prev.completedModules, activeTopic.id])]
        }));
    }
    setActiveTopic(null);
  };

  return (
    <>
      {activeTopic ? (
        <ImmersivePlayer topic={activeTopic} onClose={handleModuleComplete} isDark={isDark} lang={lang} setLang={setLang} />
      ) : (
        <WorldMap progress={progress} onSelect={setActiveTopic} isDark={isDark} toggleDark={() => setIsDark(!isDark)} lang={lang} setLang={setLang} />
      )}
    </>
  );
};

export default App;