
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const ProductSearch = ({ searchTerm, onSearchChange, onSubmit }: ProductSearchProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full md:w-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search products..." 
          className="pl-10 w-full border-gray-300 focus:border-cortex-blue"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)} 
        />
      </div>
      <Button type="submit" variant="outline" className="border-gray-300">
        <Search size={16} />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};
