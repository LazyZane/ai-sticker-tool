'use client'

import { Sparkles, Image, BookOpen, Sun, Moon, ExternalLink } from 'lucide-react'
import { useTheme } from '../contexts/theme-context'

interface NavigationProps {
  activeSection: 'tutorial' | 'tool'
  onSectionChange: (section: 'tutorial' | 'tool') => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-slate-800/50 dark:bg-slate-800/50 bg-white/80 backdrop-blur-sm border-b border-slate-700/50 dark:border-slate-700/50 border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold text-white dark:text-white text-gray-900">AI表情包工具站</span>
          </div>

          {/* 中间导航菜单 */}
          <div className="flex space-x-1">
            <button
              onClick={() => onSectionChange('tutorial')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === 'tutorial'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
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
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>图片工具</span>
            </button>
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center space-x-2">
            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-700/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* 关于我们链接 */}
            <a
              href="https://ai.xinqi.life/about"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-700/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              title="关于我们"
            >
              <span className="text-sm">关于</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}