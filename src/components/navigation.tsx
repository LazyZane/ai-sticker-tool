'use client'

import { Sparkles, Image, BookOpen } from 'lucide-react'

interface NavigationProps {
  activeSection: 'tutorial' | 'tool'
  onSectionChange: (section: 'tutorial' | 'tool') => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">AI表情包工具站</span>
          </div>
          
          {/* 导航菜单 */}
          <div className="flex space-x-1">
            <button
              onClick={() => onSectionChange('tutorial')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === 'tutorial'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>教程指南</span>
            </button>
            
            <button
              onClick={() => onSectionChange('tool')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === 'tool'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>图片工具</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}