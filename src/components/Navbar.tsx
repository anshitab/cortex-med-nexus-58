
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import QuoteDialog from '@/components/QuoteDialog';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If we're on the home page, scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      // If we're on another page, navigate to home page with the section hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/78016c50-c4c8-409e-b336-a4919bc6e800.png" 
              alt="CORTEX Medical Inc Logo" 
              className="h-12 md:h-14"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#about" 
              className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors"
              onClick={(e) => handleNavigation(e, 'about')}
            >
              About
            </a>
            <Link to="/products" className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors">Products</Link>
            <Link to="/services" className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors">Services</Link>
            <Link to="/careers" className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors">Careers</Link>
            <a 
              href="#contact" 
              className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors"
              onClick={(e) => handleNavigation(e, 'contact')}
            >
              Contact
            </a>
            <Button 
              className="bg-cortex-blue hover:bg-cortex-darkBlue text-white"
              onClick={() => setQuoteDialogOpen(true)}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-cortex-darkBlue" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out overflow-hidden shadow-md",
        isOpen ? "max-h-96 py-4" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a 
            href="#about" 
            className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors py-2" 
            onClick={(e) => handleNavigation(e, 'about')}
          >
            About
          </a>
          <Link to="/products" className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors py-2" onClick={toggleMenu}>Products</Link>
          <Link to="/services" className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors py-2" onClick={toggleMenu}>Services</Link>
          <Link to="/careers" className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors py-2" onClick={toggleMenu}>Careers</Link>
          <a 
            href="#contact" 
            className="text-cortex-darkBlue font-medium hover:text-cortex-blue transition-colors py-2" 
            onClick={(e) => handleNavigation(e, 'contact')}
          >
            Contact
          </a>
          <Button 
            className="bg-cortex-blue hover:bg-cortex-darkBlue text-white w-full"
            onClick={() => {
              setQuoteDialogOpen(true);
              toggleMenu();
            }}
          >
            Get a Quote
          </Button>
        </div>
      </div>

      {/* Quote Dialog */}
      <QuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
    </nav>
  );
};

export default Navbar;
