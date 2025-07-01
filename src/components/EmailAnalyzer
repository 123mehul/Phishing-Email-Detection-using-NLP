import React, { useState } from 'react';
import { Send, Brain, Loader } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface EmailAnalyzerProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
}

const EmailAnalyzer: React.FC<EmailAnalyzerProps> = ({ 
  onAnalysisStart, 
  onAnalysisComplete, 
  isAnalyzing 
}) => {
  const [emailContent, setEmailContent] = useState('');

  const analyzeEmail = () => {
    if (!emailContent.trim()) return;
    
    onAnalysisStart();
    
    // Simulate NLP analysis processing
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        riskScore: Math.floor(Math.random() * 100),
        riskLevel: 'high',
        indicators: [
          {
            type: 'warning',
            category: 'Sender',
            description: 'Suspicious sender domain detected',
            severity: 'high'
          },
          {
            type: 'danger',
            category: 'Content',
            description: 'Urgent action language detected',
            severity: 'high'
          },
          {
            type: 'warning',
            category: 'Links',
            description: 'Shortened URL found',
            severity: 'medium'
          }
        ],
        nlpAnalysis: {
          sentimentScore: -0.6,
          urgencyScore: 0.8,
          suspiciousKeywords: ['urgent', 'verify', 'suspended'],
          grammarErrors: 3,
          readabilityScore: 45
        },
        technicalAnalysis: {
          urlCount: 2,
          suspiciousUrls: 1,
          attachmentCount: 0,
          senderReputation: 25,
          spfPass: false,
          dkimPass: false
        },
        recommendations: [
          'Do not click any links in this email',
          'Verify sender identity through alternative means',
          'Report this email to your IT security team'
        ]
      };
      
      // Determine risk level based on score
      if (mockAnalysis.riskScore >= 70) {
        mockAnalysis.riskLevel = 'high';
      } else if (mockAnalysis.riskScore >= 40) {
        mockAnalysis.riskLevel = 'medium';
      } else {
        mockAnalysis.riskLevel = 'low';
      }
      
      onAnalysisComplete(mockAnalysis);
    }, 3000);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Email Analysis</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email-content" className="block text-sm font-medium text-slate-300 mb-2">
            Paste Email Content
          </label>
          <textarea
            id="email-content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste the email content here for AI-powered phishing analysis..."
            className="w-full h-40 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isAnalyzing}
          />
        </div>
        
        <button
          onClick={analyzeEmail}
          disabled={!emailContent.trim() || isAnalyzing}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Analyzing with NLP...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Analyze Email</span>
            </>
          )}
        </button>
        
        {isAnalyzing && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Processing with AI...</span>
              <span>Stage 1/3</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full animate-pulse" style={{ width: '33%' }}></div>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>• Tokenizing and preprocessing text...</div>
              <div>• Analyzing sentiment and urgency patterns...</div>
              <div>• Detecting suspicious keywords and phrases...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailAnalyzer;
