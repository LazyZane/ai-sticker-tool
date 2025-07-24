'use client'

import { useState } from 'react'
import { Sparkles, Image, BookOpen, Sun, Moon, ExternalLink, Menu, X } from 'lucide-react'
import { useTheme } from '../contexts/theme-context'

interface NavigationProps {
  activeSection: 'tutorial' | 'tool'
  onSectionChange: (section: 'tutorial' | 'tool') => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSectionChange = (section: 'tutorial' | 'tool') => {
    onSectionChange(section)
    setIsMobileMenuOpen(false) // 选择后关闭移动端菜单
  }

  return (
    <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 truncate">
              <span className="hidden sm:inline">AI表情包工具站</span>
              <span className="sm:hidden">AI表情包</span>
            </span>
          </div>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex space-x-1">
            <button
              onClick={() => onSectionChange('tutorial')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === 'tutorial'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>教程指南</span>
            </button>

            <button
              onClick={() => onSectionChange('tool')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === 'tool'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
              className="p-2.5 rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:shadow-sm"
              title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* 关于我们链接 - 桌面端显示 */}
            <a
              href="https://ai.xinqi.life/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:shadow-sm"
              title="关于我们"
            >
              <span className="text-sm font-medium">关于</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* 移动端汉堡菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              title="菜单"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 移动端下拉菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/60 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleSectionChange('tutorial')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === 'tutorial'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">教程指南</span>
              </button>

              <button
                onClick={() => handleSectionChange('tool')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === 'tool'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Image className="w-5 h-5" />
                <span className="font-medium">图片工具</span>
              </button>

              <a
                href="https://ai.xinqi.life/about"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">关于我们</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}