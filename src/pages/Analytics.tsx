import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Filter, Search, MessageCircle, Bot, Sparkles, LogOut } from 'lucide-react';
import { ANALYTICS_AUTH_KEY } from '@/pages/AnalyticsLogin';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Cell, PieChart, Pie, ResponsiveContainer,
} from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useAnalytics, AggregatedAnalytics } from '@/context/AnalyticsContext';

const PIE_COLORS: Record<string, string> = { Tablets: '#0047AB', Capsules: '#6699CC' };
const DEFAULT_PIE_COLOR = '#0047AB';

// --- AI Insights ---
function buildInsightsPrompt(data: AggregatedAnalytics): string {
  const topSearches   = data.topSearchTerms.slice(0, 5).map(t => `"${t.term}" (${t.count}x)`).join(', ') || 'none';
  const topProducts   = data.topViewedProducts.slice(0, 5).map(p => `"${p.name}" (${p.count}x)`).join(', ') || 'none';
  const topAreas      = data.therapeuticAreaUsage.slice(0, 5).map(a => `"${a.name}" (${a.count}x)`).join(', ') || 'none';
  const topCategories = data.categoryFilterUsage.map(c => `${c.name}: ${c.count}x`).join(', ') || 'none';
  const topQuestions  = data.topChatQuestions.slice(0, 5).map(q => `"${q.term}"`).join(', ') || 'none';

  return `You are a pharmaceutical product analyst. Based on user browsing behavior on CORTEX Medical Inc.'s product catalog (600+ formulations), generate insights about which products and therapeutic areas users are most interested in.

Browsing data:
- Top searched terms: ${topSearches}
- Most viewed products: ${topProducts}
- Top therapeutic areas browsed: ${topAreas}
- Category preference: ${topCategories}
- Top chatbot questions: ${topQuestions}

Write exactly 5 insights strictly from a product interest perspective — what formulations, therapeutic areas, or product types users are actively looking for. Each insight should mention specific product names or therapeutic areas from the data. Do NOT give website or marketing advice.

You MUST respond with ONLY a raw JSON array of 5 strings — no markdown, no code fences, no explanation. Example: ["Insight 1", "Insight 2", "Insight 3", "Insight 4", "Insight 5"]`;
}

