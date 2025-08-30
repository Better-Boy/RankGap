import React, { useState } from 'react';
import { Search, AlertCircle, ExternalLink, TrendingUp, Eye, BarChart3 } from 'lucide-react';

interface AnalyzerFormProps {
  onSubmit: (url: string, queryCount: number) => void;
  isLoading: boolean;
  error: string | null;
  loadingMessage?: string;
}

function AnalyzerForm({ onSubmit, isLoading, error, loadingMessage }: AnalyzerFormProps) {
  const [url, setUrl] = useState('');
  const [queryCount, setQueryCount] = useState(1);
  const [urlError, setUrlError] = useState('');

  const validateAmazonUrl = (url: string): boolean => {
    const amazonRegex = /^https?:\/\/(www\.)?amazon\.com/;
    return amazonRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError('');

    if (!url.trim()) {
      setUrlError('Please enter an Amazon product URL');
      return;
    }

    if (!validateAmazonUrl(url)) {
      setUrlError('Please enter a valid Amazon product URL. Ex - https://www.amazon.com/dp/B08N5WRWNW');
      return;
    }

    onSubmit(url, queryCount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white mb-2">Analyze Product Rankings</h2>
        <p className="text-blue-100">Enter your Amazon product URL to get detailed ranking insights</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800">Analysis Error</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
              Amazon Product URL
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.amazon.com/dp/B08N5WRWNW"
                className={`w-full px-4 py-3 pl-12 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  urlError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={isLoading}
              />
              <ExternalLink className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {urlError && (
              <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{urlError}</span>
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Paste the full Amazon product URL (US .com only for now)
            </p>
          </div>

          <div>
            <label htmlFor="queryCount" className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Search Queries
            </label>
            <select
              id="queryCount"
              value={queryCount}
              onChange={(e) => setQueryCount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all"
              disabled={isLoading}
            >
              {/* <option value={5}>5 queries (Quick analysis)</option>
              <option value={10}>10 queries (Standard analysis)</option>
              <option value={15}>15 queries (Comprehensive analysis)</option> */}
              <option value={1}>1 queries (Quick analysis)</option>
              <option value={2}>2 queries (Standard analysis)</option>
              <option value={3}>3 queries (Comprehensive analysis)</option>

            </select>
            <p className="mt-2 text-sm text-gray-500">
              More queries provide deeper insights but take longer to process
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{loadingMessage || 'Analyzing Rankings...'}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Analyze Product Rankings</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Competitive Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Keyword Performance</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Growth Insights</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AnalyzerForm;