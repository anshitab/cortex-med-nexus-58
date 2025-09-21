
import { Briefcase } from 'lucide-react';

const benefits = [
  {
    title: "Competitive Compensation",
    description: "Industry-leading salary packages, performance bonuses, and comprehensive health benefits."
  },
  {
    title: "Professional Development",
    description: "Continuous learning opportunities through training programs, workshops, and education assistance."
  },
  {
    title: "Work-Life Balance",
    description: "Flexible work arrangements, wellness programs, and generous paid time off policies."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
            Why Join <span className="text-cortex-blue">CORTEX</span> Medical?
          </h2>
          <p className="text-gray-700">
            We offer more than just a job – we offer a career with purpose and rewards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-8 text-center border border-cortex-blue/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cortex-blue/20 to-cortex-lightBlue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="text-cortex-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-cortex-darkBlue mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
