
import { Check, Clock, Hourglass, FileStack, BarChart3, MessageSquare } from 'lucide-react';

const Services = () => {
  // WhatsApp redirect function
  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890?text=I'm%20interested%20in%20partnering%20with%20CORTEX%20for%20pharmaceutical%20manufacturing", "_blank");
  };

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80')] bg-fixed opacity-5"></div>
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-cortex-blue/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cortex-red/10 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4 opacity-0 animate-fade-in">
            Our <span className="text-cortex-blue">Manufacturing</span> Services
          </h2>
          <p className="text-gray-700 opacity-0 animate-fade-in delay-1">
            CORTEX Medical Inc. offers comprehensive pharmaceutical manufacturing services with a focus on tablets and capsules. Our state-of-the-art facilities and experienced team ensure exceptional quality and timely delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 opacity-0 animate-fade-in-right delay-2">
            <div className="bg-cortex-blue/5 rounded-2xl p-8 border border-cortex-blue/20 relative">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-cortex-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-semibold text-cortex-darkBlue mb-4">Manufacturing Excellence</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">State-of-the-art manufacturing facilities with advanced technology</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Specialized in tablet and capsule manufacturing</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Stringent quality control throughout the manufacturing process</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Schedule-M GMP-GLP certified processes ensuring global standards</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-cortex-blue/5 rounded-2xl p-8 border border-cortex-blue/20 mt-8 relative">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-cortex-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-semibold text-cortex-darkBlue mb-4">Customized Solutions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Tailored pharmaceutical formulations based on client requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Flexible batch sizes to accommodate diverse market needs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Research and development support for innovative formulations</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-cortex-blue">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700">Comprehensive technical documentation and regulatory support</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-6 opacity-0 animate-fade-in delay-3">
            <div className="bg-white rounded-xl shadow-md p-6 border border-cortex-blue/10 hover:shadow-lg transition-shadow duration-300 hover:border-cortex-blue/30 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue mb-4">
                <Clock size={24} />
              </div>
              <h4 className="text-lg font-semibold text-cortex-darkBlue mb-2">Timely Delivery</h4>
              <p className="text-gray-600">Efficient production and strict adherence to timelines</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-cortex-blue/10 hover:shadow-lg transition-shadow duration-300 hover:border-cortex-blue/30 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue mb-4">
                <FileStack size={24} />
              </div>
              <h4 className="text-lg font-semibold text-cortex-darkBlue mb-2">600+ Formulations</h4>
              <p className="text-gray-600">Extensive portfolio of approved pharmaceutical formulations</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-cortex-blue/10 hover:shadow-lg transition-shadow duration-300 hover:border-cortex-blue/30 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue mb-4">
                <Hourglass size={24} />
              </div>
              <h4 className="text-lg font-semibold text-cortex-darkBlue mb-2">24/7 Production</h4>
              <p className="text-gray-600">Round-the-clock manufacturing for optimal efficiency</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-cortex-blue/10 hover:shadow-lg transition-shadow duration-300 hover:border-cortex-blue/30 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue mb-4">
                <BarChart3 size={24} />
              </div>
              <h4 className="text-lg font-semibold text-cortex-darkBlue mb-2">Quality Analytics</h4>
              <p className="text-gray-600">Comprehensive testing and quality assurance protocols</p>
            </div>
            
            <div className="col-span-2 bg-gradient-to-r from-cortex-blue to-cortex-darkBlue rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform" onClick={openWhatsApp}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Ready to partner with CORTEX?</h4>
                  <p className="opacity-90">Let us handle your pharmaceutical manufacturing needs</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <MessageSquare size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
