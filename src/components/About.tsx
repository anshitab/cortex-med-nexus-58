
import { ShieldCheck, Award, Clock, Activity, FlaskConical, Microscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cortex-blue/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cortex-red/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4 opacity-0 animate-fade-in">
            About <span className="text-cortex-blue">CORTEX</span> Medical Inc.
          </h2>
          <p className="text-gray-700 text-lg opacity-0 animate-fade-in delay-1">
            We are a leading Schedule-M GMP-GLP certified pharmaceutical manufacturer committed to delivering exceptional quality medicines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border border-cortex-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up delay-2">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue">Quality Assurance</h3>
              <p className="text-gray-600">
                Our manufacturing processes adhere to the highest quality standards, ensuring safe and effective products.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-cortex-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up delay-3">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue">GMP Certified</h3>
              <p className="text-gray-600">
                Our facilities are Schedule-M GMP-GLP certified, meeting international quality benchmarks for pharmaceutical manufacturing.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-cortex-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up delay-4">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue">Timely Delivery</h3>
              <p className="text-gray-600">
                We prioritize efficient production and timely shipment, ensuring your products reach their destination on schedule.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-cortex-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up delay-5">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue">
                <FlaskConical size={32} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue">Research-Driven</h3>
              <p className="text-gray-600">
                Our innovative formulations are backed by extensive research and development to ensure optimum efficacy.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-cortex-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up delay-6">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue">Customized Solutions</h3>
              <p className="text-gray-600">
                We offer tailored pharmaceutical solutions to meet your specific requirements and market demands.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-cortex-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in-up delay-7">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center text-cortex-blue">
                <Microscope size={32} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue">Advanced Technology</h3>
              <p className="text-gray-600">
                Our state-of-the-art facilities employ cutting-edge technology for optimal pharmaceutical manufacturing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
