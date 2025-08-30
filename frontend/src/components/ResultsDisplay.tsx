import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink, TrendingUp, Search, BarChart3, Image as ImageIcon } from 'lucide-react';
import type { AnalysisData } from '../App';

interface ResultsDisplayProps {
  data: AnalysisData;
  onReset: () => void;
}

function ResultsDisplay({ data, onReset }: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Product Summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Results</h2>
          <p className="text-blue-100">Product Analysis Complete</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-6 lg:space-y-0 mb-8">
            <div className="lg:w-32 flex-shrink-0">
              <img
                src={data.product.image}
                alt={data.product.title}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start space-x-3">
                <ExternalLink className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{data.product.title}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-2xl font-bold text-green-600">${data.product.price}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium text-gray-700">{data.product.rating}</span>
                    </div>
                  </div>
                  <a
                    href={data.product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm break-all transition-colors"
                  >
                    {data.product.link}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{data.searchResults.length}</div>
            <div className="text-sm text-blue-700 font-medium">Search Queries Analyzed</div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Search Results by Query</h2>
          <p className="text-gray-600">Product rankings across different search terms</p>
        </div>
        
        <div className="p-8 space-y-8">
          {data.searchResults.map((searchResult, queryIndex) => (
            <div key={queryIndex} className="border-b border-gray-100 last:border-b-0 pb-8 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span>Query: "{searchResult.query}"</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {searchResult.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="relative mb-3">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-24 object-cover rounded-md border border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-24 bg-gray-200 rounded-md border border-gray-200 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        #{result.rank}
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                      {result.title}
                    </h4>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-600 font-semibold text-sm">${result.price}</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-gray-600 text-xs">{result.rating}</span>
                      </div>
                    </div>
                    
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xs flex items-center space-x-1 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">View Product</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Analysis Report</h2>
          <p className="text-gray-600 mt-1">Comprehensive insights and recommendations</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          <AnalysisSection
            title="Visibility Analysis"
            icon={<TrendingUp className="w-5 h-5" />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            content={data.analysis.visibilityAnalysis}
          />
          
          <AnalysisSection
            title="Competitor Analysis"
            icon={<BarChart3 className="w-5 h-5" />}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            content={data.analysis.competitorAnalysis}
          />
          
          <AnalysisSection
            title="Recommendations"
            icon={<Search className="w-5 h-5" />}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            content={data.analysis.recommendations}
          />
        </div>
      </div>
    </div>
  );
}

interface AnalysisSectionProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  content: string;
}

function AnalysisSection({ title, icon, iconBg, iconColor, content }: AnalysisSectionProps) {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      
      <div className="prose prose-gray max-w-none 
        prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0
        prose-h1:text-xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2
        prose-h2:text-lg prose-h2:text-gray-800
        prose-h3:text-base prose-h3:text-gray-800
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-ul:text-gray-700 prose-ul:mb-4 prose-ul:pl-4
        prose-ol:text-gray-700 prose-ol:mb-4 prose-ol:pl-4
        prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-1
        prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
        prose-em:text-gray-600 prose-em:italic">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
            h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900 mb-3 mt-6 first:mt-0 border-b border-gray-200 pb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-bold text-gray-800 mb-3 mt-5 first:mt-0">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4 first:mt-0">{children}</h3>,
            ul: ({ children }) => <ul className="mb-4 pl-4 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="mb-4 pl-4 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="text-gray-700 leading-relaxed">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
            code: ({ children }) => <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-sm font-medium">{children}</code>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ResultsDisplay;