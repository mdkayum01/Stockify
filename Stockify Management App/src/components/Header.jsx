import { Package, Plus } from 'lucide-react';

export default function Header({ onOpenAddModal }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-md shadow-indigo-500/20">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Stockify</h1>
            <p className="text-xs text-slate-400">প্রোডাক্ট ও স্টক ম্যানেজমেন্ট সিস্টেম</p>
          </div>
        </div>

        <button
          onClick={onOpenAddModal}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-5 h-5" />
          <span>নতুন প্রোডাক্ট যোগ করুন</span>
        </button>
      </div>
    </header>
  );
};