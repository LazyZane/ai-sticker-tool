'use client'

import React, { useState } from 'react'
import { ChevronRight, Zap, Target, Lightbulb, AlertCircle, CheckCircle, Info, BookOpen, Sparkles } from 'lucide-react'

interface TutorialSectionProps {
  onToolRedirect: () => void
}

export function TutorialSection({ onToolRedirect }: TutorialSectionProps) {
  const [activeStep, setActiveStep] = useState(0)

  const tutorialSteps = [
    {
      id: 'intro',
      title: '课程前言',
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-300">课程前言</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              你是否也曾使用过 <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300">豆包</code>、
              <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300">DeepSeek</code> 这类 AI 工具，
              但总感觉没有完全理解它们的工作原理？想深入学习，又担心理论知识太过枯燥？
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              这门课就是为你准备的。我们将通过一个非常有趣的实践项目——制作一套属于你自己的微信表情包，
              让你在动手过程中轻松掌握 AI 的进一步知识和实用工具，成为朋友中更懂 AI 的人。
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'ai-models',
      title: 'AI核心知识',
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-green-300">认识不同类型的 AI 大模型</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">大语言模型 (LLM)</h4>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 专注于处理和生成文本的 AI，精通语言的理解、总结、推理和创作。
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">DeepSeek</code>
                </p>
                <p className="text-slate-300 text-sm">
                  <strong>项目作用：</strong> 帮我们构思表情包创意，生成详细的描述文字（提示词）
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">多模态大模型 (MLLM)</h4>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 能同时处理多种信息类型（文字、图片、声音）的 AI。
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">豆包</code>、
                  <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">Kimi</code>
                </p>
                <p className="text-slate-300 text-sm">
                  <strong>项目作用：</strong> 项目核心工具，实现图片理解、图生文等复杂任务
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">图像生成模型</h4>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 根据文字描述创作图像的专业 AI。
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">Midjourney</code>、
                  <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">DALL·E 3</code>
                </p>
                <p className="text-slate-300 text-sm">
                  <strong>项目作用：</strong> 根据完美提示词创作表情包图片
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'prompts',
      title: '提示词艺术',
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-purple-300">掌握与 AI 沟通的艺术：Prompts (提示词)</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">❌ 错误示范</h4>
                <p className="text-slate-300 text-sm">给我画个猫的表情包，要好玩的。</p>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-2">✅ 正确示范</h4>
                <p className="text-slate-300 text-sm">
                  请帮我画一个微信表情包。<strong>主体</strong>是一只可爱的英短蓝猫，
                  <strong>特征</strong>是胖乎乎的圆脸和大眼睛。<strong>动作</strong>是它正在双手点赞，表情得意。
                  <strong>画风</strong>是简洁的卡通风格，线条清晰，适合做成表情包。
                  <strong>构图</strong>是主体居中，背景透明。
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">💡 核心心法</h4>
                <p className="text-slate-300 text-sm">
                  把 AI 当成一个非常有才华但没有主见的实习生，你需要把你的需求描述得
                  <strong className="text-cyan-300">越具体、越清晰越好</strong>。
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'practice',
      title: '实战演练',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div className="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-300">从零到一打造你的专属 AI 表情包</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                  构思与主角形象确立
                </h4>
                <ul className="text-slate-300 text-sm space-y-1 ml-8">
                  <li>• 确定主角：你的表情包主角是谁？</li>
                  <li>• 样例先行：让 AI 生成一张"定妆照"</li>
                  <li>• 风格确定：通过调整得到满意的主体形象</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                  风格与内容细化
                </h4>
                <ul className="text-slate-300 text-sm space-y-1 ml-8">
                  <li>• 锁定主体特征</li>
                  <li>• 确定表情包主题</li>
                  <li>• 搜集表情内容清单</li>
                  <li>• 最终需求确认</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                  批量生成与处理
                </h4>
                <ul className="text-slate-300 text-sm space-y-1 ml-8">
                  <li>• 使用豆包或星流批量生成</li>
                  <li>• 水印处理和图片压缩</li>
                  <li>• 尺寸调整和格式优化</li>
                </ul>
                
                <div className="mt-4">
                  <button
                    onClick={onToolRedirect}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Zap className="w-4 h-4" />
                    <span>👉 点此一键处理图片</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
                  发布上线
                </h4>
                <ul className="text-slate-300 text-sm space-y-1 ml-8">
                  <li>• 登录微信表情开放平台</li>
                  <li>• 按照指引填写信息、上传图片</li>
                  <li>• AI 辅助生成名称和简介</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wechat-specs',
      title: '微信规范',
      icon: CheckCircle,
      content: (
        <div className="space-y-6">
          <div className="bg-orange-900/30 border border-orange-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-orange-300">微信表情包制作规范</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-300">素材名称</th>
                    <th className="text-left py-2 text-slate-300">数量</th>
                    <th className="text-left py-2 text-slate-300">格式</th>
                    <th className="text-left py-2 text-slate-300">尺寸</th>
                    <th className="text-left py-2 text-slate-300">大小限制</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-2">表情图</td>
                    <td className="py-2">8～24张</td>
                    <td className="py-2">GIF/PNG/JPG</td>
                    <td className="py-2">240×240</td>
                    <td className="py-2">≤500KB</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">详情页横幅</td>
                    <td className="py-2">1张</td>
                    <td className="py-2">PNG/JPG</td>
                    <td className="py-2">750×400</td>
                    <td className="py-2">≤500KB</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">表情封面图</td>
                    <td className="py-2">1张</td>
                    <td className="py-2">PNG</td>
                    <td className="py-2">240×240</td>
                    <td className="py-2">≤500KB</td>
                  </tr>
                  <tr>
                    <td className="py-2">聊天面板图标</td>
                    <td className="py-2">1张</td>
                    <td className="py-2">PNG</td>
                    <td className="py-2">50×50</td>
                    <td className="py-2">≤100KB</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">重要设计原则</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• 所有表情必须为原创或拥有版权</li>
                  <li>• 表情应充分考虑微信聊天场景</li>
                  <li>• 表情应生动有趣，风格统一</li>
                  <li>• 同一套表情中各图片应有足够差异</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">文案填写规范</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• <strong>表情名称：</strong>≤8个汉字，无标点符号</li>
                  <li>• <strong>表情介绍：</strong>≤80个汉字，展现特点</li>
                  <li>• <strong>版权信息：</strong>≤10个汉字，简短明确</li>
                  <li>• <strong>含义词：</strong>≤4个汉字，贴切表达</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* 步骤导航 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {tutorialSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeStep === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{step.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          {React.createElement(tutorialSteps[activeStep].icon, { className: "w-6 h-6 mr-3 text-cyan-400" })}
          {tutorialSteps[activeStep].title}
        </h2>
        
        {tutorialSteps[activeStep].content}
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>上一步</span>
        </button>
        
        <button
          onClick={() => setActiveStep(Math.min(tutorialSteps.length - 1, activeStep + 1))}
          disabled={activeStep === tutorialSteps.length - 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <span>下一步</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}