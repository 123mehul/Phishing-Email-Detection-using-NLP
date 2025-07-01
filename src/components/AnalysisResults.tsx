import React from 'react';
import { AlertTriangle, CheckCircle, Shield, Brain, TrendingUp, Download, RefreshCw, Eye } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onReset }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-6 h-6" />;
      case 'medium': return <Shield className="w-6 h-6" />;
      case 'low': return <CheckCircle className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  const getIndicatorIcon = (type: string) => {
    switch (type) {
      case 'danger': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning': return <Shield className="w-4 h-4 text-yellow-400" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default: return <Eye className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Score Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Risk Assessment</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Reset Analysis"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Export Results"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getRiskColor(analysis.riskLevel)}`}>
            {getRiskIcon(analysis.riskLevel)}
            <span className="font-semibold">
              {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)} Risk
            </span>
          </div>
          <div className="text-3xl font-bold text-white">
            {analysis.riskScore}/100
          </div>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              analysis.riskScore >= 70 ? 'bg-gradient-to-r from-red-500 to-red-600' :
              analysis.riskScore >= 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-green-500 to-green-600'
            }`}
            style={{ width: `${analysis.riskScore}%` }}
          ></div>
        </div>
      </div>

      {/* NLP Analysis */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">NLP Analysis</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Sentiment Score</div>
            <div className={`text-lg font-semibold ${
              analysis.nlpAnalysis.sentimentScore < -0.3 ? 'text-red-400' :
              analysis.nlpAnalysis.sentimentScore > 0.3 ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {analysis.nlpAnalysis.sentimentScore.toFixed(2)}
            </div>
          </div>
          
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Urgency Score</div>
            <div className={`text-lg font-semibold ${
              analysis.nlpAnalysis.urgencyScore > 0.7 ? 'text-red-400' :
              analysis.nlpAnalysis.urgencyScore > 0.4 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {(analysis.nlpAnalysis.urgencyScore * 100).toFixed(0)}%
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="text-sm text-slate-400 mb-2">Suspicious Keywords</div>
            <div className="flex flex-wrap gap-2">
              {analysis.nlpAnalysis.suspiciousKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-400/20 text-red-300 rounded text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Grammar Errors: </span>
              <span className="text-white font-medium">{analysis.nlpAnalysis.grammarErrors}</span>
            </div>
            <div>
              <span className="text-slate-400">Readability: </span>
              <span className="text-white font-medium">{analysis.nlpAnalysis.readabilityScore.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Indicators */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Threat Indicators</h3>
        </div>
        
        <div className="space-y-3">
          {analysis.indicators.map((indicator, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-900/50 rounded-lg">
              {getIndicatorIcon(indicator.type)}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium">{indicator.category}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    indicator.severity === 'high' ? 'bg-red-400/20 text-red-300' :
                    indicator.severity === 'medium' ? 'bg-yellow-400/20 text-yellow-300' :
                    'bg-blue-400/20 text-blue-300'
                  }`}>
                    {indicator.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{indicator.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Security Recommendations</h3>
        </div>
        
        <div className="space-y-2">
          {analysis.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
