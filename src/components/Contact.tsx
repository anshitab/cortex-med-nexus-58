import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Submission failed.');
      }

      toast({
        title: "Inquiry Submitted",
        description: "Thank you for contacting CORTEX Medical Inc. We'll respond shortly!",
        duration: 5000,
      });
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  return <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cortex-blue/5 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cortex-red/5 rounded-full -translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4 opacity-0 animate-fade-in">
            Contact <span className="text-cortex-blue">CORTEX</span> Medical
          </h2>
          <p className="text-gray-700 opacity-0 animate-fade-in delay-1">
            Have questions about our pharmaceutical manufacturing services? Reach out to our team for prompt assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg border border-cortex-blue/10 p-8 opacity-0 animate-fade-in-right delay-2">
            <h3 className="text-2xl font-semibold text-cortex-darkBlue mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input id="phone" name="phone" placeholder="+1 (123) 456-7890" value={formData.phone} onChange={handleChange} className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">Company Name</label>
                  <Input id="company" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
                <Textarea id="message" name="message" placeholder="Tell us about your pharmaceutical manufacturing needs..." rows={5} value={formData.message} onChange={handleChange} required className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue resize-none" />
              </div>
              
              <Button type="submit" className="w-full bg-cortex-blue hover:bg-cortex-darkBlue text-white flex items-center justify-center" disabled={loading}>
                {loading ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span> : <span className="flex items-center">
                    Send Message
                    <Send className="ml-2" size={16} />
                  </span>}
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between opacity-0 animate-fade-in delay-3">
            <div className="bg-gradient-to-br from-cortex-blue to-cortex-darkBlue rounded-xl shadow-lg p-8 text-white mb-8">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-white/80">+91-9855537870</p>
                    <p className="text-white/80">+91-7529858700</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-white/80">info@cortexmedical.in</p>
                    <p className="text-white/80">sales@cortexmedical.in</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-white/80">Plot 3F Apperal Park, Industrial Area</p>
                    <p className="text-white/80">Katha-Baddi, 173205, Himachal Pardesh</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Business Hours</h4>
                    <p className="text-white/80">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-white/80">
                  </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-cortex-gray rounded-xl border border-cortex-blue/10 p-6">
              <h3 className="text-xl font-semibold text-cortex-darkBlue mb-4">Quick Inquiry</h3>
              <p className="text-gray-700 mb-6">
                Need information urgently? Our team is ready to assist you with any questions about our pharmaceutical manufacturing services.
              </p>
              <Button className="w-full bg-cortex-blue hover:bg-cortex-darkBlue text-white" onClick={() => {
              document.getElementById('name')?.focus();
            }}>
                Send Quick Inquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;