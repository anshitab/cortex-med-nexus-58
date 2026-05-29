
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, BookOpen, Beaker, Award, Microscope, Factory, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ConsultationDialog from '@/components/ConsultationDialog';

const Services = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainServices = [
    {
      id: 'contract-manufacturing',
      title: 'Contract Manufacturing',
      description: 'End-to-end manufacturing solutions tailored to your specific requirements.',
      icon: Factory,
      features: [
        'State-of-the-art manufacturing facilities',
        'Strict quality control procedures',
        'Schedule-M and GMP compliance',
        'Flexible batch sizes to meet your needs',
        'Timely production and delivery'
      ]
    },
    {
      id: 'formulation-development',
      title: 'Formulation Development',
      description: 'Expert formulation development services for various pharmaceutical products.',
      icon: Beaker,
      features: [
        'Pre-formulation studies',
        'Analytical method development',
        'Stability testing and studies',
        'Technology transfer',
        'Scale-up optimization'
      ]
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance',
      description: 'Comprehensive quality assurance and testing services to ensure product safety and efficacy.',
      icon: Award,
      features: [
        'In-process quality control',
        'Finished product testing',
        'Stability studies',
        'Method validation',
        'Regulatory documentation'
      ]
    },
    {
      id: 'regulatory-support',
      title: 'Regulatory Support',
      description: 'Complete regulatory support for domestic and international markets.',
      icon: BookOpen,
      features: [
        'Dossier preparation',
        'Registration assistance',
        'Regulatory compliance consulting',
        'Post-approval changes',
        'Regulatory audits support'
      ]
    }
  ];

  const faqs = [
    {
      question: "What types of pharmaceutical products do you manufacture?",
      answer: "CORTEX Medical specializes in the manufacturing of solid oral dosage forms, including tablets and capsules. We have the capability to produce over 600 approved formulations across various therapeutic categories."
    },
    {
      question: "What certifications does your manufacturing facility have?",
      answer: "Our state-of-the-art manufacturing facility is Schedule-M GMP-GLP certified. We also maintain ISO 9001:2015 certification and adhere to international quality standards to ensure the highest quality products."
    },
    {
      question: "Can you provide custom formulation development services?",
      answer: "Yes, we offer comprehensive formulation development services. Our R&D team works closely with clients to develop custom formulations according to specific requirements, conduct stability studies, and optimize manufacturing processes."
    },
    {
      question: "What is your production capacity?",
      answer: "Our manufacturing facility is equipped with high-capacity production lines that can handle various batch sizes. We can accommodate both small-scale and large-scale production requirements, with the flexibility to scale up as needed."
    },
    {
      question: "Do you provide regulatory support for product registration?",
      answer: "Yes, we offer complete regulatory support services, including dossier preparation, documentation, and assistance with product registration in various markets. Our regulatory affairs team has extensive experience in navigating complex regulatory requirements."
    },
    {
      question: "What is your quality control process?",
      answer: "We implement a rigorous quality control process that includes in-process testing, finished product analysis, and stability studies. Our well-equipped QC laboratory ensures that all products meet the specified quality parameters and regulatory requirements."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-cortex-blue/10 to-cortex-gray/30 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-cortex-blue/10 to-cortex-lightBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-cortex-red/10 to-cortex-blue/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-cortex-darkBlue mb-6 opacity-0 animate-fade-in">
              Our <span className="text-cortex-blue">Services</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 opacity-0 animate-fade-in delay-1">
              CORTEX Medical offers comprehensive pharmaceutical manufacturing services with the highest quality standards and regulatory compliance.
            </p>
            <div className="opacity-0 animate-fade-in delay-2">
              <Button
                className="bg-cortex-blue hover:bg-cortex-darkBlue text-white px-8 py-6 text-lg"
                onClick={() => document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Our Services <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section id="services-list" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
              Comprehensive <span className="text-cortex-blue">Pharmaceutical Services</span>
            </h2>
            <p className="text-gray-700">
              From formulation development to contract manufacturing, we provide end-to-end solutions for the pharmaceutical industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {mainServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-cortex-blue/10 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="p-8">
                  <div className="w-16 h-16 bg-cortex-blue/10 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="text-cortex-blue" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-cortex-darkBlue mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <h4 className="font-medium text-cortex-darkBlue mb-3">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-cortex-blue mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-cortex-gray/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
              Why Choose <span className="text-cortex-blue">CORTEX Medical</span>
            </h2>
            <p className="text-gray-700">
              Our commitment to quality, compliance, and customer satisfaction sets us apart in the pharmaceutical industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-cortex-blue/10 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-cortex-blue" size={24} />
                </div>
                <CardTitle className="text-cortex-darkBlue">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our rigorous quality management system ensures consistent product quality that meets international standards.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-cortex-blue/10 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Microscope className="text-cortex-blue" size={24} />
                </div>
                <CardTitle className="text-cortex-darkBlue">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our facilities and processes adhere to Schedule-M, GMP, and other regulatory requirements to ensure compliant products.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-cortex-blue/10 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cortex-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="text-cortex-blue" size={24} />
                </div>
                <CardTitle className="text-cortex-darkBlue">Customer Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We work closely with clients to understand their specific needs and provide tailored solutions with timely delivery.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cortex-darkBlue mb-4">
                Frequently Asked <span className="text-cortex-blue">Questions</span>
              </h2>
              <p className="text-gray-700">
                Find answers to common questions about our pharmaceutical services.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-cortex-darkBlue">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-cortex-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-cortex-darkBlue mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-8">
              Contact us today to discuss your pharmaceutical manufacturing needs and how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-cortex-blue hover:bg-cortex-darkBlue text-white px-8 py-6"
                onClick={() => setDialogOpen(true)}
              >
                Request a Consultation
              </Button>
              <Button
                variant="outline"
                className="border-cortex-blue text-cortex-blue hover:bg-cortex-blue hover:text-white px-8 py-6"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add the ConsultationDialog */}
      <ConsultationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      
      <Footer />
    </div>
  );
};

export default Services;
