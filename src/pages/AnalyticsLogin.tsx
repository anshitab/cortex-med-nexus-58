import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Dummy credentials — replace with real auth later
const USERS: Record<string, string> = {
  'admin@cortexmedical.in':     'Cortex@2024',
  'analytics@cortexmedical.in': 'Analytics@2024',
  'manager@cortexmedical.in':   'Manager@2024',
};

export const ANALYTICS_AUTH_KEY = 'cortex_analytics_auth';

export default function AnalyticsLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small delay for realism
    setTimeout(() => {
      const valid = USERS[email.trim().toLowerCase()] === password;
      if (valid) {
        sessionStorage.setItem(ANALYTICS_AUTH_KEY, 'true');
        toast({ title: 'Welcome back!', description: 'Redirecting to Analytics Dashboard...' });
        navigate('/analytics');
      } else {
        setError('Invalid email or password.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <a href="/" className="mb-8">
        <img
          src="/lovable-uploads/78016c50-c4c8-409e-b336-a4919bc6e800.png"
          alt="CORTEX Medical Inc Logo"
          className="h-14"
        />
      </a>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header strip */}
        <div className="bg-cortex-darkBlue px-8 py-6">
          <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-blue-200 text-sm mt-1">Internal access only — CORTEX Medical Inc.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="you@cortexmedical.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-9"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-9 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-cortex-blue hover:bg-cortex-darkBlue text-white"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Access restricted to authorised CORTEX Medical personnel.
      </p>
    </div>
  );
}
