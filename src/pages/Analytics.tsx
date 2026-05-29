import { useMemo, useState } from 'react';
import { Eye, Filter, Search } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer,
} from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useAnalytics } from '@/context/AnalyticsContext';

const PIE_COLORS: Record<string, string> = {
  Tablets: '#0047AB',
  Capsules: '#6699CC',
};
const DEFAULT_PIE_COLOR = '#0047AB';

export default function Analytics() {
  const { getAnalytics, clearAnalytics } = useAnalytics();
  const data = useMemo(() => getAnalytics(), [getAnalytics]);

  const isEmpty =
    data.totalSearches + data.totalFilterUses + data.totalProductViews === 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero strip */}
      <div className="bg-cortex-darkBlue text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-blue-200 text-lg">
            Product interaction insights from your browsing session
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Header row with clear button */}
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
                      This will permanently delete all recorded search, filter, and product view
                      events. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={clearAnalytics}
                    >
                      Clear Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                <p className="text-xl font-medium">No analytics data yet.</p>
                <p className="mt-2">
                  Visit the{' '}
                  <a href="/products" className="text-cortex-blue underline">
                    Products page
                  </a>{' '}
                  to start browsing.
                </p>
              </div>
            ) : (
              <>
                {/* Stat cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <StatCard
                    title="Total Searches"
                    value={data.totalSearches}
                    icon={<Search className="h-6 w-6 text-cortex-blue" />}
                  />
                  <StatCard
                    title="Filter Applications"
                    value={data.totalFilterUses}
                    icon={<Filter className="h-6 w-6 text-cortex-blue" />}
                  />
                  <StatCard
                    title="Product Views"
                    value={data.totalProductViews}
                    icon={<Eye className="h-6 w-6 text-cortex-blue" />}
                  />
                </div>

                {/* Row 1: Search terms + Category pie */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Chart 1 — Top Search Terms */}
                  <Card className="lg:col-span-2 border-t-4 border-[#0047AB]">
                    <CardHeader>
                      <CardTitle>Top Search Terms</CardTitle>
                      <CardDescription>Most frequently searched product names</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {data.topSearchTerms.length === 0 ? (
                        <p className="text-gray-400 text-sm">No data yet</p>
                      ) : (
                        <ChartContainer
                          config={{ count: { label: 'Searches', color: '#0047AB' } }}
                          className="h-64"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={data.topSearchTerms}
                              margin={{ left: 80, right: 16, top: 4, bottom: 4 }}
                            >
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

                  {/* Chart 2 — Category Filter Usage */}
                  <Card className="border-t-4 border-[#0047AB]">
                    <CardHeader>
                      <CardTitle>Category Filters</CardTitle>
                      <CardDescription>Tablets vs Capsules filter usage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {data.categoryFilterUsage.length === 0 ? (
                        <p className="text-gray-400 text-sm">No data yet</p>
                      ) : (
                        <ChartContainer
                          config={{
                            Tablets: { label: 'Tablets', color: '#0047AB' },
                            Capsules: { label: 'Capsules', color: '#6699CC' },
                          }}
                          className="h-64"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={data.categoryFilterUsage}
                                dataKey="count"
                                nameKey="name"
                                outerRadius={90}
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {data.categoryFilterUsage.map((entry) => (
                                  <Cell
                                    key={entry.name}
                                    fill={PIE_COLORS[entry.name] ?? DEFAULT_PIE_COLOR}
                                  />
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

                {/* Chart 3 — Therapeutic Area Usage */}
                <Card className="border-t-4 border-[#0047AB] mb-6">
                  <CardHeader>
                    <CardTitle>Therapeutic Area Filters</CardTitle>
                    <CardDescription>Filter usage by therapeutic area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data.therapeuticAreaUsage.length === 0 ? (
                      <p className="text-gray-400 text-sm">No data yet</p>
                    ) : (
                      <ChartContainer
                        config={{ count: { label: 'Uses', color: '#003366' } }}
                        className="h-72"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={data.therapeuticAreaUsage}
                            margin={{ bottom: 60, left: 8, right: 8, top: 4 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                              dataKey="name"
                              angle={-35}
                              textAnchor="end"
                              tick={{ fontSize: 11 }}
                              interval={0}
                            />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="#003366" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    )}
                  </CardContent>
                </Card>

                {/* Chart 4 — Top Viewed Products */}
                <Card className="border-t-4 border-[#0047AB]">
                  <CardHeader>
                    <CardTitle>Top Viewed Products</CardTitle>
                    <CardDescription>Products opened most frequently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data.topViewedProducts.length === 0 ? (
                      <p className="text-gray-400 text-sm">No data yet</p>
                    ) : (
                      <ChartContainer
                        config={{ count: { label: 'Views', color: '#E83A14' } }}
                        className="h-80"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={data.topViewedProducts}
                            margin={{ left: 120, right: 16, top: 4, bottom: 4 }}
                          >
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
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-t-4 border-[#0047AB]">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-4xl font-bold text-cortex-darkBlue mt-1">{value}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
