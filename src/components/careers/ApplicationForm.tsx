
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, FileText, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type FormData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resume: File | null;
  coverLetter: string;
};

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: ''
  });

  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files?.[0] || null
      }));
    }
  };

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormStep(1);
    setTimeout(() => {
      document.getElementById('form-step-2')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: "Thank you for your application. We'll review your details and get back to you shortly!",
        duration: 5000
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
        coverLetter: ''
      });
      setLoading(false);
      setFormStep(0);
    }, 1500);
  };

  return (
    <section id="apply-form" className="py-20 bg-cortex-gray/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
              Apply <span className="text-cortex-blue">Now</span>
            </h2>
            <p className="text-gray-700">
              Take the first step toward an exciting career at CORTEX Medical Inc.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-cortex-blue/10 p-8">
            <div className="flex justify-between items-center mb-8">
              <div className={`flex items-center ${formStep >= 0 ? 'text-cortex-blue' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${formStep >= 0 ? 'bg-cortex-blue text-white' : 'bg-gray-200'}`}>1</div>
                <span className="hidden md:inline font-medium">Basic Information</span>
              </div>
              <div className={`h-0.5 flex-grow mx-4 ${formStep >= 1 ? 'bg-cortex-blue' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${formStep >= 1 ? 'text-cortex-blue' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${formStep >= 1 ? 'bg-cortex-blue text-white' : 'bg-gray-200'}`}>2</div>
                <span className="hidden md:inline font-medium">Professional Details</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {formStep === 0 ? (
                <div className="space-y-6 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue transition-all duration-300" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue transition-all duration-300" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      placeholder="+91 1234567890" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                      className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue transition-all duration-300" 
                    />
                  </div>
                  
                  <Button 
                    onClick={handleNextStep}
                    className="w-full bg-cortex-blue hover:bg-cortex-darkBlue text-white py-6 transition-all duration-300 transform hover:scale-[1.02]" 
                    disabled={!formData.name || !formData.email || !formData.phone}
                  >
                    Continue to Professional Details
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              ) : (
                <div id="form-step-2" className="space-y-6 transition-all duration-300">
                  <div className="space-y-2">
                    <label htmlFor="position" className="text-sm font-medium text-gray-700">Position Applied For *</label>
                    <Input 
                      id="position" 
                      name="position" 
                      placeholder="Quality Control Chemist" 
                      value={formData.position} 
                      onChange={handleChange} 
                      required 
                      className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue transition-all duration-300" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium text-gray-700">Years of Experience *</label>
                    <Input 
                      id="experience" 
                      name="experience" 
                      placeholder="3 years" 
                      value={formData.experience} 
                      onChange={handleChange} 
                      required 
                      className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue transition-all duration-300" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="resume" className="text-sm font-medium text-gray-700">Upload Resume (PDF) *</label>
                    <div className="border-2 border-dashed border-cortex-blue/20 rounded-lg p-6 transition-all duration-300 hover:border-cortex-blue/40 bg-cortex-blue/5">
                      <div className="flex flex-col items-center text-center">
                        <FileText size={32} className="text-cortex-blue mb-3" />
                        <p className="mb-2 text-sm text-gray-700">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                        <Input 
                          id="resume" 
                          name="resume" 
                          type="file" 
                          accept=".pdf" 
                          onChange={handleFileChange}
                          required 
                          className="hidden" 
                        />
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('resume')?.click()}
                          className="mt-4 border-cortex-blue text-cortex-blue hover:bg-cortex-blue hover:text-white transition-all duration-300"
                        >
                          Select File
                        </Button>
                        {formData.resume && (
                          <p className="mt-2 text-sm text-green-600">
                            File selected: {formData.resume.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="coverLetter" className="text-sm font-medium text-gray-700">Cover Letter</label>
                    <Textarea 
                      id="coverLetter" 
                      name="coverLetter" 
                      placeholder="Tell us why you're interested in joining CORTEX Medical and what makes you a great fit..." 
                      rows={5} 
                      value={formData.coverLetter} 
                      onChange={handleChange} 
                      className="border-cortex-blue/20 focus:border-cortex-blue focus:ring-cortex-blue resize-none transition-all duration-300" 
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="sm:w-1/3 border-cortex-blue text-cortex-blue hover:bg-cortex-blue/10 transition-all duration-300" 
                      onClick={() => setFormStep(0)}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="sm:w-2/3 bg-cortex-blue hover:bg-cortex-darkBlue text-white flex items-center justify-center py-6 transition-all duration-300 transform hover:scale-[1.02]" 
                      disabled={loading || !formData.position || !formData.experience || !formData.resume}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center text-lg">
                          Submit Application
                          <Send className="ml-2" size={18} />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
