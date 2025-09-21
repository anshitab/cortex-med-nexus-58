
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProductHero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-cortex-blue/10 to-cortex-gray/30 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-cortex-blue/10 to-cortex-lightBlue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-cortex-red/10 to-cortex-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cortex-darkBlue mb-6 opacity-0 animate-fade-in">
            Our <span className="text-cortex-blue">Products</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 opacity-0 animate-fade-in delay-1">
            CORTEX Medical manufactures over 600 approved pharmaceutical formulations with the highest quality standards and regulatory compliance.
          </p>
          <div className="opacity-0 animate-fade-in delay-2">
            <Button 
              className="bg-cortex-blue hover:bg-cortex-darkBlue text-white px-8 py-6 text-lg" 
              onClick={() => document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Our Catalog <ArrowDown className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
