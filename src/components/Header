import React from 'react';
import { Shield, Github, BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Phishing Detective</h1>
              <p className="text-xs text-slate-400">NLP Security Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Documentation</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Source</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
