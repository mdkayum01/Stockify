import { Search, Eye, Edit2, Trash2, Plus, Minus } from 'lucide-react';

export default function ProductTable({
  products,
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  stockFilter,
  setStockFilter,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateStock
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Search and Filters */}
      <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="প্রোডাক্ট নাম বা SKU দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="All">সব ক্যাটাগরি</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="All">সব স্টক স্ট্যাটাস</option>
            <option value="in_stock">পর্যাপ্ত স্টক (In Stock)</option>
            <option value="low_stock">কম স্টক (Low Stock)</option>
            <option value="out_of_stock">স্টক নেই (Out of Stock)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">প্রোডাক্ট এর বিবরণ</th>
              <th className="px-6 py-4">ক্যাটাগরি</th>
              <th className="px-6 py-4">ক্রয় / বিক্রয় মূল্য</th>
              <th className="px-6 py-4 text-center">স্টক কোয়ান্টিটি</th>
              <th className="px-6 py-4 text-center">স্ট্যাটাস</th>
              <th className="px-6 py-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-slate-500">
                  কোনো প্রোডাক্ট পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isOutOfStock = product.stock === 0;
                const isLowStock = product.stock > 0 && product.stock <= product.minStock;

                return (
                  <tr key={product.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-100">{product.name}</div>
                      <div className="text-xs text-slate-500 font-mono">SKU: {product.sku}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-md text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>${product.sellPrice.toFixed(2)}</div>
                      <div className="text-xs text-slate-500">ক্রয়: ${product.buyPrice.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onUpdateStock(product.id, -1)}
                          disabled={isOutOfStock}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-semibold w-8 text-center">{product.stock}</span>
                        <button
                          onClick={() => onUpdateStock(product.id, 1)}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 text-xs rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">Out of Stock</span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">Low Stock</span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => onViewProduct(product)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => onEditProduct(product)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDeleteProduct(product.id)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};