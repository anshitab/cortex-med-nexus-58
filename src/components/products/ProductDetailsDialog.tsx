import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TabletProduct } from "@/types/product";
import { productDatabase } from "@/data/productData";
import { Separator } from "@/components/ui/separator";
import { Pill, Tablet, Sparkles } from "lucide-react";

interface ProductDetailsDialogProps {
  product: TabletProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

// --- Combination types ---
type Combination = { drug: string; reason: string };

function buildCatalogContext(current: TabletProduct): string {
  // Same therapeutic area first, then others — cap at 80 products to stay within token limits
  const sameArea = productDatabase
    .filter(p => p.id !== current.id && p.therapeuticArea === current.therapeuticArea);
  const otherArea = productDatabase
    .filter(p => p.id !== current.id && p.therapeuticArea !== current.therapeuticArea);

  const pool = [...sameArea, ...otherArea].slice(0, 80);
  return pool
    .map(p => `${p.name}${p.strengths.length ? ' ' + p.strengths.join('/') : ''} (${p.therapeuticArea})`)
    .join('\n');
}

async function fetchCombinations(product: TabletProduct): Promise<Combination[]> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("VITE_GROQ_API_KEY is not set");

  const catalogContext = buildCatalogContext(product);

  const prompt = `You are a pharmaceutical expert advising B2B buyers for CORTEX Medical Inc.

Current product:
- Name: ${product.name}${product.strengths.length ? ' (' + product.strengths.join('/') + ')' : ''}
- Therapeutic Area: ${product.therapeuticArea}
${product.composition ? `- Composition: ${product.composition}` : `- Description: ${product.description}`}

CORTEX Medical catalog (suggest ONLY from this list):
${catalogContext}

Suggest exactly 3 products from the catalog above that are commonly co-prescribed or combined with the current product in clinical practice. Do NOT suggest products outside the catalog.

Respond ONLY with a raw JSON array of 3 objects — no markdown, no code fences, no extra text:
[{"drug":"Exact product name from catalog","reason":"One sentence clinical rationale"},...]`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Groq API error ${res.status}`);
  const json = await res.json();
  const content: string = json.choices?.[0]?.message?.content ?? "";

  // Strip markdown fences if present
  const cleaned = content.replace(/```(?:json)?\n?/g, "").trim();

  // Try direct parse
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.slice(0, 3);
  } catch { /* continue */ }

  // Extract first [...] block
  const match = cleaned.match(/\[[\s\S]*?\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed.slice(0, 3);
    } catch { /* continue */ }
  }

  throw new Error("Could not parse combinations from response.");
}

// --- Dialog ---
export const ProductDetailsDialog = ({
  product,
  isOpen,
  onClose,
}: ProductDetailsDialogProps) => {
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [loadingCombos, setLoadingCombos] = useState(false);
  const [comboError, setComboError] = useState("");

  useEffect(() => {
    if (!isOpen || !product) return;
    setCombinations([]);
    setComboError("");
    setLoadingCombos(true);
    fetchCombinations(product)
      .then(setCombinations)
      .catch((err) => {
        console.error("Combination suggestions error:", err);
        setComboError(err instanceof Error ? err.message : "Could not load suggestions.");
      })
      .finally(() => setLoadingCombos(false));
  }, [isOpen, product?.id]);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
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
              {product.category === "Tablets" ? (
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

          {/* AI Combination Suggestions */}
          <Separator />
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cortex-blue" />
              AI-Powered Combination Suggestions
            </h4>

            {loadingCombos && (
              <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                <svg className="animate-spin h-4 w-4 text-cortex-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating combination suggestions...
              </div>
            )}

            {comboError && (
              <p className="text-sm text-red-500">{comboError}</p>
            )}

            {!loadingCombos && combinations.length > 0 && (
              <div className="space-y-3">
                {combinations.map((combo, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cortex-blue text-white text-xs flex items-center justify-center font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-cortex-darkBlue">{combo.drug}</p>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{combo.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
