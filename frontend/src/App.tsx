import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './lib/supabase';
import { Search, TrendingUp, BarChart3, Eye } from 'lucide-react';
import AnalyzerForm from './components/AnalyzerForm';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';

export interface AnalysisData {
  url: string;
  product: {
    image: string;
    title: string;
    link: string;
    price: number;
    rating: number;
  };
  searchResults: Array<{
    query: string;
    results: Array<{
      image: string;
      title: string;
      link: string;
      rank: number;
      price: number;
      rating: number;
    }>;
  }>;
  analysis: {
    visibilityAnalysis: string;
    competitorAnalysis: string;
    recommendations: string;
  };
}

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Initializing analysis...');

  const pollForResults = async (executionId: string): Promise<any> => {
    const maxAttempts = 20;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const { data, error } = await supabase
          .from('product_data')
          .select('data')
          .eq('execution_id', executionId)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
          throw error;
        }
        
        if (data) {
          return data.data; // Return the jsonb data field
        }
        
        // Update loading message based on attempts
        if (attempts < 3) {
          setLoadingMessage('Processing your request...');
        } else if (attempts < 6) {
          setLoadingMessage('Analyzing search results...');
        } else {
          setLoadingMessage('Finalizing analysis...');
        }
        
        // Wait 30 seconds before next poll
        await new Promise(resolve => setTimeout(resolve, 30000));
        attempts++;
      } catch (err) {
        console.error('Polling error:', err);
        throw new Error('Failed to retrieve analysis results');
      }
    }
    
    throw new Error('Analysis timed out. Please try submitting your request again.');
  };

  const handleAnalysis = async (url: string, queryCount: number) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage('Initializing analysis...');
    
    try {
      // Generate UUID for this execution
      const executionId = uuidv4();
      
      // Send request to API with execution_id
      setLoadingMessage('Submitting analysis request...');
      const VITE_N8N_URL = import.meta.env.VITE_N8N_URL;
      await axios.post(VITE_N8N_URL, {
        url,
        queryCount,
        execution_id: executionId
      });
      
      // Poll Supabase for results
      setLoadingMessage('Processing your request...');
      const apiData = await pollForResults(executionId);
      
      // Transform API response to match our interface
      const transformedData: AnalysisData = {
        url,
        product: {
          image: apiData.target_product.image,
          title: apiData.target_product.title,
          link: apiData.target_product.url,
          price: apiData.target_product.final_price,
          rating: apiData.target_product.rating
        },
        searchResults: apiData.search_queries.map((query: any) => ({
          query: query.search_query,
          results: query.result.map((result: any) => ({
            image: result.image,
            title: result.title,
            link: result.url,
            rank: result.rank,
            price: result.final_price,
            rating: result.rating
          }))
        })),
        analysis: {
          visibilityAnalysis: apiData.vp_analysis,
          competitorAnalysis: apiData.ca_analysis,
          recommendations: apiData.final_reco
        }
      };
      
      setAnalysisData(transformedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('Initializing analysis...');
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!analysisData ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Amazon Rank Analyzer
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get comprehensive insights into your Amazon product's search performance 
                and competitive positioning across multiple search queries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Multi-Query Analysis</h3>
                <p className="text-gray-600 text-sm">Analyze rankings across multiple search variations</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Competitive Insights</h3>
                <p className="text-gray-600 text-sm">Understand your position in the marketplace</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Actionable Reports</h3>
                <p className="text-gray-600 text-sm">Get detailed recommendations for improvement</p>
              </div>
            </div>

            <AnalyzerForm onSubmit={handleAnalysis} isLoading={isLoading} error={error} />
          </div>
        ) : (
          <ResultsDisplay data={analysisData} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;