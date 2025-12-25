import React, { useState, useMemo } from 'react';
import { DataRow } from '../types.ts';
import { Hash, Type, Search, X, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface DataTableProps {
  data: DataRow[];
  onSelect: (item: DataRow) => void;
  activeId?: string;
}

const ROWS_PER_PAGE = 50;

const DataTable: React.FC<DataTableProps> = ({ data, onSelect, activeId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(ROWS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState<DataRow | null>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(row => 
      row.columnB.toLowerCase().includes(term) || 
      row.columnC.toLowerCase().includes(term) || 
      row.columnD.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  const displayedRows = useMemo(() => {
    return filteredData.slice(0, displayLimit);
  }, [filteredData, displayLimit]);

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + ROWS_PER_PAGE);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
      {/* Table Header / Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Type className="h-5 w-5 text-indigo-400" />
           </div>
           <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Record Browser</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global View</p>
           </div>
        </div>
        
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search within records..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-100 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDisplayLimit(ROWS_PER_PAGE);
            }}
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] w-24">
                  <div className="flex items-center gap-2.5 opacity-60"><Hash className="h-3.5 w-3.5" /> ID</div>
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2.5 opacity-60">Part Number</div>
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2.5 opacity-60">Description</div>
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2.5 opacity-60">Make/Buy</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedRows.length > 0 ? (
                displayedRows.map((row) => (
                  <tr 
                    key={`${row.columnA}-${row.columnB}`}
                    onClick={() => setSelectedItem(row)}
                    className={`group cursor-pointer transition-all ${
                      activeId === row.columnA ? 'bg-indigo-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-8 py-6 text-sm font-black text-slate-300 tabular-nums">{row.columnA}</td>
                    <td className="px-8 py-6 text-base font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {row.columnB}
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all tracking-widest shadow-sm">
                        {row.columnC}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium leading-relaxed">
                      <div className="max-w-xs xl:max-w-md truncate font-bold text-slate-700">{row.columnD}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No matching records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col items-center gap-6">
          {displayLimit < filteredData.length && (
            <button 
              onClick={handleLoadMore}
              className="px-10 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
            >
              Load More
            </button>
          )}
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em] italic">
            Total {filteredData.length} records available
          </p>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" 
            onClick={() => setSelectedItem(null)}
          ></div>
          
          <div className="relative w-full max-w-3xl bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            {/* Header / Close */}
            <div className="absolute top-8 right-8 z-20">
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-12 h-12 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-2xl flex items-center justify-center transition-all group"
              >
                <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            <div className="p-12 sm:p-16 space-y-10">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 tracking-widest tabular-nums uppercase">Record ID {selectedItem.columnA}</span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Part Number</p>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                  {selectedItem.columnB}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-indigo-600 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-indigo-400/20 blur-[80px] rounded-full"></div>
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                      <Layers className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-indigo-200 uppercase tracking-[0.5em]">Description</p>
                      <p className="text-3xl sm:text-4xl font-black text-white leading-tight">
                        {selectedItem.columnC}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Make/Buy</p>
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed italic">
                      "{selectedItem.columnD}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <button 
                  onClick={() => {
                    onSelect(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all hover:bg-indigo-600 hover:shadow-2xl"
                >
                  Visualize in Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;