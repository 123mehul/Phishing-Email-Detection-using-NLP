export interface AnalysisResult {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: ThreatIndicator[];
  nlpAnalysis: NLPAnalysis;
  technicalAnalysis: TechnicalAnalysis;
  recommendations: string[];
}

export interface ThreatIndicator {
  type: 'danger' | 'warning' | 'info';
  category: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface NLPAnalysis {
  sentimentScore: number; // -1 to 1, negative indicates suspicious
  urgencyScore: number; // 0 to 1, higher indicates urgency tactics
  suspiciousKeywords: string[];
  grammarErrors: number;
  readabilityScore: number; // 0 to 100
}

export interface TechnicalAnalysis {
  urlCount: number;
  suspiciousUrls: number;
  attachmentCount: number;
  senderReputation: number; // 0 to 100
  spfPass: boolean;
  dkimPass: boolean;
}
