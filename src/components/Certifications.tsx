import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Shield, 
  CheckCircle, 
  ClipboardCheck, 
  Settings, 
  Users, 
  Sliders, 
  Microscope, 
  FileText, 
  Check
} from 'lucide-react';

const CertificationCard = ({ 
  icon, 
  title, 
  description, 
  items 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  items: string[] 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-2 bg-gradient-to-r from-cortex-blue to-cortex-lightBlue"></div>
      
      <div className="p-8">
        <div className={`mb-6 transition-all duration-500 ${isHovered ? 'scale-110 text-cortex-blue' : ''}`}>
          {icon}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cortex-darkBlue">{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          <ul className="space-y-3 mt-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className={`mr-3 mt-1 ${isHovered ? 'text-cortex-blue animate-bounce' : 'text-cortex-blue'}`}>
                  <Check size={20} />
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className={`p-4 bg-cortex-blue/5 border-t border-cortex-blue/10 transition-all duration-500 ${isHovered ? 'bg-cortex-blue/10' : ''}`}>
        <span className="text-sm text-cortex-blue font-medium">Primary</span>
      </div>
    </div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cortex-blue/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cortex-red/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="text-cortex-blue h-8 w-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4 animate-fade-in-up">
            Quality <span className="text-cortex-blue">Certifications</span>
          </h2>
          
          <p className="text-gray-700 animate-fade-in-up delay-1">
            At CORTEX Medical Inc., we adhere to the highest international standards for pharmaceutical manufacturing. Our certifications reflect our commitment to quality, safety, and regulatory compliance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CertificationCard
            icon={<Shield className="h-14 w-14 text-cortex-blue" />}
            title="Schedule-M Certification"
            description="Our pharmaceutical manufacturing facilities comply with Schedule-M regulations, ensuring good manufacturing practices for pharmaceutical products."
            items={[
              "Quality Control Processes",
              "Production Standards",
              "Equipment Validation"
            ]}
          />
          
          <CertificationCard
            icon={<ClipboardCheck className="h-14 w-14 text-cortex-blue" />}
            title="GMP Certification"
            description="Good Manufacturing Practice (GMP) certification ensures our processes meet international standards for pharmaceutical production."
            items={[
              "Facility Standards",
              "Personnel Qualifications",
              "Process Control"
            ]}
          />
          
          <CertificationCard
            icon={<Microscope className="h-14 w-14 text-cortex-blue" />}
            title="GLP Certification"
            description="Good Laboratory Practice (GLP) certification ensures our testing and quality control labs maintain the highest standards."
            items={[
              "Laboratory Practices",
              "Testing Methods",
              "Documentation Standards"
            ]}
          />
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-cortex-blue hover:bg-cortex-darkBlue text-white animate-pulse-light">
            <CheckCircle className="mr-2 h-4 w-4" /> View All Certifications
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
