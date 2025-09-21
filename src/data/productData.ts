
import { TabletProduct, ProductFilters } from "@/types/product";
import { tabletsRawData, capsulesRawData, therapeuticAreas, certifications } from './rawProductData';
import { getRandomElements, extractStrength, removeStrengthFromName } from '@/utils/productHelpers';

// Process the raw data to merge items with the same base name but different strengths
const processRawData = (rawData: any[]): TabletProduct[] => {
  const productMap = new Map<string, any>();
  
  rawData.forEach(item => {
    // Extract strength from the name
    let strength = extractStrength(item.name);
    
    // Remove strength and get base product name
    const baseName = removeStrengthFromName(item.name);
    
    // Generate a unique key for the product (ignoring strength)
    const key = baseName.toLowerCase().replace(/\s+/g, '_');
    
    if (productMap.has(key)) {
      // If we've already seen this product, add this strength to it
      const existingProduct = productMap.get(key);
      if (strength && !existingProduct.strengths.includes(strength)) {
        existingProduct.strengths.push(strength);
        // Sort strengths in ascending order (numerically if possible)
        existingProduct.strengths.sort((a: string, b: string) => {
          const numA = parseInt(a);
          const numB = parseInt(b);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return a.localeCompare(b);
        });
      }
    } else {
      // Create a new product
      const certCount = Math.floor(Math.random() * 3) + 1;
      const productCertifications = getRandomElements(certifications, certCount);
      const randomArea = therapeuticAreas[Math.floor(Math.random() * therapeuticAreas.length)];
      
      // Determine therapeutic area based on product name for more realistic categorization
      let assignedArea = randomArea;
      const nameLower = baseName.toLowerCase();
      
      if (nameLower.includes('acarbose') || nameLower.includes('gliben') || nameLower.includes('canagliflozin')) {
        assignedArea = 'Anti-diabetic';
      } else if (nameLower.includes('azithromycin') || nameLower.includes('cephalexin')) {
        assignedArea = 'Antibiotic';
      } else if (nameLower.includes('aceclofenac') || nameLower.includes('diclofenac')) {
        assignedArea = 'Analgesic';
      } else if (nameLower.includes('amlodipin') || nameLower.includes('atenolol') || nameLower.includes('carvedilol')) {
        assignedArea = 'Antihypertensive';
      } else if (nameLower.includes('atorvastatin') || nameLower.includes('fenofibrate')) {
        assignedArea = 'Lipid-lowering';
      }
      
      productMap.set(key, {
        id: `prod-${item.category.toLowerCase()}-${key}`,
        code: item.code,
        name: baseName,
        category: item.category,
        description: `Pharmaceutical formulation of ${baseName} available in ${strength ? 'various strengths' : 'standard formulation'}`,
        strengths: strength ? [strength] : [],
        certifications: productCertifications,
        therapeuticArea: assignedArea,
        composition: baseName
      });
    }
  });
  
  return Array.from(productMap.values());
};

// Generate the complete product database
export const productDatabase: TabletProduct[] = [
  ...processRawData(tabletsRawData),
  ...processRawData(capsulesRawData)
];

// Get a paginated subset of products
export const getPaginatedProducts = (page: number, limit: number = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return productDatabase.slice(startIndex, endIndex);
};

// Get total number of pages
export const getTotalPages = (limit: number = 20) => {
  return Math.ceil(productDatabase.length / limit);
};

// Filter products by category or search term
export const filterProducts = (filters: ProductFilters, page: number, limit: number = 20) => {
  let filtered = [...productDatabase];
  
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  if (filters.therapeuticArea) {
    filtered = filtered.filter(product => product.therapeuticArea === filters.therapeuticArea);
  }
  
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.description.toLowerCase().includes(term) ||
      product.composition?.toLowerCase().includes(term)
    );
  }
  
  const totalFilteredPages = Math.ceil(filtered.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    products: filtered.slice(startIndex, endIndex),
    totalPages: totalFilteredPages,
    totalProducts: filtered.length
  };
};
