
import { useEffect, useState, useRef } from 'react';
import { Pill, Truck, Clock, Award } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-cortex-darkBlue text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cortex-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cortex-red/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-4">
              <Pill size={32} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              <span>600</span>
              <span className="text-xl text-cortex-blue">+</span>
            </h3>
            <p className="text-white/80">Approved Formulations</p>
          </div>
          
          <div className="flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-4">
              <Truck size={32} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              <span>100</span>
              <span className="text-xl text-cortex-blue">%</span>
            </h3>
            <p className="text-white/80">Timely Delivery</p>
          </div>
          
          <div className="flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              <span>24</span>
              <span className="">/7</span>
            </h3>
            <p className="text-white/80">Production Capacity</p>
          </div>
          
          <div className="flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-4">
              <Award size={32} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <span className="bg-gradient-to-r from-cortex-red to-cortex-blue bg-clip-text text-transparent">GMP</span>
            </h3>
            <p className="text-white/80">Certified Quality</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
