
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Phone } from 'lucide-react';
import ConsultationDialog from '@/components/ConsultationDialog';

export const ProductCTA = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-r from-cortex-blue/5 to-cortex-darkBlue/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-cortex-darkBlue mb-4">Need Assistance?</h2>
          <p className="text-gray-700 mb-8">
            Our team is ready to provide detailed information about our products and assist with your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-cortex-blue hover:bg-cortex-darkBlue text-white px-8 py-6 flex items-center gap-2"
              onClick={() => setDialogOpen(true)}
            >
              <FileText size={18} />
              <span>Request a Consultation</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-cortex-blue text-cortex-blue hover:bg-cortex-blue hover:text-white px-8 py-6 flex items-center gap-2"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Phone size={18} />
              <span>Schedule a Call</span>
            </Button>
          </div>
        </div>
      </div>

      <ConsultationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};
