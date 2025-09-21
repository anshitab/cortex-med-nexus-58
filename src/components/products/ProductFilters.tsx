
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  uniqueCategories: string[];
  uniqueTherapeuticAreas: string[];
  selectedCategory?: string;
  selectedTherapeuticArea?: string;
  onCategorySelect: (category: string) => void;
  onTherapeuticAreaSelect: (area: string) => void;
  onClearFilters: () => void;
  productDatabase: any[];
}

export const ProductFilters = ({
  uniqueCategories,
  uniqueTherapeuticAreas,
  selectedCategory,
  selectedTherapeuticArea,
  onCategorySelect,
  onTherapeuticAreaSelect,
  onClearFilters,
  productDatabase
}: ProductFiltersProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-cortex-darkBlue mb-4">Filters</h3>
        {(selectedCategory || selectedTherapeuticArea) && (
          <Button 
            variant="ghost" 
            className="text-sm text-gray-500 h-8 px-2"
            onClick={onClearFilters}
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-cortex-darkBlue mb-2">Categories</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {uniqueCategories.map(category => (
              <div 
                key={category} 
                className={`flex items-center justify-between group cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors ${selectedCategory === category ? 'bg-cortex-blue/10' : ''}`}
                onClick={() => onCategorySelect(selectedCategory === category ? undefined : category)}
              >
                <span className={`${selectedCategory === category ? 'text-cortex-blue font-medium' : 'text-gray-700'} group-hover:text-cortex-blue transition-colors`}>
                  {category}
                </span>
                <Badge variant="outline" className="bg-white text-gray-600">
                  {productDatabase.filter(p => p.category === category).length}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-cortex-darkBlue mb-2">Therapeutic Areas</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {uniqueTherapeuticAreas.map(area => (
              <div 
                key={area} 
                className={`flex items-center justify-between group cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors ${selectedTherapeuticArea === area ? 'bg-cortex-blue/10' : ''}`}
                onClick={() => onTherapeuticAreaSelect(selectedTherapeuticArea === area ? undefined : area)}
              >
                <span className={`${selectedTherapeuticArea === area ? 'text-cortex-blue font-medium' : 'text-gray-700'} group-hover:text-cortex-blue transition-colors`}>
                  {area}
                </span>
                <Badge variant="outline" className="bg-white text-gray-600">
                  {productDatabase.filter(p => p.therapeuticArea === area).length}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
