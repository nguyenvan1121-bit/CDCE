import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar.tsx';
import ResultCard from './components/ResultCard.tsx';
import DataTable from './components/DataTable.tsx';
import { fetchSheetData, SHEET_ID } from './services/dataService.ts';
import { DataRow } from './types.ts';
import { Zap, List, LayoutGrid, CheckCircle2, Loader2, AlertCircle, ExternalLink, Search as SearchIcon } from 'lucide-react';

const App: React.FC = () => {
  const [dataset, setDataset] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<{ match: DataRow } | null>(null);
  const [viewMode, setViewMode] = useState<'search' | 'all'>('search');

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const data = await fetchSheetData();
        setDataset(data);
        setError(null);
      } catch (err) {
        console.error("Initialization error:", err);
        setError("Connection error. Ensure the data source is accessible.");
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleSelect = useCallback((item: DataRow | null) => {
    if (!item) {
      setActiveResult(null);
      return;
    }
    setActiveResult({ match: item });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] right-[-10%] w-[100vw] h-[100vw] bg-indigo-200/20 blur-[200px] rounded-full animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-blue-200/20 blur-[180px] rounded-full animate-pulse duration-[8s]"></div>
      </div>

      <header className="w-full py-4 px-6 md:px-12 border-b border-white/40 bg-white/70 backdrop-blur-2xl sticky top-0 z-[2000] shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <Zap className="text-yellow-400 h-5 w-5 fill-yellow-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">IntelliSearch</h1>
              <p className="text-[8px] text-slate-400 uppercase tracking-[0.3em] font-black mt-1">Direct Sheet Link</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-all duration-700 ${
              !loading && !error ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
              error ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : error ? <AlertCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
              <span className="text-[9px] font-black uppercase tracking-widest tabular-nums">
                {loading ? 'Syncing' : error ? 'Error' : `${dataset.length} Records`}
              </span>
            </div>
            
            <a 
              href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group px-4 py-2.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:bg-indigo-600 flex items-center gap-2 shadow-sm"
            >
              Sheet Source
              <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-10">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-200/40 rounded-full w-fit mx-auto backdrop-blur-xl border border-white/60 shadow-inner mb-12">
          <button 
            onClick={() => setViewMode('search')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              viewMode === 'search' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Explore
          </button>
          <button 
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              viewMode === 'all' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List className="h-3.5 w-3.5" />
            Database
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 animate-pulse">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">Updating Database...</p>
          </div>
        ) : viewMode === 'search' ? (
          <div className="space-y-12 max-w-5xl mx-auto">
            <SearchBar data={dataset} onSelect={handleSelect} />
            
            <div className="transition-all duration-700 ease-in-out">
              {activeResult ? (
                <ResultCard result={activeResult} />
              ) : (
                <div className="max-w-2xl mx-auto mt-8 animate-in fade-in duration-1000">
                  <div className="bg-white/40 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center shadow-sm backdrop-blur-sm group hover:border-indigo-200 transition-colors">
                    <SearchIcon className="h-10 w-10 text-slate-200 mx-auto mb-6 group-hover:text-indigo-300 transition-colors" />
                    <p className="text-slate-400 text-sm font-medium tracking-tight">Enter a Part Number in the search box to view mapping results</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <DataTable 
              data={dataset} 
              onSelect={(item: DataRow) => {
                handleSelect(item);
                setViewMode('search');
              }}
              activeId={activeResult?.match.columnA}
            />
          </div>
        )}
      </main>

      <footer className="py-8 text-center border-t border-slate-100/60 mt-auto">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Real-time Spreadsheet Integration • v1.1.0</p>
      </footer>
    </div>
  );
};

export default App;