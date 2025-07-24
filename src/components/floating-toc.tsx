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
    <div className="bg-white/95 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-700/40 p-6 shadow-lg">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm">
            <List className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100">目录导航</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-all duration-300 hover:shadow-sm"
        >
          <ChevronRight
            className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform duration-200 ${
              isCollapsed ? '' : 'rotate-90'
            }`}
          />
        </button>
      </div>

      {/* 目录列表 */}
      {!isCollapsed && (
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                activeId === item.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 dark:border-blue-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-700/40 hover:shadow-sm'
              } ${item.level === 2 ? 'ml-6 text-sm' : 'font-medium'}`}
            >
              <span className={item.level === 2 ? 'opacity-75' : ''}>
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      )}

      {/* 进度指示 */}
      <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/50">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
          <span>学习进度</span>
          <span>3/6</span>
        </div>
        <div className="w-full bg-slate-200/60 dark:bg-slate-700/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: '50%' }}
          />
        </div>
      </div>
    </div>
  )
}