async function fetchInsights(data: AggregatedAnalytics): Promise<string[]> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error('VITE_GROQ_API_KEY is not set');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 1024,
      messages: [{ role: 'user', content: buildInsightsPrompt(data) }],
    }),
  });

  if (!res.ok) throw new Error(`Groq API error ${res.status}`);
  const json = await res.json();
  const content: string = json.choices?.[0]?.message?.content ?? '';

  // 1. Strip markdown code fences
  const cleaned = content.replace(/```(?:json)?\n?/g, '').trim();

  // 2. Try direct JSON parse
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.slice(0, 5);
  } catch { /* continue */ }

  // 3. Try extracting the first [...] block
  const match = cleaned.match(/\[[\s\S]*?\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed.slice(0, 5);
    } catch { /* continue */ }
  }

  // 4. Fall back: split on newlines, strip numbering/bullets
  const lines = cleaned
    .split('\n')
    .map(l => l.replace(/^[\d]+[.)]\s*/, '').replace(/^[-•*]\s*/, '').trim())
    .filter(l => l.length > 20);

  if (lines.length > 0) return lines.slice(0, 5);

  throw new Error('Could not parse insights from the response. Please try again.');
}

function AIInsights({ data }: { data: AggregatedAnalytics }) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const generate = async () => {
    setLoading(true);
    setError('');
    setInsights([]);
    try {
      const result = await fetchInsights(data);
      setInsights(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate insights.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-t-4 border-[#0047AB] mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cortex-blue" />
              AI Insights
            </CardTitle>
            <CardDescription>Groq-powered analysis of your analytics data</CardDescription>
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#0047AB] text-white text-sm font-medium hover:bg-[#003366] transition-colors disabled:opacity-60"
          >
            <Bot className="h-4 w-4" />
            {loading ? 'Generating...' : insights.length ? 'Regenerate' : 'Generate Insights'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!error && insights.length === 0 && !loading && (
          <p className="text-gray-400 text-sm">
            Click "Generate Insights" to get AI-powered analysis of your data.
          </p>
        )}
        {loading && (
          <div className="flex items-center gap-3 text-gray-500 text-sm py-2">
            <svg className="animate-spin h-4 w-4 text-cortex-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Analyzing your data with Groq...
          </div>
        )}
        {insights.length > 0 && (
          <ul className="space-y-3">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0047AB] text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// --- Main page ---
export default function Analytics() {
  const { getAnalytics, clearAnalytics } = useAnalytics();
  const navigate = useNavigate();

  const [data, setData]       = useState<AggregatedAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const loadData = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setData(getAnalytics());
      setLoading(false);
      return;
    }
    setLoading(true);
    setFetchError('');
    fetch(`${apiUrl}/api/analytics`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return res.json();
      })
      .then(json => { setData(json); setLoading(false); })
      .catch(() => {
        setData(getAnalytics()); // fallback to localStorage
        setFetchError('Could not reach server — showing local data.');
        setLoading(false);
      });
  };

  useEffect(() => { loadData(); }, []);

  const handleClear = () => {
    clearAnalytics();
    setData(null);
    loadData();
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ANALYTICS_AUTH_KEY);
    navigate('/analytics/login');
  };

  const isEmpty = !data || (
    data.totalSearches + data.totalFilterUses + data.totalProductViews +
    data.totalChatOpens + data.totalChatMessages === 0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-cortex-darkBlue text-white py-16">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-blue-200 text-lg">
              Product interaction and chatbot insights from your browsing session
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-cortex-darkBlue">Overview</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="px-4 py-2 rounded bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
                    Clear All Analytics Data
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all analytics data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all recorded events including searches, filters, product views, and chat activity.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleClear}>
                      Clear Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {fetchError && (
              <p className="mb-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2">
                {fetchError}
              </p>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-24 text-gray-400 gap-3">
                <svg className="animate-spin h-5 w-5 text-cortex-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading analytics data...
              </div>
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                <p className="text-xl font-medium">No analytics data yet.</p>
                <p className="mt-2">
                  Visit the{' '}
                  <a href="/products" className="text-cortex-blue underline">Products page</a>
                  {' '}or use the chatbot to start generating data.
                </p>
              </div>
            ) : data && (
              <>
                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                  <StatCard title="Total Searches"      value={data.totalSearches}     icon={<Search        className="h-5 w-5 text-cortex-blue" />} />
                  <StatCard title="Filter Uses"         value={data.totalFilterUses}   icon={<Filter        className="h-5 w-5 text-cortex-blue" />} />
                  <StatCard title="Product Views"       value={data.totalProductViews} icon={<Eye           className="h-5 w-5 text-cortex-blue" />} />
                  <StatCard title="Chat Opens"          value={data.totalChatOpens}    icon={<MessageCircle className="h-5 w-5 text-cortex-blue" />} />
                  <StatCard title="Chat Messages"       value={data.totalChatMessages} icon={<Bot           className="h-5 w-5 text-cortex-blue" />} />
                </div>

                {/* AI Insights */}
                <AIInsights data={data} />

                {/* Row 1: Search terms + Category pie */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Card className="lg:col-span-2 border-t-4 border-[#0047AB]">
                    <CardHeader>
                      <CardTitle>Top Search Terms</CardTitle>
                      <CardDescription>Most frequently searched product names</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {data.topSearchTerms.length === 0 ? <NoData /> : (
                        <ChartContainer config={{ count: { label: 'Searches', color: '#0047AB' } }} className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data.topSearchTerms} margin={{ left: 80, right: 16, top: 4, bottom: 4 }}>
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                              <YAxis dataKey="term" type="category" width={80} tick={{ fontSize: 12 }} />
                              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="count" fill="#0047AB" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-t-4 border-[#0047AB]">
                    <CardHeader>
                      <CardTitle>Category Filters</CardTitle>
                      <CardDescription>Tablets vs Capsules filter usage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {data.categoryFilterUsage.length === 0 ? <NoData /> : (
                        <ChartContainer config={{ Tablets: { label: 'Tablets', color: '#0047AB' }, Capsules: { label: 'Capsules', color: '#6699CC' } }} className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={data.categoryFilterUsage} dataKey="count" nameKey="name" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {data.categoryFilterUsage.map(entry => (
                                  <Cell key={entry.name} fill={PIE_COLORS[entry.name] ?? DEFAULT_PIE_COLOR} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Therapeutic Area */}
                <Card className="border-t-4 border-[#0047AB] mb-6">
                  <CardHeader>
                    <CardTitle>Therapeutic Area Filters</CardTitle>
                    <CardDescription>Filter usage by therapeutic area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data.therapeuticAreaUsage.length === 0 ? <NoData /> : (
                      <ChartContainer config={{ count: { label: 'Uses', color: '#003366' } }} className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.therapeuticAreaUsage} margin={{ bottom: 60, left: 8, right: 8, top: 4 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} interval={0} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="#003366" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    )}
                  </CardContent>
                </Card>

                {/* Row 2: Top Viewed Products + Top Chat Questions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-t-4 border-[#0047AB]">
                    <CardHeader>
                      <CardTitle>Top Viewed Products</CardTitle>
                      <CardDescription>Products opened most frequently</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {data.topViewedProducts.length === 0 ? <NoData /> : (
                        <ChartContainer config={{ count: { label: 'Views', color: '#E83A14' } }} className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data.topViewedProducts} margin={{ left: 120, right: 16, top: 4, bottom: 4 }}>
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="count" fill="#E83A14" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-t-4 border-[#0047AB]">
                    <CardHeader>
                      <CardTitle>Top Chatbot Questions</CardTitle>
                      <CardDescription>Most frequently asked questions via the chatbot</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {data.topChatQuestions.length === 0 ? <NoData /> : (
                        <ChartContainer config={{ count: { label: 'Times Asked', color: '#0047AB' } }} className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data.topChatQuestions} margin={{ left: 120, right: 16, top: 4, bottom: 4 }}>
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                              <YAxis dataKey="term" type="category" width={120} tick={{ fontSize: 10 }} />
                              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="count" fill="#0047AB" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="border-t-4 border-[#0047AB]">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-cortex-darkBlue mt-1">{value}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function NoData() {
  return <p className="text-gray-400 text-sm">No data yet</p>;
}
