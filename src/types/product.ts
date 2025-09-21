
export type TabletProduct = {
  id: string;
  code: string;
  name: string;
  category: 'Tablets' | 'Capsules';
  description: string;
  strengths: string[];
  certifications: string[];
  therapeuticArea: string;
  composition?: string;
};

export type ProductFilters = {
  category?: string;
  searchTerm?: string;
  therapeuticArea?: string;
};
