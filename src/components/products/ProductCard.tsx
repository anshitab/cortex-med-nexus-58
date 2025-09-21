
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TabletProduct } from '@/types/product';
import { Pill, Tablet } from 'lucide-react';

interface ProductCardProps {
  product: TabletProduct;
  onViewDetails: (product: TabletProduct) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-cortex-darkBlue">{product.name}</h3>
          <Badge className="bg-cortex-blue/10 text-cortex-blue border-none flex items-center gap-1">
            {product.category === 'Tablets' ? (
              <>
                <Tablet size={14} />
                <span>Tablets</span>
              </>
            ) : (
              <>
                <Pill size={14} />
                <span>Capsules</span>
              </>
            )}
          </Badge>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Available Strengths:</h4>
          <div className="flex flex-wrap gap-2">
            {product.strengths.length > 0 ? (
              product.strengths.map((strength, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {strength}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">Standard formulation</span>
            )}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-cortex-blue text-cortex-blue hover:bg-cortex-blue hover:text-white mt-2"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
