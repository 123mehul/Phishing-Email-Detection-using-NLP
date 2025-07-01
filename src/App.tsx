
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Mail, Brain, Zap, FileText, Download, RefreshCw } from 'lucide-react';
import EmailAnalyzer from './components/EmailAnalyzer';
import Header from './components/Header';
import SampleEmails from './components/SampleEmails';
import AnalysisResults from './components/AnalysisResults';
import { AnalysisResult } from './types/analysis';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
  };

  const resetAnalysis = () => {
    setCurrentAnalysis(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Shield className="w-12 h-12 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                  <Brain className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI Phishing Detective
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Advanced NLP-powered email security analysis that identifies phishing attempts, 
              social engineering tactics, and malicious content using state-of-the-art machine learning.
            </p>
            
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span>Natural Language Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Threat Detection</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <EmailAnalyzer 
                onAnalysisStart={handleAnalysisStart}
                onAnalysisComplete={handleAnalysisComplete}
                isAnalyzing={isAnalyzing}
              />
              <SampleEmails 
                onEmailSelect={(email) => {
                  // This would trigger analysis of the selected sample email
                  handleAnalysisStart();
                  // Simulate analysis delay
                  setTimeout(() => {
                    // Mock analysis result based on sample email
                    const mockResult: AnalysisResult = {
                      riskScore: email.riskScore,
                      riskLevel: email.riskScore >= 80 ? 'high' : email.riskScore >= 50 ? 'medium' : 'low',
                      indicators: email.indicators,
                      nlpAnalysis: {
                        sentimentScore: Math.random() * 2 - 1,
                        urgencyScore: email.riskScore / 100,
                        suspiciousKeywords: email.indicators.filter(i => i.category === 'Content').map(i => i.description.split(' ')[0]).slice(0, 3),
                        grammarErrors: Math.floor(Math.random() * 5),
                        readabilityScore: Math.random() * 100
                      },
                      technicalAnalysis: {
                        urlCount: Math.floor(Math.random() * 5),
                        suspiciousUrls: Math.floor(Math.random() * 3),
                        attachmentCount: Math.floor(Math.random() * 3),
                        senderReputation: Math.random() * 100,
                        spfPass: Math.random() > 0.3,
                        dkimPass: Math.random() > 0.4
                      },
                      recommendations: [
                        'Do not click any links in this email',
                        'Verify sender identity through alternative means',
                        'Report this email to your IT security team',
                        'Delete the email immediately'
                      ]
                    };
                    handleAnalysisComplete(mockResult);
                  }, 2000);
                }}
              />
            </div>
            
            <div className="space-y-6">
              {currentAnalysis && (
                <AnalysisResults 
                  analysis={currentAnalysis} 
                  onReset={resetAnalysis}
                />
              )}
              
              {!currentAnalysis && !isAnalyzing && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
                  <Mail className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">Ready for Analysis</h3>
                  <p className="text-slate-400">
                    Paste an email or select a sample to begin AI-powered phishing detection analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
