
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CareerHero = () => {
  const scrollToApplyForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-cortex-blue/10 to-cortex-gray/30 relative overflow-hidden">
      <div className="absolute -top-20 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2300')] bg-cover bg-center bg-no-repeat opacity-5"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-cortex-blue/10 to-cortex-lightBlue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-cortex-red/10 to-cortex-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cortex-darkBlue mb-6 opacity-0 animate-fade-in">
            Join Our <span className="text-cortex-blue">Team</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 opacity-0 animate-fade-in delay-1">
            Be a part of CORTEX Medical's journey in advancing pharmaceutical manufacturing excellence. We're looking for talented individuals who share our passion for quality and innovation.
          </p>
          <div className="opacity-0 animate-fade-in delay-2">
            <Button
              className="bg-cortex-blue hover:bg-cortex-darkBlue text-white px-8 py-6 text-lg transform transition-transform duration-300 hover:scale-105"
              onClick={scrollToApplyForm}
            >
              Join Our Team <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
