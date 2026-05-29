import { Router, Request, Response } from 'express';
import { AnalyticsEvent, IAnalyticsEvent } from '../models/AnalyticsEvent';

const router = Router();

// POST /api/analytics/event — store a single event
router.post('/event', async (req: Request, res: Response) => {
  const { type, timestamp, ...rest } = req.body;

  if (!type || !timestamp) {
    res.status(400).json({ error: 'type and timestamp are required.' });
    return;
  }

  try {
    await AnalyticsEvent.create({ type, timestamp, ...rest });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Failed to save analytics event:', err);
    res.status(500).json({ error: 'Failed to save event.' });
  }
});

// GET /api/analytics — return aggregated analytics
router.get('/', async (_req: Request, res: Response) => {
  try {
    const events = await AnalyticsEvent.find().lean() as IAnalyticsEvent[];

    const searches     = events.filter(e => e.type === 'search');
    const filters      = events.filter(e => e.type === 'filter');
    const views        = events.filter(e => e.type === 'productView');
    const chatOpens    = events.filter(e => e.type === 'chatOpen');
    const chatMessages = events.filter(e => e.type === 'chatMessage');

    // Top search terms
    const termCounts: Record<string, number> = {};
    for (const e of searches)
      if (e.term) termCounts[e.term] = (termCounts[e.term] ?? 0) + 1;
    const topSearchTerms = Object.entries(termCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Category filter usage
    const categoryCounts: Record<string, number> = {};
    for (const e of filters.filter(f => f.filterType === 'category'))
      if (e.value) categoryCounts[e.value] = (categoryCounts[e.value] ?? 0) + 1;
    const categoryFilterUsage = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Therapeutic area usage
    const areaCounts: Record<string, number> = {};
    for (const e of filters.filter(f => f.filterType === 'therapeuticArea'))
      if (e.value) areaCounts[e.value] = (areaCounts[e.value] ?? 0) + 1;
    const therapeuticAreaUsage = Object.entries(areaCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Top viewed products
    const viewCounts: Record<string, { name: string; count: number }> = {};
    for (const e of views) {
      if (!e.productId) continue;
      if (!viewCounts[e.productId])
        viewCounts[e.productId] = { name: e.productName ?? e.productId, count: 0 };
      viewCounts[e.productId].count += 1;
    }
    const topViewedProducts = Object.values(viewCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top chat questions
    const questionCounts: Record<string, number> = {};
    for (const e of chatMessages)
      if (e.message) questionCounts[e.message] = (questionCounts[e.message] ?? 0) + 1;
    const topChatQuestions = Object.entries(questionCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
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
    });
  } catch (err) {
    console.error('Failed to aggregate analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
});

// DELETE /api/analytics — clear all events
router.delete('/', async (_req: Request, res: Response) => {
  try {
    await AnalyticsEvent.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to clear analytics:', err);
    res.status(500).json({ error: 'Failed to clear analytics.' });
  }
});

export default router;
