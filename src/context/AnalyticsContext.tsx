import { createContext, useCallback, useContext, useState } from 'react';

// --- Event types ---
type SearchEvent      = { type: 'search';      term: string;       timestamp: number };
type FilterEvent      = { type: 'filter';       filterType: 'category' | 'therapeuticArea'; value: string; timestamp: number };
type ProductViewEvent = { type: 'productView'; productId: string;  productName: string; timestamp: number };
type ChatOpenEvent    = { type: 'chatOpen';    timestamp: number };
type ChatMessageEvent = { type: 'chatMessage'; message: string;    timestamp: number };
export type AnalyticsEvent = SearchEvent | FilterEvent | ProductViewEvent | ChatOpenEvent | ChatMessageEvent;

// --- Aggregated output ---
export type AggregatedAnalytics = {
  totalSearches: number;
  totalFilterUses: number;
  totalProductViews: number;
  totalChatOpens: number;
  totalChatMessages: number;
  topSearchTerms:       { term: string; count: number }[];
  categoryFilterUsage:  { name: string; count: number }[];
  therapeuticAreaUsage: { name: string; count: number }[];
  topViewedProducts:    { name: string; count: number }[];
  topChatQuestions:     { term: string; count: number }[];
};

// --- localStorage helpers ---
const STORAGE_KEY = 'cortex_analytics_events';

function loadEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEvents(events: AnalyticsEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // ignore storage errors
  }
}

// --- Context ---
type AnalyticsContextValue = {
  trackEvent: (event: AnalyticsEvent) => void;
  getAnalytics: () => AggregatedAnalytics;
  clearAnalytics: () => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => loadEvents());

  const trackEvent = useCallback((event: AnalyticsEvent) => {
    setEvents(prev => {
      const updated = [...prev, event];
      saveEvents(updated);
      return updated;
    });
    // Fire-and-forget to backend
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/analytics/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(() => {});
    }
  }, []);

  const getAnalytics = useCallback((): AggregatedAnalytics => {
    const searches     = events.filter(e => e.type === 'search')      as SearchEvent[];
    const filters      = events.filter(e => e.type === 'filter')      as FilterEvent[];
    const views        = events.filter(e => e.type === 'productView') as ProductViewEvent[];
    const chatOpens    = events.filter(e => e.type === 'chatOpen');
    const chatMessages = events.filter(e => e.type === 'chatMessage') as ChatMessageEvent[];

    // Top search terms
    const termCounts: Record<string, number> = {};
    for (const e of searches) termCounts[e.term] = (termCounts[e.term] ?? 0) + 1;
    const topSearchTerms = Object.entries(termCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Category filter usage
    const categoryCounts: Record<string, number> = {};
    for (const e of filters.filter(f => f.filterType === 'category'))
      categoryCounts[e.value] = (categoryCounts[e.value] ?? 0) + 1;
    const categoryFilterUsage = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Therapeutic area usage
    const areaCounts: Record<string, number> = {};
    for (const e of filters.filter(f => f.filterType === 'therapeuticArea'))
      areaCounts[e.value] = (areaCounts[e.value] ?? 0) + 1;
    const therapeuticAreaUsage = Object.entries(areaCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Top viewed products
    const viewCounts: Record<string, { name: string; count: number }> = {};
    for (const e of views) {
      if (!viewCounts[e.productId]) viewCounts[e.productId] = { name: e.productName, count: 0 };
      viewCounts[e.productId].count += 1;
    }
    const topViewedProducts = Object.values(viewCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top chat questions
    const questionCounts: Record<string, number> = {};
    for (const e of chatMessages) {
      const q = e.message.trim();
      questionCounts[q] = (questionCounts[q] ?? 0) + 1;
    }
    const topChatQuestions = Object.entries(questionCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalSearches:     searches.length,
      totalFilterUses:   filters.length,
      totalProductViews: views.length,
      totalChatOpens:    chatOpens.length,
      totalChatMessages: chatMessages.length,
      topSearchTerms,
      categoryFilterUsage,
      therapeuticAreaUsage,
      topViewedProducts,
      topChatQuestions,
    };
  }, [events]);

  const clearAnalytics = useCallback(() => {
    setEvents([]);
    saveEvents([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/analytics`, { method: 'DELETE' }).catch(() => {});
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ trackEvent, getAnalytics, clearAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextValue {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used within <AnalyticsProvider>');
  return ctx;
}
