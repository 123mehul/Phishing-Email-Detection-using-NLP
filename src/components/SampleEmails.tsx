import React from 'react';
import { Mail, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

interface SampleEmail {
  id: string;
  title: string;
  preview: string;
  riskScore: number;
  type: 'phishing' | 'legitimate' | 'suspicious';
  indicators: Array<{
    type: 'danger' | 'warning' | 'info';
    category: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }>;
}

interface SampleEmailsProps {
  onEmailSelect: (email: SampleEmail) => void;
}

const sampleEmails: SampleEmail[] = [
  {
    id: '1',
    title: 'Urgent: Verify Your Account',
    preview: 'Your account will be suspended unless you verify your identity within 24 hours...',
    riskScore: 92,
    type: 'phishing',
    indicators: [
      { type: 'danger', category: 'Content', description: 'Urgent action required language', severity: 'high' },
      { type: 'danger', category: 'Sender', description: 'Suspicious sender domain', severity: 'high' },
      { type: 'warning', category: 'Links', description: 'Suspicious URLs detected', severity: 'medium' }
    ]
  },
  {
    id: '2',
    title: 'Invoice #INV-2024-001',
    preview: 'Thank you for your recent purchase. Please find attached your invoice...',
    riskScore: 15,
    type: 'legitimate',
    indicators: [
      { type: 'info', category: 'Sender', description: 'Known legitimate sender', severity: 'low' },
      { type: 'info', category: 'Content', description: 'Professional language', severity: 'low' }
    ]
  },
  {
    id: '3',
    title: 'Security Alert: Unusual Activity',
    preview: 'We detected unusual activity on your account. Click here to secure your account...',
    riskScore: 78,
    type: 'suspicious',
    indicators: [
      { type: 'warning', category: 'Content', description: 'Security scare tactics', severity: 'high' },
      { type: 'warning', category: 'Links', description: 'Shortened URLs', severity: 'medium' }
    ]
  }
];

const SampleEmails: React.FC<SampleEmailsProps> = ({ onEmailSelect }) => {
  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (score >= 40) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-green-400 bg-green-400/10 border-green-400/20';
  };

  const getRiskIcon = (score: number) => {
    if (score >= 70) return <AlertTriangle className="w-4 h-4" />;
    if (score >= 40) return <Shield className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Mail className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Sample Emails</h2>
      </div>
      
      <div className="space-y-3">
        {sampleEmails.map((email) => (
          <button
            key={email.id}
            onClick={() => onEmailSelect(email)}
            className="w-full text-left p-4 bg-slate-900/50 hover:bg-slate-900/70 border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                {email.title}
              </h3>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getRiskColor(email.riskScore)}`}>
                {getRiskIcon(email.riskScore)}
                <span>{email.riskScore}%</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 line-clamp-2 mb-2">
              {email.preview}
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <span className={`px-2 py-1 rounded ${
                email.type === 'phishing' ? 'bg-red-400/20 text-red-300' :
                email.type === 'suspicious' ? 'bg-yellow-400/20 text-yellow-300' :
                'bg-green-400/20 text-green-300'
              }`}>
                {email.type.charAt(0).toUpperCase() + email.type.slice(1)}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{email.indicators.length} indicators</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-blue-300">
          <strong>Tip:</strong> Click on any sample email to see how our AI analyzes different types of content.
        </p>
      </div>
    </div>
  );
};

export default SampleEmails;
