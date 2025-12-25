import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { DataRow } from '../types.ts';

interface SearchBarProps {
  data: DataRow[];
  onSelect: (item: DataRow | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<DataRow[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (trimmedQuery.length > 0) {
      // Find matches in Column B
      const matches = data.filter(item =>
        item.columnB.toLowerCase().includes(trimmedQuery)
      );
      
      // Sort: items starting with the query come first
      const sorted = [...matches].sort((a, b) => {
        const aStart = a.columnB.toLowerCase().startsWith(trimmedQuery);
        const bStart = b.columnB.toLowerCase().startsWith(trimmedQuery);
        if (aStart && !bStart) return -1;
        if (!aStart && bStart) return 1;
        return 0;
      });

      setSuggestions(sorted.slice(0, 8));
      setIsOpen(true);
      
      // Auto-preview the first match if it exists
      if (sorted.length > 0) {
        onSelect(sorted[0]);
      }
    } else {
      setSuggestions([]);
      setIsOpen(false);
      onSelect(null);
    }
  }, [query, data, onSelect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    onSelect(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto" ref={wrapperRef} style={{ zIndex: 1000 }}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-300 group-focus-within:text-indigo-600 transition-all duration-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-20 pr-16 py-8 bg-white/60 backdrop-blur-md border-4 border-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] focus:ring-0 focus:border-indigo-600/30 transition-all text-2xl md:text-3xl outline-none font-bold text-slate-900 placeholder-slate-200"
          placeholder="Search Part Numbers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-10 flex items-center text-slate-200 hover:text-slate-500 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-4 bg-white/95 backdrop-blur-2xl border-4 border-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] overflow-hidden z-[10000] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {suggestions.map((item, idx) => (
              <button
                key={`${item.columnA}-${idx}`}
                className="w-full text-left px-10 py-5 hover:bg-indigo-600 group transition-all border-b last:border-b-0 border-slate-50 flex items-center justify-between"
                onClick={() => {
                  setQuery(item.columnB);
                  setIsOpen(false);
                  onSelect(item);
                }}
              >
                <span className="text-xl font-bold text-slate-800 group-hover:text-white transition-colors truncate">
                  {item.columnB}
                </span>
                <div className="flex items-center gap-4">
                  <span className="opacity-0 group-hover:opacity-40 text-[9px] font-bold text-white uppercase tracking-widest transition-opacity">Select</span>
                  <ArrowRight className="h-5 w-5 text-slate-200 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
          <div className="bg-slate-50/80 px-10 py-2.5 text-center border-t border-slate-100">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">Matching Dataset Records</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;