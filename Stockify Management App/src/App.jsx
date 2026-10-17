import { useMemo, useState } from 'react';
import Header from './components/Header';
import ProductDetailsModal from './components/ProductDetailsModal';
import ProductModal from './components/ProductModal';
import ProductTable from './components/ProductTable';
import StatsCard from './components/StatsCard';
import { initialProducts } from './types';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);
  const filteredProducts = useMemo(() => products.filter((product) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStock = stockFilter === 'All'
      || (stockFilter === 'out_of_stock' && product.stock === 0)
      || (stockFilter === 'low_stock' && product.stock > 0 && product.stock <= product.minStock)
      || (stockFilter === 'in_stock' && product.stock > product.minStock);
    return matchesSearch && matchesCategory && matchesStock;
  }), [products, searchTerm, selectedCategory, stockFilter]);

  const openAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const saveProduct = (productData) => {
    if (editingProduct) {
      setProducts((current) => current.map((product) => (
        product.id === editingProduct.id ? { ...product, ...productData } : product
      )));
    } else {
      setProducts((current) => [...current, { ...productData, id: crypto.randomUUID() }]);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const updateStock = (productId, amount) => {
    setProducts((current) => current.map((product) => (
      product.id === productId ? { ...product, stock: Math.max(0, product.stock + amount) } : product
    )));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header onOpenAddModal={openAddModal} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCard products={products} />
        <ProductTable
          products={filteredProducts}
          categories={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          onViewProduct={setViewingProduct}
          onEditProduct={(product) => { setEditingProduct(product); setIsProductModalOpen(true); }}
          onDeleteProduct={(productId) => setProducts((current) => current.filter((product) => product.id !== productId))}
          onUpdateStock={updateStock}
        />
      </main>
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={saveProduct}
        editingProduct={editingProduct}
      />
      <ProductDetailsModal product={viewingProduct} onClose={() => setViewingProduct(null)} />
    </div>
  );
}
