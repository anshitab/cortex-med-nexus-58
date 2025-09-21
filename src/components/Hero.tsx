
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cortex-blue/10 via-white to-cortex-lightBlue/10 z-0"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-cortex-blue/5 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-cortex-red/5 rounded-full filter blur-3xl animate-float delay-4"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 opacity-0 animate-fade-in-right">
            <div className="flex items-center space-x-2 bg-cortex-blue/10 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 bg-cortex-blue rounded-full animate-pulse-light"></span>
              <span className="text-cortex-blue font-medium text-sm">Schedule-M GMP-GLP Certified</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-cortex-darkBlue">
              Pioneering <span className="text-cortex-blue">Pharmaceutical</span> Excellence
            </h1>
            
            <p className="text-lg text-gray-700 max-w-lg">
              With over 600+ approved formulations, CORTEX Medical Inc. delivers premium pharmaceutical manufacturing with uncompromising quality and timely excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/products">
                <Button className="bg-cortex-blue hover:bg-cortex-darkBlue text-white px-8 py-6 w-full sm:w-auto" size="lg">
                  Explore Products
                </Button>
              </Link>
              <a href="#contact">
                <Button variant="outline" className="border-cortex-blue text-cortex-blue hover:bg-cortex-blue/10 px-8 py-6 w-full sm:w-auto" size="lg">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end opacity-0 animate-fade-in delay-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cortex-blue via-cortex-lightBlue to-cortex-blue rounded-full opacity-20 blur-xl animate-pulse-light"></div>
              <img 
                src="/lovable-uploads/78016c50-c4c8-409e-b336-a4919bc6e800.png" 
                alt="CORTEX Medical Inc" 
                className="relative z-10 max-w-sm lg:max-w-md xl:max-w-lg animate-floating"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-cortex-blue animate-fade-in delay-5"
      >
        <span className="text-sm font-medium mb-2">Scroll Down</span>
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
