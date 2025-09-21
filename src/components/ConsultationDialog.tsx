
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationDialog = ({ open, onOpenChange }: ConsultationDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success message
    toast({
      title: "Consultation Request Submitted",
      description: "Thank you for your interest! One of our experts will contact you shortly.",
      variant: "default",
    });
    
    // Reset form and close dialog
    setName('');
    setEmail('');
    setPhone('');
    setRequirements('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cortex-darkBlue">Request a Consultation</DialogTitle>
          <DialogDescription className="text-gray-600">
            Schedule a consultation with our pharmaceutical experts to discuss your product development needs.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="cons-name" className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="cons-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cons-email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="cons-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cons-phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="cons-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (123) 456-7890"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cons-requirements" className="text-sm font-medium text-gray-700">Requirements (Optional)</label>
            <textarea
              id="cons-requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Briefly describe your product requirements or questions..."
              className="w-full p-2 border border-gray-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-cortex-blue"
            />
          </div>
          
          <DialogFooter>
            <Button type="submit" className="bg-cortex-blue hover:bg-cortex-darkBlue text-white w-full">
              <Check className="mr-2 h-4 w-4" /> Schedule Consultation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
