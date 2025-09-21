
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmployeeReviews from '@/components/EmployeeReviews';
import InteractiveWorkCulture from '@/components/InteractiveWorkCulture';
import CareerHero from '@/components/careers/CareerHero';
import BenefitsSection from '@/components/careers/BenefitsSection';
import ApplicationForm from '@/components/careers/ApplicationForm';

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <CareerHero />
      
      {/* Interactive Work Culture Section */}
      <InteractiveWorkCulture />
      
      {/* Employee Reviews Section */}
      <EmployeeReviews />
      
      {/* Benefits Section with Animation */}
      <BenefitsSection />
      
      {/* Application Form Section with Multi-step Process */}
      <ApplicationForm />
      
      <Footer />
    </div>
  );
};

export default Careers;
