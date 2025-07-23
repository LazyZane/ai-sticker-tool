'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, List } from 'lucide-react'

interface TocItem {
  id: string
  title: string
  level: number
}

export function FloatingTOC() {
  const [tocItems] = useState<TocItem[]>([
    { id: 'intro', title: '课程前言', level: 1 },
    { id: 'ai-models', title: 'AI核心知识', level: 1 },
    { id: 'ai-types', title: '认识不同类型的AI大模型', level: 2 },
    { id: 'ai-agents', title: '认识AI智能体', level: 2 },
    { id: 'prompts', title: '提示词艺术', level: 1 },
    { id: 'prompt-basics', title: '与AI沟通的艺术', level: 2 },
    { id: 'prompt-engineering', title: '提示词工程', level: 2 },
    { id: 'practice', title: '实战演练', level: 1 },
    { id: 'step1', title: '构思与主角形象确立', level: 2 },
    { id: 'step2', title: '风格与内容细化', level: 2 },
    { id: 'step3', title: '批量生成与处理', level: 2 },
    { id: 'step4', title: '发布上线', level: 2 },
    { id: 'wechat-specs', title: '微信规范', level: 1 },
    { id: 'file-requirements', title: '文件规格要求', level: 2 },
    { id: 'design-principles', title: '设计原则', level: 2 }
  ])
  
  const [activeId, setActiveId] = useState('intro')
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 模拟滚动检测逻辑
      // 在实际应用中，这里会检测当前视口中的标题
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveId(id)
    // 在实际应用中，这里会滚动到对应的章节
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 dark:bg-slate-800/30 dark:border-slate-700/50 bg-white/80 border-gray-200/50">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-white dark:text-white text-gray-900">目录导航</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-slate-700/50 rounded transition-colors duration-200 dark:hover:bg-slate-700/50 hover:bg-gray-100/50"
        >
          <ChevronRight 
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isCollapsed ? '' : 'rotate-90'
            }`} 
          />
        </button>
      </div>

      {/* 目录列表 */}
      {!isCollapsed && (
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                activeId === item.id
                  ? 'bg-cyan-600/20 text-cyan-300 border-l-2 border-cyan-500'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/30 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/30 text-gray-600 hover:text-gray-900 hover:bg-gray-100/30'
              } ${item.level === 2 ? 'ml-4 text-sm' : ''}`}
            >
              <span className={item.level === 2 ? 'opacity-75' : ''}>
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      )}

      {/* 进度指示 */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>学习进度</span>
          <span>3/6</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: '50%' }}
          />
        </div>
      </div>
    </div>
  )
}