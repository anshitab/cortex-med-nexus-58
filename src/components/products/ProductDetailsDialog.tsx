
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TabletProduct } from "@/types/product";
import { Separator } from "@/components/ui/separator";
import { Pill, Tablet } from "lucide-react";

interface ProductDetailsDialogProps {
  product: TabletProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsDialog = ({
  product,
  isOpen,
  onClose,
}: ProductDetailsDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-cortex-darkBlue">
              {product.name}
            </DialogTitle>
            <Badge variant="outline" className="ml-2">
              {product.code}
            </Badge>
          </div>
          <DialogDescription className="text-gray-600 mt-2">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
            <div className="flex items-center text-cortex-blue">
              {product.category === 'Tablets' ? (
                <>
                  <Tablet className="h-4 w-4 mr-1" />
                  <span>Tablets</span>
                </>
              ) : (
                <>
                  <Pill className="h-4 w-4 mr-1" />
                  <span>Capsules</span>
                </>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Therapeutic Area</h4>
            <p className="text-gray-600">{product.therapeuticArea}</p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {product.strengths.map((strength, idx) => (
                <Badge key={idx} variant="secondary">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert, idx) => (
                <Badge key={idx} variant="outline" className="bg-cortex-blue/10 text-cortex-blue">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {product.composition && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Composition</h4>
                <p className="text-gray-600">{product.composition}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
