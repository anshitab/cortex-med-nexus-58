import { useEffect, useState } from 'react';
import { TabletProduct } from '@/types/product';
import { filterProducts, productDatabase } from '@/data/productData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductDetailsDialog } from "@/components/products/ProductDetailsDialog";
import { ProductHero } from '@/components/products/ProductHero';
import { ProductSearch } from '@/components/products/ProductSearch';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductList } from '@/components/products/ProductList';
import { ProductCTA } from '@/components/products/ProductCTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/context/AnalyticsContext';

const Products = () => {
  const { trackEvent } = useAnalytics();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedTherapeuticArea, setSelectedTherapeuticArea] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState({
    products: productDatabase.slice(0, 20),
    totalPages: Math.ceil(productDatabase.length / 20),
    totalProducts: productDatabase.length
  });
  const [selectedProduct, setSelectedProduct] = useState<TabletProduct | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const uniqueCategories = Array.from(new Set(productDatabase.map(p => p.category)));
  const uniqueTherapeuticAreas = Array.from(new Set(productDatabase.map(p => p.therapeuticArea)));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Set category filter based on active tab
    let categoryFilter = selectedCategory;
    if (activeTab === 'tablets') {
      categoryFilter = 'Tablets';
    } else if (activeTab === 'capsules') {
      categoryFilter = 'Capsules';
    } else if (activeTab === 'all') {
      categoryFilter = undefined;
    }

    const filtered = filterProducts(
      {
        category: categoryFilter,
        searchTerm,
        therapeuticArea: selectedTherapeuticArea
      },
      currentPage
    );
    setFilteredData(filtered);
  }, [currentPage, searchTerm, selectedCategory, selectedTherapeuticArea, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim())
      trackEvent({ type: 'search', term: searchTerm.trim(), timestamp: Date.now() });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedTherapeuticArea(undefined);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const openProductDetails = (product: TabletProduct) => {
    trackEvent({ type: 'productView', productId: product.id, productName: product.name, timestamp: Date.now() });
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCategorySelect = (category: string | undefined) => {
    if (category)
      trackEvent({ type: 'filter', filterType: 'category', value: category, timestamp: Date.now() });
    setSelectedCategory(category);
  };

  const handleTherapeuticAreaSelect = (area: string | undefined) => {
    if (area)
      trackEvent({ type: 'filter', filterType: 'therapeuticArea', value: area, timestamp: Date.now() });
    setSelectedTherapeuticArea(area);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <ProductHero />

      <section id="product-catalog" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-cortex-darkBlue mb-2">Product Catalog</h2>
                <p className="text-gray-600">
                  Browse our extensive range of pharmaceutical products
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <ProductSearch 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onSubmit={handleSearch}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <ProductFilters 
                  uniqueCategories={uniqueCategories}
                  uniqueTherapeuticAreas={uniqueTherapeuticAreas}
                  selectedCategory={selectedCategory}
                  selectedTherapeuticArea={selectedTherapeuticArea}
                  onCategorySelect={handleCategorySelect}
                  onTherapeuticAreaSelect={handleTherapeuticAreaSelect}
                  onClearFilters={clearFilters}
                  productDatabase={productDatabase}
                />
              </div>
              
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="mb-8">
                    <TabsTrigger value="all">All Products</TabsTrigger>
                    <TabsTrigger value="tablets">Tablets</TabsTrigger>
                    <TabsTrigger value="capsules">Capsules</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    <ProductList 
                      products={filteredData.products}
                      currentPage={currentPage}
                      totalPages={filteredData.totalPages}
                      onPageChange={handlePageChange}
                      onViewDetails={openProductDetails}
                    />
                  </TabsContent>
                  
                  <TabsContent value="tablets" className="mt-0">
                    <ProductList 
                      products={filteredData.products}
                      currentPage={currentPage}
                      totalPages={filteredData.totalPages}
                      onPageChange={handlePageChange}
                      onViewDetails={openProductDetails}
                    />
                  </TabsContent>
                  
                  <TabsContent value="capsules" className="mt-0">
                    <ProductList 
                      products={filteredData.products}
                      currentPage={currentPage}
                      totalPages={filteredData.totalPages}
                      onPageChange={handlePageChange}
                      onViewDetails={openProductDetails}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      
      <ProductCTA />
      
      <Footer />
    </div>
  );
};

export default Products;
