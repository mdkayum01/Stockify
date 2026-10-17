import { X } from 'lucide-react';

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  const profitPerUnit = product.sellPrice - product.buyPrice;
  const margin = product.sellPrice > 0 ? ((profitPerUnit / product.sellPrice) * 100).toFixed(1) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <div className="flex justify-between items-start pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
              {product.sku}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{product.name}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 block">কেনাবেচার দাম</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                ক্রয়: <span className="text-slate-400">${product.buyPrice.toFixed(2)}</span>
              </p>
              <p className="text-sm font-semibold text-emerald-400">
                বিক্রি: ${product.sellPrice.toFixed(2)}
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 block">লাভের মার্জিন</span>
              <p className="text-sm font-semibold text-cyan-400 mt-1">${profitPerUnit.toFixed(2)} / ইউনিট</p>
              <p className="text-xs text-slate-400">মার্জিন: {margin}%</p>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">বর্তমান স্টক তথ্য</span>
              <p className="text-base font-bold text-white mt-0.5">{product.stock} টি এভেলেবল</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">মিনিমাম স্টক লেভেল</span>
              <p className="text-sm font-semibold text-amber-400 mt-0.5">{product.minStock} টি</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">প্রোডাক্ট বিবরণ</h4>
            <p className="text-sm text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {product.description || "কোনো বিবরণ দেওয়া হয়নি।"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl font-medium text-sm transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};