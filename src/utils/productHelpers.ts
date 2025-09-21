// Helper function to get random elements from an array
export const getRandomElements = (array: any[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to extract strength from a product name
export function extractStrength(name: string): string | null {
  const mgMatch = name.match(/\d+(\.\d+)?\s*mg/i);
  const mcgMatch = name.match(/\d+(\.\d+)?\s*mcg/i);
  const iuMatch = name.match(/\d+(\.\d+)?\s*IU/i);
  
  if (mgMatch) return mgMatch[0];
  if (mcgMatch) return mcgMatch[0];
  if (iuMatch) return iuMatch[0];
  
  return null;
}

// Helper function to remove strength from a product name
export function removeStrengthFromName(name: string): string {
  // First, try to match a pattern like "Drug Name XX mg"
  let cleanedName = name.replace(/\s+\d+(\.\d+)?\s*(mg|mcg|IU)/i, '');
  
  // If there are combinations with +, keep the names but remove strengths
  if (cleanedName.includes('+')) {
    const parts = cleanedName.split('+').map(part => part.trim());
    const cleanedParts = parts.map(part => part.replace(/\d+(\.\d+)?\s*(mg|mcg|IU)/gi, '').trim());
    cleanedName = cleanedParts.join(' + ');
  }
  
  // Clean up any extra spaces
  return cleanedName.replace(/\s+/g, ' ').trim();
}
