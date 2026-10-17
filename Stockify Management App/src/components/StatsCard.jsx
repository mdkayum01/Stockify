import { Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function StatsCard({ products }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalValuationBuy = products.reduce((acc, p) => acc + ((p.buyPrice || 0) * (p.stock || 0)), 0);
  const totalValuationSell = products.reduce((acc, p) => acc + ((p.sellPrice || 0) * (p.stock || 0)), 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Products */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">মোট প্রোডাক্ট</span>
          <div className="p-2 bg-slate-800 rounded-lg text-indigo-400"><Package className="w-5 h-5" /></div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold text-white">{totalProducts} <span className="text-sm font-normal text-slate-400">টি আইটেম</span></h3>
          <p className="text-xs text-slate-400 mt-1">মোট স্টক সংখ্যা: <span className="text-slate-200 font-semibold">{totalStock}</span></p>
        </div>
      </div>

      {/* Buy Value */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">মোট ক্রয়মূল্য (Asset)</span>
          <div className="p-2 bg-slate-800 rounded-lg text-emerald-400"><DollarSign className="w-5 h-5" /></div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold text-emerald-400">${totalValuationBuy.toFixed(2)}</h3>
          <p className="text-xs text-slate-400 mt-1">স্টকে থাকা সামগ্রীর আসল দাম</p>
        </div>
      </div>

      {/* Potential Return */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">সম্ভাব্য বিক্রয়মূল্য</span>
          <div className="p-2 bg-slate-800 rounded-lg text-cyan-400"><TrendingUp className="w-5 h-5" /></div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold text-cyan-400">${totalValuationSell.toFixed(2)}</h3>
          <p className="text-xs text-slate-400 mt-1">সম্ভাব্য লাভ: <span className="text-emerald-400 font-semibold">${(totalValuationSell - totalValuationBuy).toFixed(2)}</span></p>
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">স্টক অ্যালার্ট</span>
          <div className="p-2 bg-slate-800 rounded-lg text-amber-400"><AlertTriangle className="w-5 h-5" /></div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <h3 className="text-2xl font-bold text-amber-400">{lowStockCount}</h3>
            <p className="text-xs text-slate-400">কম স্টক (Low Stock)</p>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-rose-500">{outOfStockCount}</h3>
            <p className="text-xs text-slate-400">স্টক নেই (Out)</p>
          </div>
        </div>
      </div>
    </div>
  );
};