
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pill, Tablet, Package, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'custom', label: 'Custom Formulations' },
  ];
  
  const productCategories = [
    {
      id: 'analgesics',
      name: 'Analgesics & Anti-inflammatory',
      description: 'Pain relievers and anti-inflammatory medications for various conditions.',
      count: 120,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format',
      type: 'tablets'
    },
    {
      id: 'antibiotics',
      name: 'Antibiotics',
      description: 'Broad spectrum antibiotics targeting various bacterial infections.',
      count: 85,
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=300&auto=format',
      type: 'capsules'
    },
    {
      id: 'antihypertensives',
      name: 'Antihypertensives',
      description: 'Medications for managing high blood pressure and cardiovascular health.',
      count: 75,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=300&auto=format',
      type: 'tablets'
    },
    {
      id: 'antidiabetics',
      name: 'Antidiabetics',
      description: 'Formulations for managing diabetes and related metabolic conditions.',
      count: 60,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=300&auto=format',
      type: 'tablets'
    },
    {
      id: 'gastrointestinal',
      name: 'Gastrointestinal',
      description: 'Products for digestive disorders and gastrointestinal health.',
      count: 90,
      image: 'https://images.unsplash.com/photo-1573883429746-084be9b5cfca?q=80&w=300&auto=format',
      type: 'capsules'
    },
    {
      id: 'custom',
      name: 'Custom Formulations',
      description: 'Client-specific formulations tailored to unique requirements.',
      count: 170,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=300&auto=format',
      type: 'custom'
    },
  ];
  
  const filteredProducts = activeFilter === 'all' 
    ? productCategories 
    : productCategories.filter(product => product.type === activeFilter);

  return (
    <section id="products" className="py-20 bg-cortex-gray relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-cortex-blue/10 to-cortex-lightBlue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-cortex-red/10 to-cortex-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4 opacity-0 animate-fade-in">
            Our <span className="text-cortex-blue">Product</span> Portfolio
          </h2>
          <p className="text-gray-700 opacity-0 animate-fade-in delay-1">
            CORTEX Medical offers extensive formulations with a focus on tablet and capsule manufacturing. Explore our product range.
          </p>
        </div>
        
        <div className="flex flex-col space-y-8">
          <div className="flex justify-center mb-6 opacity-0 animate-fade-in delay-2">
            <div className="inline-flex items-center p-1 bg-white rounded-lg border border-cortex-blue/20 shadow-sm">
              {filters.map((filter, index) => (
                <button
                  key={filter.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-cortex-blue text-white'
                      : 'text-cortex-darkBlue hover:bg-cortex-blue/10'
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-cortex-blue/10 hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 right-0 bg-cortex-blue text-white px-3 py-1 text-sm font-medium rounded-tl-lg">
                    {product.type === 'tablets' ? (
                      <div className="flex items-center">
                        <Tablet size={16} className="mr-1" />
                        <span>Tablets</span>
                      </div>
                    ) : product.type === 'capsules' ? (
                      <div className="flex items-center">
                        <Pill size={16} className="mr-1" />
                        <span>Capsules</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Package size={16} className="mr-1" />
                        <span>Custom</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cortex-darkBlue mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-cortex-blue font-medium">{product.count}+ Formulations</span>
                    <Button variant="ghost" className="p-0 hover:text-cortex-blue">
                      <Link to="/products" className="flex items-center">
                        <span className="mr-1">View Details</span>
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 opacity-0 animate-fade-in delay-8">
            <Link to="/products">
              <Button className="bg-cortex-blue hover:bg-cortex-darkBlue text-white">
                View All Products <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
