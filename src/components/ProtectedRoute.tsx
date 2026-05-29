import { Navigate } from 'react-router-dom';
import { ANALYTICS_AUTH_KEY } from '@/pages/AnalyticsLogin';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem(ANALYTICS_AUTH_KEY) === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/analytics/login" replace />;
}
