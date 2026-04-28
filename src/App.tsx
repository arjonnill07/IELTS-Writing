/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity, 
  PieChart as PieIcon, 
  Volume2, 
  Play,
  ChevronRight,
  Info,
  Map as MapIcon,
  Columns as BarIcon,
  Table as TableIcon,
  RefreshCw,
  Zap,
  Search,
  Link as LinkIcon,
  Target
} from 'lucide-react';
import { VOCABULARY_DATA, VocabularyWord, ChartType } from './data/vocabulary';
import { CONNECTIVES_DATA, Connective } from './data/connectives';

// --- Components ---

const TrendVisualizer = ({ type, word, category, isAnimating }: { type: string, word: string, category: ChartType[], isAnimating: boolean }) => {
  const getLinePath = () => {
    switch (type) {
      case 'Fast Rise': return "M 10 90 Q 50 85 90 10";
      case 'Steady Rise': return "M 10 90 L 90 10";
      case 'Fast Fall': return "M 10 10 Q 50 15 90 90";
      case 'Steady Fall': return "M 10 10 L 90 90";
      case 'Plateau': return "M 10 70 L 40 30 L 90 30";
      case 'Fluctuation': return "M 10 50 L 25 30 L 40 70 L 55 20 L 70 80 L 90 50";
      case 'Peak': return "M 10 80 L 50 10 L 90 80";
      case 'Trough': return "M 10 20 L 50 90 L 90 20";
      default: return "M 10 50 L 90 50";
    }
  };

  // 1. PIE CHART VISUAL
  if (category.includes('PIE_CHART')) {
    const isMajor = type === 'Proportion' || word.includes('share') || word.includes('majority');
    return (
      <div className="relative w-full h-full bg-white/40 border border-ink/10 rounded-xl flex items-center justify-center p-8 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" strokeOpacity="0.1" />
          <motion.circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="12"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={isAnimating ? { strokeDashoffset: isMajor ? 62.8 : 188.4 } : { strokeDashoffset: 251.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
           <motion.span 
             initial={{ opacity: 0 }}
             animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
             className="text-[10px] font-black uppercase tracking-widest text-accent"
           >
             {isMajor ? '75%' : '25%'}
           </motion.span>
        </div>
      </div>
    );
  }

  // 2. MAP VISUAL
  if (category.includes('MAP')) {
    return (
      <div className="relative w-full h-full bg-white/40 border border-ink/10 rounded-xl flex items-center justify-center p-8 overflow-hidden">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-64 h-64 opacity-10">
          {Array.from({ length: 16 }).map((_, i) => <div key={i} className="bg-ink rounded-sm" />)}
        </div>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-ink/5 rounded-2xl border-2 border-ink/10" />
            {type === 'Map Change' ? (
              <motion.div 
                className="absolute inset-4 bg-accent/20 border-2 border-accent rounded-xl flex items-center justify-center p-4 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isAnimating ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="text-accent animate-spin-slow" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent leading-none">{word}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ pathLength: 0 }}
                animate={isAnimating ? { pathLength: 1 } : { pathLength: 0 }}
              >
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="5 5" />
                    <motion.circle 
                      cx="50" cy="50" r="35" fill="var(--color-accent)" fillOpacity="0.1" 
                      initial={{ scale: 0 }}
                      animate={isAnimating ? { scale: 1 } : { scale: 0 }}
                    />
                 </svg>
                 <MapIcon size={24} className="absolute text-accent" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. BAR CHART VISUAL (for Comparison or Bar Specific)
  if (category.includes('BAR_CHART') && (type === 'Comparison' || type === 'Fast Rise' || type === 'Fast Fall')) {
    return (
      <div className="relative w-full h-full bg-white/40 border border-ink/10 rounded-xl overflow-hidden flex items-end justify-around p-12">
        <div className="flex flex-col items-center gap-3">
           <motion.div 
             initial={{ height: 0 }}
             animate={isAnimating ? { height: 120 } : { height: 0 }}
             className="w-14 bg-ink/10 rounded-t-xl border border-ink/5"
           />
           <span className="text-[9px] font-black opacity-20 uppercase tracking-tighter">A</span>
        </div>
        <div className="flex flex-col items-center gap-3">
           <motion.div 
             initial={{ height: 0 }}
             animate={isAnimating ? { height: type === 'Fast Fall' ? 60 : 220 } : { height: 0 }}
             className="w-14 bg-accent rounded-t-xl shadow-2xl relative"
           >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-accent font-black text-[10px]">
                {type === 'Fast Fall' ? '▼' : '▲'}
              </div>
           </motion.div>
           <span className="text-[9px] font-black text-accent uppercase tracking-tighter">B</span>
        </div>
        <div className="flex flex-col items-center gap-3">
           <motion.div 
             initial={{ height: 0 }}
             animate={isAnimating ? { height: 160 } : { height: 0 }}
             className="w-14 bg-ink/10 rounded-t-xl border border-ink/5"
           />
           <span className="text-[9px] font-black opacity-20 uppercase tracking-tighter">C</span>
        </div>
      </div>
    );
  }

  // 4. PROCESS VISUAL
  const [activeStage, setActiveStage] = useState<number | null>(null);

  if (category.includes('PROCESS')) {
    const getStageLabel = (i: number) => {
      if (i === 0) return { title: "Introduction", tip: "Use 'initiates' or 'commences' to signal the start of the sequence." };
      if (i === 1) return { title: "Transformation", tip: "Use 'undergoes' or 'is subjected to' for changes in state or material." };
      return { title: "Conclusion", tip: "Use 'culminates' or 'concludes' to wrap up the report with authority." };
    };

    return (
      <div className="relative w-full h-full bg-white/40 border border-ink/10 rounded-xl flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <motion.button
                onClick={() => setActiveStage(i === activeStage ? null : i)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isAnimating ? { 
                  scale: activeStage === i ? 1.2 : 1, 
                  opacity: 1,
                  rotate: activeStage === i ? [0, -5, 5, 0] : 0
                } : { scale: 0.8, opacity: 0 }}
                transition={{ 
                  delay: i * 0.3,
                  rotate: { duration: 0.5, repeat: activeStage === i ? Infinity : 0, repeatType: "reverse" }
                }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-[24px] flex flex-col items-center justify-center border-2 transition-all group relative ${
                  activeStage === i 
                    ? 'bg-accent border-accent text-white shadow-2xl scale-110 z-20' 
                    : ((i === 0 && word.includes('initiates')) || 
                       (i === 2 && word.includes('culminates')) ||
                       (i === 1 && word.includes('undergoes')))
                        ? 'bg-white border-accent text-accent shadow-lg animate-pulse'
                        : 'bg-white border-ink/5 text-ink/20 hover:border-accent/40 hover:text-accent/40'
                }`}
              >
                <Zap size={20} className={activeStage === i ? 'animate-bounce' : ''} />
                <span className="text-[7px] font-black uppercase mt-1">Stage {i + 1}</span>
                
                {activeStage === i && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute inset-0 bg-accent rounded-[24px] blur-xl opacity-20 -z-10"
                  />
                )}
              </motion.button>
              {i < 2 && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={isAnimating ? { width: 32, opacity: 1 } : { width: 0, opacity: 0 }}
                  transition={{ delay: i * 0.3 + 0.15 }}
                >
                  <ChevronRight className={activeStage === i ? 'text-accent' : 'text-ink/10'} />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activeStage !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] bg-ink text-white p-6 rounded-2xl shadow-2xl border border-white/10 z-30"
            >
              <div className="flex items-center gap-3 mb-2">
                <Target size={16} className="text-accent" />
                <h5 className="text-[10px] font-black uppercase tracking-widest text-accent">
                  {getStageLabel(activeStage).title} Advisor
                </h5>
              </div>
              <p className="text-xs font-medium leading-relaxed opacity-80">
                {getStageLabel(activeStage).tip}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeStage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-6 text-[9px] font-black text-ink/20 uppercase tracking-[0.2em] animate-pulse"
          >
            Click a stage to simulate transition
          </motion.div>
        )}
      </div>
    );
  }

  // 5. TABLE VISUAL
  if (category.includes('TABLE')) {
     const isGrowth = type.includes('Rise') || type.includes('Peak') || word.includes(' zenith');
     return (
       <div className="relative w-full h-full bg-white/40 border border-ink/10 rounded-xl flex items-center justify-center p-8 overflow-hidden">
         <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-ink/5 overflow-hidden">
            <div className="grid grid-cols-3 bg-ink/5 border-b border-ink/5">
               {['Metric', '2010', '2020'].map(h => <div key={h} className="p-3 text-[8px] font-black uppercase tracking-widest text-ink/40">{h}</div>)}
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className={`grid grid-cols-3 border-b border-ink/5 ${i === 2 ? 'bg-accent/5' : ''}`}>
                 <div className="p-3 text-[9px] font-bold text-ink/60 italic">Index {i}</div>
                 <div className="p-3 text-[9px] font-mono text-ink/40">120.4</div>
                 <div className="p-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -5 }}
                      animate={isAnimating && i === 2 ? { opacity: 1, x: 0 } : { opacity: 0.3 }}
                      className={`text-[9px] font-mono font-bold ${isGrowth ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {isGrowth ? '185.2 ↑' : '45.1 ↓'}
                    </motion.div>
                 </div>
              </div>
            ))}
         </div>
       </div>
     );
  }

  // 6. DEFAULT LINE VISUAL (LINE_GRAPH)
  return (
    <div className="relative w-full h-full bg-white/40 border border-ink/10 rounded-xl overflow-hidden flex items-center justify-center p-8">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.2" />
        <line x1="0" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.2" />
        
        <AnimatePresence mode="wait">
          <motion.path
            key={`${word}-${isAnimating}`}
            d={getLinePath()}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isAnimating ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </svg>
    </div>
  );
};

const VariationsSection = ({ word }: { word: VocabularyWord }) => {
  if (!word.variations || word.variations.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-[2px] bg-accent/20" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30">Alternative Perspectives</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {word.variations.map((v, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 bg-white border border-ink/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 bg-accent/5 rounded-bl-xl text-[8px] font-black uppercase tracking-widest text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              {v.perspective}
            </div>
            <p className="text-sm font-medium text-ink/70 leading-relaxed pr-8">
              "{v.sentence}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CohesionEngine = () => {
  const [activeCategory, setActiveCategory] = useState<Connective['category']>('Contrast');
  const filtered = CONNECTIVES_DATA.filter(c => c.category === activeCategory);

  return (
    <div className="mt-32">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-4 bg-ink text-white rounded-2xl">
          <LinkIcon size={32} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-display font-medium text-4xl uppercase tracking-tighter italic">The Cohesion Engine</h3>
          <p className="text-ink/40 text-sm font-medium">Link your ideas like a Band 9.0 expert.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-12 overflow-x-auto no-scrollbar pb-2">
        {(['Contrast', 'Comparison', 'Sequence', 'Result', 'Addition'] as Connective['category'][]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-accent text-white shadow-xl scale-105' 
                : 'bg-ink/5 text-ink/30 hover:bg-ink/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((c, i) => (
          <motion.div
            key={c.phrase}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 md:p-10 bg-white border border-ink/5 rounded-[32px] md:rounded-[40px] shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Professional Linker</span>
              <div className="h-px flex-1 bg-accent/20" />
            </div>
            <h4 className="text-2xl md:text-3xl font-display font-bold uppercase mb-4 text-ink">{c.phrase}</h4>
            <p className="text-sm font-medium text-ink/40 mb-8 italic">"{c.example}"</p>
            <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <Target size={14} className="text-accent mt-0.5" />
              <p className="text-[10px] font-bold text-accent/80 uppercase tracking-wide leading-relaxed">
                Expert Rule: {c.usageRule}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ParaphraseLab = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Time' | 'Quantity' | 'Structure' | 'Trend' | 'Technique'>('All');
  
  const techniques = [
    { title: "The Noun Shift", description: "Convert standard 'Verb + Adverb' structures into 'Adjective + Noun' phrases.", example: "Sales rose sharply -> A sharp rise in sales was observed." },
    { title: "Temporal Clause", description: "Replace standard 'From...to' with 'Over the period/decade in question'.", example: "From 1990 to 2000 -> Throughout the decade starting in 1990." },
    { title: "Lead Inversion", description: "Instead of starting with the category, start with the trend itself.", example: "The population grew -> Witnessing a growth of 10% was the population." },
    { title: "Synonym Replacement", description: "Replace common verbs with precise academic alternatives.", example: "Went down -> Registered a contraction / Witnessed a plummet." },
    { title: "The Passive Transformation", description: "Useful for process tasks where the focus is on the object, not the actor.", example: "Farmers collect the tea -> The tea leaves are collected by hand." },
    { title: "Adverbial Embedding", description: "Integrate manner or degree directly into the verb phrase for flow.", example: "It changed a little -> It underwent a marginal modification." },
    { title: "Nominalization", description: "Turning verbs into nouns to create more formal, objective sentence stems.", example: "The population decreased -> There was a discernible decrease in the population." },
    { title: "Relative Clause Extension", description: "Adding detail without starting a new sentence using 'which' or 'where'.", example: "The rate fell. This was unexpected -> The rate fell, which was an unexpected development." }
  ];

  const paraphrases = [
    { cat: 'Quantity', from: "The total number of residents", to: "The volume of inhabitants", tip: "Use 'volume' for people to sound more academic." },
    { cat: 'Quantity', from: "The amount of energy", to: "Energy consumption patterns", tip: "Focus on 'patterns' instead of just individual 'amounts'." },
    { cat: 'Structure', from: "The percentage of", to: "The proportion of", tip: "Alternate between these two frequently in your report." },
    { cat: 'Structure', from: "Showed/Saw", to: "Witnessed / Experienced", tip: "Objects like charts don't 'see', they 'witness' data points." },
    { cat: 'Time', from: "Between 1990 and 2000", to: "During the decade in question", tip: "Calculate durations to show mathematical synthesis." },
    { cat: 'Time', from: "Next year", to: "The subsequent year", tip: "Use 'subsequent' for progression in time series." },
    { cat: 'Trend', from: "Went up a lot", to: "Underwent a rapid escalation", tip: "Nouns like 'escalation' carry more weight than simple verbs." },
    { cat: 'Trend', from: "Stopped changing", to: "Reached a state of equilibrium", tip: "Perfect for plateau situations in industrial data." },
    { cat: 'Structure', from: "About the same", to: "Relatively negligible disparity", tip: "Use this to describe very small differences between bars." },
    { cat: 'Quantity', from: "Mostly", to: "Predominantly / The vast majority", tip: "Stronger academic adverbs for over 50% shares." },
    { cat: 'Time', from: "From start to finish", to: "Throughout the period shown", tip: "A professional opening for trend descriptions." },
    { cat: 'Trend', from: "Went down", to: "Registered a contraction", tip: "Financial graphs often 'contract' rather than just 'fall'." },
    { cat: 'Structure', from: "It was changed into", to: "It was transformed into / repurposed as", tip: "Crucial for Map tasks where buildings change function." },
    { cat: 'Quantity', from: "Smallest part", to: "A negligible minority / Marginal segment", tip: "Use for portions below 5% in pie charts." },
    { cat: 'Trend', from: "Keep going down", to: "Continued its downward trajectory", tip: "Using 'trajectory' adds a geometric precision to your English." },
    { cat: 'Structure', from: "There are four steps", to: "The process is comprised of four distinct stages", tip: "Good for the overview sentence in a process task." },
    { cat: 'Quantity', from: "A lot more", to: "A significant preponderance", tip: "A very high-level way to describe a clear majority." },
    { cat: 'Structure', from: "Old building was replaced", to: "The former structure was superseded by", tip: "A Band 9 way to describe modernization in Map tasks." },
    { cat: 'Time', from: "At the end", to: "By the terminus of the period", tip: "Professional vocabulary for the final data point." },
    { cat: 'Trend', from: "Fluctuated", to: "Exhibited a degree of volatility", tip: "Use 'volatility' for erratic or frequent changes." },
    { cat: 'Quantity', from: "Equal numbers", to: "An identical distribution", tip: "Great for comparing two equal pie slices." },
    { cat: 'Structure', from: "Goes through", to: "Permeates through the subsequent stages of", tip: "Use for liquids or materials moving through a process." },
  ];

  const filtered = activeCategory === 'All' ? paraphrases : paraphrases.filter(p => p.cat === activeCategory);

  return (
    <div id="paraphrase-lab" className="w-full bg-[#0F172A] text-white rounded-[40px] md:rounded-[60px] p-6 md:p-16 shadow-2xl relative overflow-hidden mt-12 mb-20 border border-white/5">
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/10 blur-[100px] md:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-accent text-white rounded-2xl shadow-[0_8px_30px_rgba(var(--color-accent),0.4)]">
                {activeCategory === 'Technique' ? <Zap size={28} className="md:w-8 md:h-8" /> : <RefreshCw size={28} className="md:w-8 md:h-8" />}
              </div>
              <div>
                <h3 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tighter italic">
                  {activeCategory === 'Technique' ? 'Master Techniques' : 'Topic Paraphrase Lab'}
                </h3>
                <p className="text-white/40 text-xs md:text-sm font-medium tracking-wide mt-1">
                  {activeCategory === 'Technique' ? 'Strategic frameworks for Band 9.0 complexity.' : 'Transform "Daily English" into "Academic Writing" in one click.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
            {['All', 'Quantity', 'Time', 'Structure', 'Trend', 'Technique'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`flex-shrink-0 px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  activeCategory === cat ? 'bg-accent text-white shadow-lg' : 'hover:bg-white/5 text-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {activeCategory === 'Technique' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {techniques.map((t, i) => (
               <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={t.title}
                className="p-8 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white/10 transition-colors"
               >
                 <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Method {i + 1}</span>
                 <h4 className="font-display text-2xl font-bold uppercase text-white mb-4">{t.title}</h4>
                 <p className="text-white/60 mb-6 font-medium leading-relaxed">{t.description}</p>
                 <div className="p-5 bg-ink/40 rounded-2xl border border-white/5 group-hover:border-accent/40 transition-colors">
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block mb-2">Applied Strategy</span>
                   <p className="text-sm font-mono text-white/90 italic">{t.example}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <motion.div 
                  layout
                  key={s.from}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[28px] md:rounded-[40px] flex flex-col gap-6 hover:bg-white/[0.06] hover:border-accent/40 transition-all duration-500"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20">Examiner says</span>
                    <span className="text-xs md:text-sm font-display uppercase line-through opacity-30 group-hover:opacity-10 transition-opacity">"{s.from}"</span>
                  </div>
                  
                  <div className="h-px w-8 bg-accent/30 group-hover:w-full transition-all duration-1000" />
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">You Write</span>
                    <span className="text-lg md:text-xl font-display font-bold uppercase text-white leading-tight">"{s.to}"</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                    <p className="text-[10px] font-medium text-white/40 italic leading-relaxed">
                      <Info size={10} className="inline mr-1 text-accent" /> {s.tip}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [selectedWord, setSelectedWord] = useState<VocabularyWord>(VOCABULARY_DATA[0]);
  const [activeSentence, setActiveSentence] = useState<string>(VOCABULARY_DATA[0].example);
  const [activeSynonym, setActiveSynonym] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeChart, setActiveChart] = useState<ChartType | 'ALL'>('ALL');
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVocab = useMemo(() => {
    let base = activeChart === 'ALL' 
      ? VOCABULARY_DATA 
      : VOCABULARY_DATA.filter(v => v.chartCategory.includes(activeChart));
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      base = base.filter(v => 
        v.word.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q) ||
        v.synonyms.some(s => s.toLowerCase().includes(q)) ||
        v.variations?.some(varItem => varItem.sentence.toLowerCase().includes(q))
      );
    }
    return base;
  }, [activeChart, searchQuery]);

  // Sync selected word whenever filtered list changes significantly (e.g. category switch)
  useEffect(() => {
    if (filteredVocab.length > 0 && !filteredVocab.find(v => v.word === selectedWord.word)) {
      setSelectedWord(filteredVocab[0]);
    }
  }, [filteredVocab]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSynonymClick = (synonym: string) => {
    const variation = selectedWord.variations?.find(v => 
      v.sentence.toLowerCase().includes(synonym.toLowerCase())
    );
    
    if (variation) {
      setActiveSentence(variation.sentence);
      setActiveSynonym(synonym);
    } else {
      setActiveSynonym(synonym);
    }
  };

  useEffect(() => {
    setIsAnimating(false);
    setIsFlipped(false);
    setActiveSentence(selectedWord.example);
    setActiveSynonym(null);
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, [selectedWord]);

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] text-ink selection:bg-accent/30 selection:text-ink pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#F8FAFC] border-b border-ink/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6">
          <div>
            <h1 className="font-display font-medium text-2xl md:text-5xl tracking-tighter">
              IELTsvision<span className="text-accent">.</span>
            </h1>
            <p className="hidden md:block text-ink/20 text-[8px] font-black uppercase tracking-[0.4em] mt-1">Lexical Intelligence Engine</p>
          </div>
          <div className="flex gap-2 p-1 bg-ink/5 rounded-2xl border border-ink/5 md:p-1.5">
             <button className="px-4 md:px-6 py-2 md:py-2.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-ink text-white rounded-xl shadow-xl transition-transform active:scale-95">The Engine</button>
             <button 
              onClick={() => document.getElementById('paraphrase-lab')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 md:px-6 py-2 md:py-2.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-ink/40 hover:text-ink transition-all active:scale-95"
             >
               Paraphrase Lab
             </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="bg-white/50 border-t border-ink/5">
          <div className="max-w-7xl mx-auto px-6 py-2 md:py-3.5 flex items-center overflow-x-auto no-scrollbar gap-1.5">
            <div className="flex items-center gap-2 mr-6 shrink-0 opacity-40">
              <Zap size={12} className="text-accent" />
              <span className="text-[9px] font-black uppercase tracking-widest">Select Task:</span>
            </div>
            {(['ALL', 'LINE_GRAPH', 'BAR_CHART', 'PIE_CHART', 'MAP', 'PROCESS', 'TABLE'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveChart(t);
                  setSearchQuery('');
                }}
                className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                  activeChart === t 
                    ? 'bg-accent text-white shadow-[0_8px_20px_rgba(var(--color-accent),0.25)] scale-105 z-10' 
                    : 'text-ink/40 hover:text-ink hover:bg-white hover:shadow-sm'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Navigation Sidebar - Horizontal scroll on mobile */}
        <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-5 lg:sticky lg:top-[180px] z-20">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-accent transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Band 9 Lexis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-ink/10 rounded-2xl text-[11px] font-semibold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent/40 transition-all shadow-sm"
            />
          </div>

          <div className="flex lg:flex-col lg:h-[550px] overflow-x-auto lg:overflow-y-auto bg-white border border-ink/10 rounded-[28px] md:rounded-[36px] p-2 md:p-2.5 gap-2 md:space-y-1.5 custom-scrollbar shadow-sm relative group/list no-scrollbar lg:block">
             <div className="sticky top-0 h-6 bg-gradient-to-b from-white via-white/80 to-transparent z-10 hidden lg:block" />
             <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
               <AnimatePresence mode="popLayout">
                  {filteredVocab.map((item) => (
                    <motion.button
                      layout
                      key={item.word}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedWord(item)}
                      className={`flex-shrink-0 lg:w-full group/btn flex items-center justify-between px-4 lg:px-5 py-3 lg:py-4.5 rounded-[18px] lg:rounded-[22px] transition-all duration-300 text-left border-2 ${
                        selectedWord.word === item.word 
                          ? 'bg-ink text-white border-ink shadow-2xl scale-[1.03]' 
                          : 'bg-transparent text-ink border-transparent hover:bg-ink/5 hover:border-ink/5'
                      }`}
                    >
                      <div className="flex flex-col items-start truncate pr-2">
                         <div className="flex items-center gap-2 mb-0.5 lg:mb-1">
                            <span className={`text-[7px] lg:text-[8px] font-black uppercase tracking-widest ${
                              selectedWord.word === item.word ? 'text-accent' : 'text-ink/30'
                            }`}>
                              {item.type}
                            </span>
                         </div>
                         <span className="font-display font-medium text-[13px] lg:text-[15px] leading-tight uppercase truncate">
                          {item.word}
                        </span>
                      </div>
                      <div className={`hidden lg:block transition-all duration-500 transform ${
                        selectedWord.word === item.word ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 bg-ink/10 p-1 rounded-lg'
                      }`}>
                         <ChevronRight size={16} className="text-accent" />
                      </div>
                    </motion.button>
                  ))}
               </AnimatePresence>
             </div>
             <div className="sticky bottom-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent z-10 hidden lg:block" />
          </div>
        </div>

        {/* Content Area - Order 1 on mobile */}
        <div className="lg:col-span-9 order-1 lg:order-2 flex flex-col gap-8 md:gap-10">
          
          {/* Main Visualizer + Example */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-8 bg-white p-2 md:p-4 rounded-[40px] md:rounded-[48px] shadow-sm border border-ink/5 overflow-hidden">
            <div className="xl:col-span-3 aspect-video bg-ink/5 rounded-[32px] md:rounded-[40px] overflow-hidden relative group">
              <TrendVisualizer 
                type={selectedWord.type} 
                word={selectedWord.word} 
                category={selectedWord.chartCategory} 
                isAnimating={isAnimating} 
              />
              
              <div className="absolute top-4 left-4 md:top-8 md:left-8">
                 <div className="px-4 py-2 md:px-6 md:py-3 bg-ink text-bg rounded-xl md:rounded-2xl shadow-2xl">
                   <h2 className="font-display font-medium text-2xl md:text-5xl uppercase tracking-tighter leading-none">
                     {selectedWord.word}
                   </h2>
                 </div>
              </div>

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex gap-1.5 md:gap-2">
                 {selectedWord.chartCategory.map(cat => (
                   <span key={cat} className="px-2 py-1 md:px-3 md:py-1 bg-white shadow-md rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest text-ink">
                     {cat.replace('_', ' ')}
                   </span>
                 ))}
              </div>

              <button 
                onClick={() => speak(selectedWord.word)}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-3.5 md:p-5 bg-accent text-white rounded-xl md:rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
              >
                <Volume2 size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

               <div className="xl:col-span-2 flex flex-col justify-center p-4 md:p-6 relative">
                  {(selectedWord as any).impactTip && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 lg:absolute lg:-top-4 lg:right-4 p-4 bg-ink text-white rounded-2xl shadow-xl flex items-start gap-3 border border-white/10 z-20 lg:max-w-[200px]"
                    >
                      <Target size={16} className="text-accent shrink-0 mt-1" />
                      <p className="text-[10px] font-bold uppercase tracking-wide leading-relaxed">
                        <span className="text-accent">Examiner Insight:</span> {(selectedWord as any).impactTip}
                      </p>
                    </motion.div>
                  )}
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 md:mb-6 block">Band 9 Sentence Structure</span>
               <p className="text-lg md:text-2xl font-display font-light leading-relaxed italic opacity-90 border-l-4 border-accent/20 pl-6">
                 "{activeSentence}"
               </p>
               
               <div className="mt-8 md:mt-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30 block mb-4">High-Score Collocations</span>
                  <div className="flex flex-wrap gap-2">
                    {(selectedWord as any).collocations?.map((c: string) => (
                      <span key={c} className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                         {c}
                      </span>
                    )) || (
                      <span className="text-[10px] font-medium text-ink/20 lowercase tracking-tight">Searching for ideal pairings...</span>
                    )}
                  </div>
               </div>

               <div className="mt-8 md:mt-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30 block mb-4">Synonyms to use (Click usage)</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedWord.synonyms?.map(s => (
                      <button 
                        key={s} 
                        onClick={() => handleSynonymClick(s)}
                        className={`px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all ${
                          activeSynonym === s 
                            ? 'bg-accent text-white shadow-lg scale-105' 
                            : 'bg-ink/5 text-ink/60 hover:bg-accent/10 hover:text-accent'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>


          {/* Bottom Row: Sentence Mastery Lab */}
          <div className="p-8 md:p-12 bg-white border border-ink/5 rounded-[40px] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-accent opacity-50" />
            
            <div className="flex flex-col xl:flex-row justify-between items-center gap-10 md:gap-14 relative z-10">
              <div className="max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 bg-accent text-white rounded-2xl shadow-lg">
                    <Zap size={24} />
                  </div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter italic leading-none">Grammar Flip</h3>
                </div>
                <p className="text-ink/60 text-lg font-medium leading-relaxed mb-8">Convert <span className="text-ink font-bold">Verbs</span> into formal <span className="text-accent font-bold">Noun Phrases</span> to maximize your grammatical range score.</p>
                
                <div className="hidden md:grid grid-cols-2 gap-6 p-6 bg-ink/5 rounded-3xl">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-ink/30 tracking-widest">Base Task</span>
                    <p className="text-xs font-bold">Verb + Adverb</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-accent tracking-widest">Band 9.0</span>
                    <p className="text-xs font-bold">Adjective + Noun</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-2xl bg-[#F1F5F9] p-2 rounded-[40px] shadow-inner">
                 <div className="flex gap-1.5 mb-4 p-1">
                   <button 
                    onClick={() => setIsFlipped(false)}
                    className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all ${!isFlipped ? 'bg-white shadow-lg text-ink' : 'text-ink/30 hover:text-ink/60'}`}
                   >
                     Common Verb
                   </button>
                   <button 
                    onClick={() => setIsFlipped(true)}
                    className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all ${isFlipped ? 'bg-ink text-bg shadow-lg' : 'text-ink/30 hover:text-ink/60'}`}
                   >
                     Band 9 Noun
                   </button>
                 </div>

                 <AnimatePresence mode="wait">
                   <motion.div 
                     key={isFlipped ? 'flipped' : 'normal'}
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.98 }}
                     className={`p-10 md:p-12 rounded-[32px] border-2 border-dashed h-48 md:h-56 flex flex-col justify-center ${isFlipped ? 'bg-accent/5 border-accent/20' : 'bg-white border-ink/5'}`}
                   >
                      <span className={`text-[9px] font-black uppercase tracking-[0.4em] block mb-4 ${isFlipped ? 'text-accent' : 'text-ink/20'}`}>
                        {isFlipped ? 'Examiner Approved' : 'Functional Description'}
                      </span>
                      <p className="text-xl md:text-3xl font-display font-medium leading-tight tracking-tight text-ink">
                        {isFlipped 
                          ? (selectedWord.flippedSentence || `A ${selectedWord.type.toLowerCase()} was witnessed in the data.`)
                          : selectedWord.example.split(',')[0] + "."}
                      </p>
                   </motion.div>
                 </AnimatePresence>
              </div>
            </div>

            {/* Error Protection */}
            <div className="mt-10 p-8 bg-red-50/50 border border-red-100 rounded-[32px] flex flex-col md:flex-row items-start gap-6">
               <div className="p-3.5 bg-red-500 text-white rounded-2xl shadow-lg shrink-0">
                 <Info size={24} />
               </div>
               <div>
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 block mb-1.5 opacity-60">Lexical Guard</span>
                 <p className="text-lg font-medium text-red-900/80 italic">"{selectedWord.avoid}"</p>
               </div>
            </div>
          </div>
          <VariationsSection word={selectedWord} />
        </div>
      </main>

      {/* Strategy Section */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
        <ParaphraseLab />
        <CohesionEngine />
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-20 pt-8 border-t border-ink/10 flex flex-col md:flex-row justify-between items-center gap-4 text-ink/40">
        <div className="text-xs font-mono">IELTSVISION ENGINE v1.0 // BUILT FOR BAND 9.0</div>
        <div className="flex gap-6 uppercase font-bold text-[10px] tracking-widest">
          <a href="#" className="hover:text-accent transition-colors">Documentation</a>
          <a href="#" className="hover:text-accent transition-colors">Study Plan</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
