
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowUp, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If we're on the home page, scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home page with the section hash
      window.location.href = `/#${sectionId}`;
    }
  };
  
  return (
    <footer className="bg-cortex-darkBlue text-white pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-cortex-blue to-cortex-darkBlue opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div>
            <img src="/lovable-uploads/78016c50-c4c8-409e-b336-a4919bc6e800.png" alt="CORTEX Medical Inc Logo" className="h-12 mb-6" />
            <p className="text-white/70 mb-6">
              CORTEX Medical Inc. is a Schedule-M GMP-GLP certified pharmaceutical manufacturer specialized in tablet and capsule manufacturing with 600+ approved formulations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cortex-blue transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cortex-blue transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cortex-blue transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cortex-blue transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about" 
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => handleNavigation(e, 'about')}
                >
                  About Us
                </a>
              </li>
              <li>
                <Link to="/products" className="text-white/70 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => handleNavigation(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Tablet Manufacturing</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Capsule Manufacturing</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Custom Formulations</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Quality Testing</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">Regulatory Support</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mt-1 mr-2 flex-shrink-0" size={16} />
                <span className="text-white/70">info@cortexmedical.in</span>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-2 flex-shrink-0" size={16} />
                <span className="text-white/70">sales@cortexmedical.in</span>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                  onClick={(e) => handleNavigation(e, 'contact')}
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="ml-1" size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CORTEX Medical Inc. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a>
          </p>
          
          <button onClick={scrollToTop} className="bg-cortex-blue hover:bg-cortex-lightBlue transition-colors w-10 h-10 rounded-full flex items-center justify-center" aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
