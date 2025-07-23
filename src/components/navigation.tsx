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
    <nav className="bg-slate-900/80 dark:bg-slate-900/80 bg-white/90 backdrop-blur-md border-b border-slate-800/50 dark:border-slate-800/50 border-slate-200/50 sticky top-0 z-50 shadow-lg shadow-slate-900/10 dark:shadow-slate-900/10 shadow-slate-200/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-emerald-400 dark:text-emerald-400 text-emerald-600" />
            <span className="text-xl font-bold text-slate-100 dark:text-slate-100 text-slate-800">AI表情包工具站</span>
          </div>

          {/* 中间导航菜单 */}
          <div className="flex space-x-1">
            <button
              onClick={() => onSectionChange('tutorial')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === 'tutorial'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/25 shadow-indigo-400/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/60 text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>教程指南</span>
            </button>

            <button
              onClick={() => onSectionChange('tool')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === 'tool'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/25 shadow-emerald-400/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/60 text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'
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
              className="p-2.5 rounded-xl transition-all duration-300 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/60 text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 hover:shadow-lg"
              title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* 关于我们链接 */}
            <a
              href="https://ai.xinqi.life/about"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/60 text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 hover:shadow-lg"
              title="关于我们"
            >
              <span className="text-sm font-medium">关于</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}