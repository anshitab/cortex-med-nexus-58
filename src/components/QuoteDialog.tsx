
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteDialog = ({ open, onOpenChange }: QuoteDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a toast message
    toast({
      title: "Quote Request Submitted",
      description: "Thank you for your interest! We'll get back to you shortly.",
      variant: "default",
    });
    
    // Reset form and close dialog
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cortex-darkBlue">Request a Quote</DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill out the form below and our team will get back to you with a customized quote for your pharmaceutical manufacturing needs.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (123) 456-7890"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Project Details</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-cortex-blue"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="submit" className="bg-cortex-blue hover:bg-cortex-darkBlue text-white w-full">
              <Check className="mr-2 h-4 w-4" /> Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
