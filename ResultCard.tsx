
import React from 'react';
import { Hash, Tag, FileText, CheckCircle2, Layers } from 'lucide-react';
import { SearchResult } from '../types';

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { match } = result;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      
      {/* SOURCE HEADER */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl border border-white flex flex-col md:flex-row items-center gap-6 group">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
          <Hash className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="flex-1 text-center md:text-left overflow-hidden">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-0.5">Part Number</p>
          <h2 className="text-lg md:text-2xl font-semibold text-slate-900 tracking-tight truncate">
            {match.columnB}
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100">
           <FileText className="h-3 w-3 text-slate-300" />
           <p className="text-[10px] font-bold text-slate-400 tabular-nums">ID {match.columnA}</p>
        </div>
      </div>

      {/* TARGET WRAPPER */}
      <div className="space-y-4">
        
        {/* DESCRIPTION CARD */}
        <div className="bg-indigo-600 rounded-[2.5rem] p-7 md:p-8 relative overflow-hidden group shadow-[0_25px_50px_-12px_rgba(79,70,229,0.3)] transition-all hover:scale-[1.005] flex flex-col">
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full group-hover:animate-pulse"></div>
          
          <div className="absolute bottom-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Tag className="h-24 w-24 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner group-hover:rotate-6 transition-transform">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <p className="text-[8px] font-bold text-indigo-200 uppercase tracking-[0.4em]">Description</p>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed tracking-tight">
              {match.columnC}
            </p>
          </div>
        </div>

        {/* MAKE/BUY CARD */}
        <div className="bg-white rounded-[2rem] p-7 md:p-8 border border-slate-100 shadow-xl transition-all hover:bg-slate-50 group/d flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shadow-sm group-hover/d:scale-110 transition-transform">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Decision Status</p>
          </div>
          <p className="text-md md:text-lg font-semibold text-slate-800 tracking-tight leading-relaxed">
            {match.columnD}
          </p>
        </div>

      </div>

      {/* Aesthetic Dots */}
      <div className="flex justify-center pt-2">
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-0.5 h-0.5 rounded-full bg-indigo-200" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
