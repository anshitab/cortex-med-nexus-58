
import { TabletProduct } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ProductListProps {
  products: TabletProduct[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewDetails: (product: TabletProduct) => void;
}

export const ProductList = ({ products, currentPage, totalPages, onPageChange, onViewDetails }: ProductListProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
      
      <Pagination className="mt-12">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }} 
              />
            </PaginationItem>
          )}
          
          {getPageNumbers().map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === 'ellipsis-start' || pageNum === 'ellipsis-end' ? (
                <span className="px-4">...</span>
              ) : (
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === pageNum}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNum as number);
                  }}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }} 
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
