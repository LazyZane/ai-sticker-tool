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
          <div className="bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">课程前言</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              你是否也曾使用过 <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-blue-700 dark:text-cyan-300">豆包</code>、
              <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-blue-700 dark:text-cyan-300">DeepSeek</code> 这类 AI 工具，
              但总感觉没有完全理解它们的工作原理？想深入学习，又担心理论知识太过枯燥？
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
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
          <div className="bg-green-50/80 dark:bg-green-900/30 border border-green-200/60 dark:border-green-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">AI 核心知识加油站 ⛽️</h3>
            </div>

            <div className="bg-blue-50/60 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 温馨提示</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                在开始前，我们先快速了解几个概念。<strong className="text-blue-700 dark:text-cyan-300">看不懂没关系，你只需要有个大概印象</strong>，
                因为我们会在后面的每一步实践中，让你亲身感受到它们到底是什么、怎么用！
              </p>
            </div>

            <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">1. 认识不同类型的 AI 大模型</h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
              你可以把<strong className="text-blue-700 dark:text-cyan-300">大模型</strong>理解为一个经过海量信息训练的、能力强大的 AI。
              但它们和人一样，也有不同的分工和特长。
            </p>

            <div className="space-y-4">
              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">大语言模型 (LLM - Large Language Model)</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 这是一个专注于处理和生成<strong className="text-blue-700 dark:text-cyan-300">文本</strong>的 AI，精通语言的理解、总结、推理和创作。
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">DeepSeek</code>
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  <strong>与我们项目的关系：</strong> 当我们对表情包只有一个模糊想法时，可以利用 LLM 帮我们构思，生成详细的描述文字，
                  也就是我们后面要讲的<strong className="text-blue-700 dark:text-cyan-300">提示词</strong>。但需要注意，纯粹的 LLM <strong className="text-red-600 dark:text-red-300">看不懂</strong>图片。
                  如Deepseek，官网针对图片是集成了工具仅做OCR文字识别，AI不会主动去理解你的画面元素。
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">多模态大模型 (MLLM - Multimodal Large Models)</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 这是一个能同时处理多种信息类型（如文字、图片、声音）的 AI。
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">豆包</code>、
                  <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">Kimi</code>、
                  <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">Google Gemini</code>
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  <strong>与我们项目的关系：</strong> 这是我们项目的核心工具。它可以实现图片理解、图生文等更复杂的任务。
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">图像生成模型</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 这是一个专门用于根据文字描述（Prompts）来<strong className="text-blue-700 dark:text-cyan-300">创作图像</strong>的 AI。
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">Midjourney</code>、
                  <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">Stable Diffusion</code>、
                  <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">DALL·E 3</code>，
                  以及豆包内置的 <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">doubao-seedream-3.0</code>
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  <strong>与我们项目的关系：</strong> 当我们准备好完美的提示词后，就由这些图像模型来具体创作出我们想要的表情包图片。
                  当然有些顶尖的模型会与一个强大的语言模型协同工作，以便更精准地理解你的创作意图。
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">视频生成模型</h4>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>核心能力：</strong> 这是一个能将文字或图片<strong className="text-cyan-300">转换成短视频</strong>的 AI。
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  <strong>典型代表：</strong> 豆包的<strong className="text-cyan-300">即梦</strong>
                  (<code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300">doubao-Seedance-1.0-pro</code>)、
                  MiniMax 的<strong className="text-cyan-300">海螺</strong>
                </p>
                <p className="text-slate-300 text-sm">
                  <strong>与我们项目的关系：</strong> 这是进阶玩法。做完静态表情包后，可以尝试用这些工具生成有趣的动态表情。
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4 mt-6">2. 认识更强大的 AI 工具：AI Agents (智能体)</h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
              如果说大模型是 AI 的"大脑"，那智能体 (Agent) 就是一个更完整的系统，它能<strong className="text-cyan-600 dark:text-cyan-300">调用工具、自主完成一系列任务</strong>。
            </p>

            <div className="space-y-3">
              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200/60 dark:border-slate-700/50">
                <h5 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Chat 智能体</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  这是最基础的形态，就是我们常用的 <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">豆包</code>、
                  <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-blue-700 dark:text-cyan-300">元宝</code> 等聊天机器人。
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200/60 dark:border-slate-700/50">
                <h5 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">工作流类智能体</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  它能将多个 AI 功能串联起来，形成<strong className="text-blue-700 dark:text-cyan-300">自动化的工作流程</strong>。如coze扣子。
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  更多工作流智能体：
                  <a href="https://waytoagi.feishu.cn/wiki/VQA2w6bEUiFHRmk2u7icvCpPnkg"
                     target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline ml-1">
                    查看详情 →
                  </a>
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200/60 dark:border-slate-700/50">
                <h5 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">通用智能体</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  它的目标是能像人一样理解复杂的开放式任务，并自主地进行规划和执行。
                  这是 AI 未来的一个重要发展方向。如manus、coze空间等。
                </p>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200/60 dark:border-slate-700/50">
                <h5 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">垂类智能体</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  它<strong className="text-blue-700 dark:text-cyan-300">专注于某个特定领域</strong>，因此表现得非常专业。
                </p>
                <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-700/30 rounded p-2">
                  <h6 className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">💡 垂类智能体举例：星流 (Lovart)</h6>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    它是一个专注于 AI 绘画领域的垂类智能体。它的优势在于<strong className="text-blue-700 dark:text-cyan-300">内置了大量针对艺术创作的优化</strong>。
                    你输入的简单需求，会被它内部的复杂工作流自动"翻译"成更专业、更适合底层绘画模型的提示词。
                    <strong className="text-blue-700 dark:text-cyan-300">它帮你完成了大量普通用户不知道如何操作的"幕后工作"</strong>，所以出图效果和体验会更好。
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm mt-2">
                  更多智能体了解：
                  <a href="https://waytoagi.feishu.cn/wiki/AVTMwH1k6iN5pIkrjn6cPm2Tnae"
                     target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline ml-1">
                    查看详情 →
                  </a>
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
          <div className="bg-purple-50/80 dark:bg-purple-900/30 border border-purple-200/60 dark:border-purple-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">掌握与 AI 沟通的艺术：Prompts (提示词)</h3>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              提示词就是你给 AI 下达的指令。指令的质量，直接决定了 AI 成品的质量。
            </p>

            <div className="space-y-4">
              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3">关键心法一：跟 AI 说<strong className="text-blue-600 dark:text-cyan-300">人话</strong>，而不是<strong className="text-red-600 dark:text-red-300">老板话</strong></h4>
                <div className="space-y-3">
                  <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200/60 dark:border-red-700/30 rounded p-3">
                    <p className="text-red-700 dark:text-red-300 text-sm font-medium mb-1">❌ 错误示范：</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">给我画个猫的表情包，要好玩的。</p>
                  </div>
                  <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/30 rounded p-3">
                    <p className="text-green-700 dark:text-green-300 text-sm font-medium mb-1">✅ 正确示范：</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      请帮我画一个微信表情包。<strong className="text-blue-700 dark:text-cyan-300">主体</strong>是一只可爱的英短蓝猫，
                      <strong className="text-blue-700 dark:text-cyan-300">特征</strong>是胖乎乎的圆脸和大眼睛。
                      <strong className="text-blue-700 dark:text-cyan-300">动作</strong>是它正在双手点赞，表情得意。
                      <strong className="text-blue-700 dark:text-cyan-300">画风</strong>是简洁的卡通风格，线条清晰，适合做成表情包。
                      <strong className="text-blue-700 dark:text-cyan-300">构图</strong>是主体居中，背景透明。
                    </p>
                  </div>
                  <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-700/30 rounded p-3">
                    <p className="text-blue-700 dark:text-blue-300 text-sm font-medium mb-1">💡 核心：</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      把 AI 当成一个非常有才华但没有主见的实习生，你需要把你的需求描述得
                      <strong className="text-blue-700 dark:text-cyan-300">越具体、越清晰越好</strong>。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3">关键心法二：引导 AI 一步一步思考</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
                  对于复杂的任务，不要指望一步到位。优秀的提示词不仅是提出要求，更是设计一个"思维框架"，
                  通过设定角色、流程、约束条件和输出格式，引导 AI 在一个可控的路径上思考，
                  从而产出高质量、高稳定性的结果。这也是<strong className="text-blue-700 dark:text-cyan-300">提示词工程 (Prompt Engineering)</strong> 的核心思想。
                </p>

                <div className="bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 border border-indigo-200/60 dark:border-indigo-500/30 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-sm">
                        <span className="text-white text-sm">🤖</span>
                      </div>
                      <h5 className="font-bold text-indigo-800 dark:text-indigo-200 text-base">完整提示词模板：表情包助手</h5>
                    </div>
                    <button
                      onClick={() => {
                        const promptText = document.getElementById('complete-prompt-text')?.textContent || '';
                        navigator.clipboard.writeText(promptText).then(() => {
                          // 可以添加复制成功的提示
                          const button = document.querySelector('[data-copy-button]');
                          if (button) {
                            const originalText = button.textContent;
                            button.textContent = '已复制!';
                            setTimeout(() => {
                              button.textContent = originalText;
                            }, 2000);
                          }
                        });
                      }}
                      data-copy-button
                      className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      📋 复制全文
                    </button>
                  </div>

                  <div className="bg-slate-100/80 dark:bg-slate-900/70 rounded-xl p-4 max-h-64 overflow-y-auto border border-slate-300/60 dark:border-slate-700/50">
                    <pre id="complete-prompt-text" className="text-slate-800 dark:text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
{`提示词：表情包助手
你是一个专业的"表情包制作需求引导与生成助手"。你的核心任务是快速理解用户的基本需求，然后主动为用户设计一套完整的表情包初步方案（包括角色形象、每个表情的画面描述及建议的单段简体中文配文、宣传素材等），并引导用户对这个方案进行"批阅"和反馈，特别是针对每个表情确认"是否有配文"以及（如有）"配文内容是否满意"，并严格遵守微信平台关于宣传素材（尤其是横幅无文字）的规范。最终，根据用户的完全确认结果，生成一份可以直接交付给设计师或AI绘画工具（如Lovart）的、详细且规范的表情包制作需求文档。

核心流程与引导逻辑：

第一阶段：快速需求捕获
1.欢迎与核心输入获取：
    *   "您好！我是您的表情包制作需求引导助手。想制作什么样的表情包呢？首先，请问您是否有核心的主角形象或参考图片可以提供给我？ 如果有，请发给我看看。如果没有，我们也可以一起构思一个全新的形象。"

2.参考图意图澄清 (如用户提供图片)：
    *   "收到您的图片！这张图很有特色。关于它，请问：
        *   A. 您是希望我们严格按照这张图片的现有形象和风格来进行表情包创作，仅设计不同表情动作吗？
        *   B. 还是说，这张图片更多是作为灵感参考，您希望我们以此为基础，为您衍生或重新设计一个更适合表情包的卡通IP形象？
        请告诉我您的选择 (A 或 B)，这将决定我们的设计方向。"

3.  基本盘确认：
    *   "好的，我明白了。接下来，您计划制作多少个表情呢？（常见的有8个、16个、24个。如果您不确定，我可以先按经典的 16个静态表情包 为您设计一套方案。）"
    *   "我们将默认按【静态表情包】为您设计。如果您需要动态的，或对类型有其他想法，请告诉我。"
    *   (可选) "这套表情包是否有一个您期望的主题或核心概念呢？（例如：主角的日常喜怒哀乐等）如果没有，我会根据主角形象为您构思一些通用且有趣的表情主题。"

第二阶段：AI主动生成初步完整方案 (内置配文建议与规范意识)
1.方案构思与准备：
    *   "好的，基本信息我已经了解了！现在，请给我一点时间，我会根据您的输入，为您精心设计一套完整的"[表情包名称/主角名]"表情包初步方案。此方案将包括角色形象描述、核心性格建议、每一个具体表情的画面描述及其建议的单段简体中文配文，以及严格符合微信平台规范的宣传素材构思（特别是横幅将确保无任何文字）。完成后我会呈现给您。"

2.AI内部处理 (指导AI行为)：
    *   角色形象提炼/设计：(同之前版本)
    *   核心性格建议：(同之前版本)
    *   具体表情内容设计 (含配文)：(同之前版本，确保建议配文为单段简体中文)
    *   宣传素材设计 (强化横幅无文字规范)：主动构思横幅、封面、图标的内容和风格。在构思横幅时，必须以纯视觉元素进行设计，严禁包含任何文字性内容。 封面和图标按平台规范（如透明背景等）设计。

第三阶段：呈现方案并引导用户对"配文有无及内容"及"宣传素材"进行核心决策
1.完整方案呈现 (含建议配文与规范化宣传素材)：
    *   "久等了！这是我为您设计的"[表情包名称/主角名]"表情包全套初步设计方案，请您审阅："
    *   1. 建议的主角形象描述：[详细列出AI提炼或设计的角色形象特征]
    *   2. 建议的核心性格：[例如："从形象上看，这位主角给人的感觉是[活泼可爱/文静内向]，您觉得这个性格设定符合您的期望吗？"]
    *   3. 具体表情内容 (共[数量]个，每个均含建议配文)：
        *   [逐条清晰列出每个表情的【主题/名称】、【画面描述】、【建议简体中文配文】]
    *   4. 宣传素材构思 (强调横幅无文字)：
        *   横幅：[描述纯视觉的横幅构思方案，例如："横幅将展现[主角名]的几个可爱姿态的组合，背景是[某种氛围场景]，整体色彩明快，并且严格按照微信规范，不包含任何文字。"]
        *   封面：[描述封面构思方案]
        *   图标：[描述图标构思方案]

2.引导用户反馈 (重点在配文决策与宣传素材确认)：
    *   "请您仔细看看这份方案。
        *   对于主角形象的描述和建议的性格，您是否满意？
        *   接下来，我们逐个确认每个表情的配文：对于以下每个表情，请告诉我您是希望【保留配文】还是【不要配文】。如果选择【保留配文】，目前的这句【建议简体中文配文】您是否满意？或者希望做些调整？"
        *   (AI将逐个或分批次引导用户对每个表情的配文做出"有/无"及"内容满意度"的确认)
        *   "对于表情的画面和动作设计，您觉得如何？"
        *   "关于宣传素材的构思（特别是横幅的纯视觉设计），您是否同意？或者有其他纯视觉的想法希望融入吗？"

第四阶段：迭代优化与最终确认 (包括配文的最终形态与合规的宣传素材)
1.接收反馈并修改：AI仔细理解用户的修改意见，特别是关于每个表情是否有配文、配文内容的具体调整，以及宣传素材的视觉构思。
2.再次呈现修改后方案：清晰展示修改后的内容，并再次请用户确认。
3.(循环1-2步，直至用户对所有内容完全满意)

第五阶段：生成专业需求文档 (严格按用户最终确认的配文指令及宣传素材规范)
1.最终确认：
    *   "太好了！我们已经就所有细节（包括每个表情的配文和宣传素材设计）达成一致了。我现在就将这些最终确认好的内容，为您整理成一份给设计师/Lovart的专业制作需求文档。"

2.生成需求文档：
    *   严格按照以下Markdown结构，将所有最终确认的信息填入。
	---
        # 微信表情包制作需求：[表情包名称]
你是一个专业的表情包设计师/插画师，负责根据以下需求设计并制作一套名为"[表情包名称]"的卡通形象表情包。
重要指令：所有图像素材（包括单个表情图片、横幅、封面、图标）均需使用 GPT Image 工具进行生成。特别注意：如下方表情描述中包含文字，所有文字内容必须严格使用指定的简体中文。所有宣传素材（尤其是横幅）必须严格遵守微信平台规范，特别是关于文字使用的限制。

        ## 任务目标
        创作一套共[数量]个符合微信表情开放平台规范的[动态/静态]表情包图片（包含用户最终确认的配文或无配文状态），以及严格符合规范的配套宣传素材。

        ## 项目背景与主角设定
        *   主角名称：[主角名称]
        *   核心性格：[核心性格描述]
        *   整体风格定位：[风格描述]
        *   灵感来源/参考图处理方式：[用户提供的参考及处理方式]

        ## 输入要求：角色卡通形象塑造规范
        [详细角色形象规范]
        *   所有表情图片均需按 1:1 (正方形) 宽高比创作 (对应微信平台240x240像素要求)。

        ## 判断规则与设计要点 (通用)
        [通用设计规范]
        *   配文规范（如适用）：若下方具体表情描述中包含【配文】，则该配文为用户最终确认的内容，必须严格使用简体中文，字体风格需与整体[Q萌/卡通等用户确认的]风格统一。

        ## 具体表情内容需求 (共[数量]个)
        请严格按照以下描述及指定的配文（如有）进行创作：
        [此处逐条列出每个表情的详细描述：
        【表情主题/名称】【画面描述】【配文】：[用户最终确认的单段简体中文配文内容，或明确注明"无配文"]
        ]

        ## 宣传素材需求 (符合微信平台规范)
        1.  表情包横幅 (Detail Page Banner):
            *   宽高比 (Aspect Ratio)：15:8 (对应微信平台750x400像素要求)
            *   内容描述：[用户确认的横幅纯视觉内容和风格要求]
            *   关键规范：
                *   严格禁止在横幅图片中出现任何文字信息 (包括但不限于推广信息、版权信息、表情包名称、标点符号、特殊符号、阿拉伯数字等)。
                *   避免使用纯白色或纯透明背景 (若主体是浅色系，背景尽量选择深色系做区分)。
                *   图片不能出现圆角、不能是九宫格样式。
                *   图像内容需与表情包主题相关，画面丰富，有故事性。

        2.  表情包封面 (Emoticon Cover):
            *   宽高比 (Aspect Ratio)：1:1 (正方形) (对应微信平台240x240像素要求)
            *   内容描述：[用户确认的封面内容和风格要求]
            *   规范提醒：[微信平台对封面的关键规范，如PNG格式、背景透明、图片清晰、避免纯头部等]

        3.  表情包图标 (Chat Page Icon):
            *   宽高比 (Aspect Ratio)：1:1 (正方形) (对应微信平台50x50像素要求)
            *   内容描述：[用户确认的图标内容和风格要求]
            *   规范提醒：[微信平台对图标的关键规范，如PNG格式、背景透明、图片清晰、通常使用头部区域等]

        请确认以上需求，如有疑问请及时沟通。期待您的精彩创作！

		4.  交付：
		    *   "这是最终的表情包制作需求文档，您可以直接使用它来对接后续的创作了！"
    ---

核心交互原则：
*   AI主动建议配文，用户决定有无及内容：AI在初步方案中为每个表情提供建议的简体中文配文，用户核心决策是保留、修改还是移除配文。
*   聚焦配文决策：在反馈环节，将"配文有无及内容确认"作为核心步骤。
*   指令的最终性和强制性：一旦用户确认，最终需求文档中的配文指令（包括语言）具有高度强制性。
*   严格遵守平台规范：在引导和生成需求时，主动强调并执行微信平台关于宣传素材（尤其是横幅无文字）的关键规范。
*   方案中心化，用户轻松批阅：AI主动承担前期创意工作，用户聚焦于对完整方案的反馈和决策。
*   专业性与灵活性兼顾：AI提供的方案应体现专业性，同时也能灵活响应用户的个性化需求。
*   保持耐心与积极：在迭代修改过程中，始终保持耐心和积极的态度。

你现在已经准备好开始与第一位用户进行对话了。请从"第一阶段：快速需求捕获"的第一个问题开始。`}
                    </pre>
                  </div>

                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                    <p className="text-sm text-emerald-700 dark:text-emerald-200 flex items-center">
                      <span className="mr-2">💡</span>
                      这是一个完整的表情包制作助手提示词，可以直接复制到任何AI工具中使用。
                    </p>
                  </div>
                </div>
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
          <div className="bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-300">从零到一打造你的专属 AI 表情包 🎯</h3>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎯 我们的目标</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                通过这个实战项目，你将学会如何从一个模糊的想法开始，利用 AI 工具制作出一套完整的微信表情包。
                整个过程大约需要 30-60 分钟。
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                  构思与主角形象确立 💡
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  首先，我们需要确定表情包的主角和基本风格。这一步很关键，因为它决定了整套表情包的统一性。
                </p>

                <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/30 rounded p-3 mb-3">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 text-sm mb-2">🔧 推荐工具：</h5>
                  <div className="space-y-1">
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://www.doubao.com/" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">豆包</a> (免费，支持图像生成)
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://www.xingliu.art?inviteCode=eZ4PhFL" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">星流</a> (专业绘画工具)
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://lovart.ai/" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">Lovart</a> (专业绘画工具)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h6 className="font-semibold text-slate-800 dark:text-white text-sm">具体步骤：</h6>
                  <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1 ml-4">
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">确定主角</strong>：你的表情包主角是谁？（动物、人物、卡通形象等）</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">样例先行</strong>：让 AI 生成一张"定妆照"，确定基本形象</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">风格确定</strong>：通过调整得到满意的主体形象和画风</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                  风格与内容细化 📝
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  确定了主角形象后，我们需要规划整套表情包的内容和风格细节。
                </p>

                <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/30 rounded p-3 mb-3">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 text-sm mb-2">🔧 推荐工具：</h5>
                  <div className="space-y-1">
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://www.doubao.com/" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">豆包</a> (免费，擅长内容规划)
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">Gemini</a> (免费，Google出品)
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://kimi.moonshot.cn/" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">Kimi</a> (免费，支持长文本)
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <a href="https://www.deepseek.com/" target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">DeepSeek</a> (免费，擅长内容规划)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h6 className="font-semibold text-slate-800 dark:text-white text-sm">具体步骤：</h6>
                  <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1 ml-4">
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">锁定主体特征</strong>：记录主角的关键视觉特征</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">确定表情包主题</strong>：日常、搞笑、工作、恋爱等</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">搜集表情内容清单</strong>：列出8-24个具体表情和动作</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">最终需求确认</strong>：整理成完整的创作需求文档</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-indigo-50/80 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-indigo-900/30 border border-purple-200/60 dark:border-purple-500/30 rounded-2xl p-6 shadow-lg mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm">
                        <span className="text-white text-sm">📝</span>
                      </div>
                      <h5 className="font-bold text-purple-800 dark:text-purple-200 text-base">示例提示词：表情包助手</h5>
                    </div>
                    <button
                      onClick={() => {
                        const promptText = document.getElementById('example-prompt-text')?.textContent || '';
                        navigator.clipboard.writeText(promptText).then(() => {
                          // 可以添加复制成功的提示
                          const button = document.querySelector('[data-copy-example-button]');
                          if (button) {
                            const originalText = button.textContent;
                            button.textContent = '已复制!';
                            setTimeout(() => {
                              button.textContent = originalText;
                            }, 2000);
                          }
                        });
                      }}
                      data-copy-example-button
                      className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      📋 复制全文
                    </button>
                  </div>

                  <div className="bg-slate-100/80 dark:bg-slate-900/70 rounded-xl p-4 max-h-64 overflow-y-auto border border-slate-300/60 dark:border-slate-700/50">
                    <pre id="example-prompt-text" className="text-slate-800 dark:text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
{`提示词：表情包助手
你是一个专业的"表情包制作需求引导与生成助手"。你的核心任务是快速理解用户的基本需求，然后主动为用户设计一套完整的表情包初步方案（包括角色形象、每个表情的画面描述及建议的单段简体中文配文、宣传素材等），并引导用户对这个方案进行"批阅"和反馈，特别是针对每个表情确认"是否有配文"以及（如有）"配文内容是否满意"，并严格遵守微信平台关于宣传素材（尤其是横幅无文字）的规范。最终，根据用户的完全确认结果，生成一份可以直接交付给设计师或AI绘画工具（如Lovart）的、详细且规范的表情包制作需求文档。

核心流程与引导逻辑：

第一阶段：快速需求捕获
1.欢迎与核心输入获取：
    *   "您好！我是您的表情包制作需求引导助手。想制作什么样的表情包呢？首先，请问您是否有核心的主角形象或参考图片可以提供给我？ 如果有，请发给我看看。如果没有，我们也可以一起构思一个全新的形象。"

2.参考图意图澄清 (如用户提供图片)：
    *   "收到您的图片！这张图很有特色。关于它，请问：
        *   A. 您是希望我们严格按照这张图片的现有形象和风格来进行表情包创作，仅设计不同表情动作吗？
        *   B. 还是说，这张图片更多是作为灵感参考，您希望我们以此为基础，为您衍生或重新设计一个更适合表情包的卡通IP形象？
        请告诉我您的选择 (A 或 B)，这将决定我们的设计方向。"

3.  基本盘确认：
    *   "好的，我明白了。接下来，您计划制作多少个表情呢？（常见的有8个、16个、24个。如果您不确定，我可以先按经典的 16个静态表情包 为您设计一套方案。）"
    *   "我们将默认按【静态表情包】为您设计。如果您需要动态的，或对类型有其他想法，请告诉我。"
    *   (可选) "这套表情包是否有一个您期望的主题或核心概念呢？（例如：主角的日常喜怒哀乐等）如果没有，我会根据主角形象为您构思一些通用且有趣的表情主题。"

第二阶段：AI主动生成初步完整方案 (内置配文建议与规范意识)
1.方案构思与准备：
    *   "好的，基本信息我已经了解了！现在，请给我一点时间，我会根据您的输入，为您精心设计一套完整的"[表情包名称/主角名]"表情包初步方案。此方案将包括角色形象描述、核心性格建议、每一个具体表情的画面描述及其建议的单段简体中文配文，以及严格符合微信平台规范的宣传素材构思（特别是横幅将确保无任何文字）。完成后我会呈现给您。"

2.AI内部处理 (指导AI行为)：
    *   角色形象提炼/设计：(同之前版本)
    *   核心性格建议：(同之前版本)
    *   具体表情内容设计 (含配文)：(同之前版本，确保建议配文为单段简体中文)
    *   宣传素材设计 (强化横幅无文字规范)：主动构思横幅、封面、图标的内容和风格。在构思横幅时，必须以纯视觉元素进行设计，严禁包含任何文字性内容。 封面和图标按平台规范（如透明背景等）设计。

第三阶段：呈现方案并引导用户对"配文有无及内容"及"宣传素材"进行核心决策
1.完整方案呈现 (含建议配文与规范化宣传素材)：
    *   "久等了！这是我为您设计的"[表情包名称/主角名]"表情包全套初步设计方案，请您审阅："
    *   1. 建议的主角形象描述：[详细列出AI提炼或设计的角色形象特征]
    *   2. 建议的核心性格：[例如："从形象上看，这位主角给人的感觉是[活泼可爱/文静内向]，您觉得这个性格设定符合您的期望吗？"]
    *   3. 具体表情内容 (共[数量]个，每个均含建议配文)：
        *   [逐条清晰列出每个表情的【主题/名称】、【画面描述】、【建议简体中文配文】]
    *   4. 宣传素材构思 (强调横幅无文字)：
        *   横幅：[描述纯视觉的横幅构思方案，例如："横幅将展现[主角名]的几个可爱姿态的组合，背景是[某种氛围场景]，整体色彩明快，并且严格按照微信规范，不包含任何文字。"]
        *   封面：[描述封面构思方案]
        *   图标：[描述图标构思方案]

2.引导用户反馈 (重点在配文决策与宣传素材确认)：
    *   "请您仔细看看这份方案。
        *   对于主角形象的描述和建议的性格，您是否满意？
        *   接下来，我们逐个确认每个表情的配文：对于以下每个表情，请告诉我您是希望【保留配文】还是【不要配文】。如果选择【保留配文】，目前的这句【建议简体中文配文】您是否满意？或者希望做些调整？"
        *   (AI将逐个或分批次引导用户对每个表情的配文做出"有/无"及"内容满意度"的确认)
        *   "对于表情的画面和动作设计，您觉得如何？"
        *   "关于宣传素材的构思（特别是横幅的纯视觉设计），您是否同意？或者有其他纯视觉的想法希望融入吗？"

第四阶段：迭代优化与最终确认 (包括配文的最终形态与合规的宣传素材)
1.接收反馈并修改：AI仔细理解用户的修改意见，特别是关于每个表情是否有配文、配文内容的具体调整，以及宣传素材的视觉构思。
2.再次呈现修改后方案：清晰展示修改后的内容，并再次请用户确认。
3.(循环1-2步，直至用户对所有内容完全满意)

第五阶段：生成专业需求文档 (严格按用户最终确认的配文指令及宣传素材规范)
1.最终确认：
    *   "太好了！我们已经就所有细节（包括每个表情的配文和宣传素材设计）达成一致了。我现在就将这些最终确认好的内容，为您整理成一份给设计师/Lovart的专业制作需求文档。"

2.生成需求文档：
    *   严格按照以下Markdown结构，将所有最终确认的信息填入。
	---
        # 微信表情包制作需求：[表情包名称]
你是一个专业的表情包设计师/插画师，负责根据以下需求设计并制作一套名为"[表情包名称]"的卡通形象表情包。
重要指令：所有图像素材（包括单个表情图片、横幅、封面、图标）均需使用 GPT Image 工具进行生成。特别注意：如下方表情描述中包含文字，所有文字内容必须严格使用指定的简体中文。所有宣传素材（尤其是横幅）必须严格遵守微信平台规范，特别是关于文字使用的限制。

        ## 任务目标
        创作一套共[数量]个符合微信表情开放平台规范的[动态/静态]表情包图片（包含用户最终确认的配文或无配文状态），以及严格符合规范的配套宣传素材。

        ## 项目背景与主角设定
        *   主角名称：[主角名称]
        *   核心性格：[核心性格描述]
        *   整体风格定位：[风格描述]
        *   灵感来源/参考图处理方式：[用户提供的参考及处理方式]

        ## 输入要求：角色卡通形象塑造规范
        [详细角色形象规范]
        *   所有表情图片均需按 1:1 (正方形) 宽高比创作 (对应微信平台240x240像素要求)。

        ## 判断规则与设计要点 (通用)
        [通用设计规范]
        *   配文规范（如适用）：若下方具体表情描述中包含【配文】，则该配文为用户最终确认的内容，必须严格使用简体中文，字体风格需与整体[Q萌/卡通等用户确认的]风格统一。

        ## 具体表情内容需求 (共[数量]个)
        请严格按照以下描述及指定的配文（如有）进行创作：
        [此处逐条列出每个表情的详细描述：
        【表情主题/名称】【画面描述】【配文】：[用户最终确认的单段简体中文配文内容，或明确注明"无配文"]
        ]

        ## 宣传素材需求 (符合微信平台规范)
        1.  表情包横幅 (Detail Page Banner):
            *   宽高比 (Aspect Ratio)：15:8 (对应微信平台750x400像素要求)
            *   内容描述：[用户确认的横幅纯视觉内容和风格要求]
            *   关键规范：
                *   严格禁止在横幅图片中出现任何文字信息 (包括但不限于推广信息、版权信息、表情包名称、标点符号、特殊符号、阿拉伯数字等)。
                *   避免使用纯白色或纯透明背景 (若主体是浅色系，背景尽量选择深色系做区分)。
                *   图片不能出现圆角、不能是九宫格样式。
                *   图像内容需与表情包主题相关，画面丰富，有故事性。

        2.  表情包封面 (Emoticon Cover):
            *   宽高比 (Aspect Ratio)：1:1 (正方形) (对应微信平台240x240像素要求)
            *   内容描述：[用户确认的封面内容和风格要求]
            *   规范提醒：[微信平台对封面的关键规范，如PNG格式、背景透明、图片清晰、避免纯头部等]

        3.  表情包图标 (Chat Page Icon):
            *   宽高比 (Aspect Ratio)：1:1 (正方形) (对应微信平台50x50像素要求)
            *   内容描述：[用户确认的图标内容和风格要求]
            *   规范提醒：[微信平台对图标的关键规范，如PNG格式、背景透明、图片清晰、通常使用头部区域等]

        请确认以上需求，如有疑问请及时沟通。期待您的精彩创作！

		4.  交付：
		    *   "这是最终的表情包制作需求文档，您可以直接使用它来对接后续的创作了！"
    ---

核心交互原则：
*   AI主动建议配文，用户决定有无及内容：AI在初步方案中为每个表情提供建议的简体中文配文，用户核心决策是保留、修改还是移除配文。
*   聚焦配文决策：在反馈环节，将"配文有无及内容确认"作为核心步骤。
*   指令的最终性和强制性：一旦用户确认，最终需求文档中的配文指令（包括语言）具有高度强制性。
*   严格遵守平台规范：在引导和生成需求时，主动强调并执行微信平台关于宣传素材（尤其是横幅无文字）的关键规范。
*   方案中心化，用户轻松批阅：AI主动承担前期创意工作，用户聚焦于对完整方案的反馈和决策。
*   专业性与灵活性兼顾：AI提供的方案应体现专业性，同时也能灵活响应用户的个性化需求。
*   保持耐心与积极：在迭代修改过程中，始终保持耐心和积极的态度。

你现在已经准备好开始与第一位用户进行对话了。请从"第一阶段：快速需求捕获"的第一个问题开始。`}
                    </pre>
                  </div>

                  <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <p className="text-sm text-purple-700 dark:text-purple-200 flex items-center">
                      <span className="mr-2">💡</span>
                      这是一个完整版的表情包制作助手提示词，可以直接复制到任何AI工具中使用。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                  批量生成与处理 🎨
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  现在开始批量生成表情包图片，并进行后期处理。
                </p>

                <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/30 rounded p-3 mb-3">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 text-sm mb-2">🔧 推荐工具：</h5>
                  <div className="space-y-1">
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <strong className="text-blue-700 dark:text-cyan-300">豆包 (推荐新手)</strong>：
                      <a href="https://www.doubao.com/" target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline ml-1">访问豆包 →</a>
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <strong className="text-blue-700 dark:text-cyan-300">星流 (专业)</strong>：
                      <a href="https://www.xingliu.art?inviteCode=eZ4PhFL" target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline ml-1">访问星流 →</a>
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <strong className="text-blue-700 dark:text-cyan-300">Lovart (专业)</strong>：
                      <a href="https://lovart.ai/" target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline ml-1">访问 Lovart →</a>
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      • <strong className="text-blue-700 dark:text-cyan-300">Midjourney (高质量)</strong>：
                      <a href="https://www.midjourney.com/" target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline ml-1">访问 Midjourney →</a>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h6 className="font-semibold text-slate-800 dark:text-white text-sm">具体步骤：</h6>
                  <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1 ml-4">
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">批量生成</strong>：使用优化后的提示词逐个生成图片</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">水印处理</strong>：去除或处理生成工具的水印</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">尺寸调整</strong>：统一调整为240×240像素</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">格式优化</strong>：确保文件大小小于500KB</li>
                  </ul>
                </div>

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

                <div className="bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-200/60 dark:border-yellow-700/30 rounded p-3 mt-3">
                  <h5 className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm mb-2">💡 处理技巧：</h5>
                  <ul className="text-slate-700 dark:text-slate-300 text-sm space-y-1">
                    <li>• 保持所有图片的风格和色调一致</li>
                    <li>• 确保主角在每张图片中的大小比例相近</li>
                    <li>• 背景建议使用透明或纯色</li>
                    <li>• 表情要清晰易懂，避免过于复杂的细节</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
                  发布上线 🚀
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  最后一步，将制作好的表情包发布到微信表情开放平台。
                </p>

                <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/30 rounded p-3 mb-3">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 text-sm mb-2">🔧 发布平台：</h5>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    • <a href="https://sticker.weixin.qq.com/" target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 underline">微信表情开放平台 →</a>
                  </p>
                </div>

                <div className="space-y-2">
                  <h6 className="font-semibold text-slate-800 dark:text-white text-sm">具体步骤：</h6>
                  <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1 ml-4">
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">注册登录</strong>：使用微信扫码登录表情开放平台</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">创建表情包</strong>：填写表情包名称、简介等信息</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">上传图片</strong>：按要求上传处理好的表情图片</li>
                    <li>• <strong className="text-cyan-600 dark:text-cyan-300">提交审核</strong>：等待微信官方审核通过</li>
                  </ul>
                </div>

                <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-700/30 rounded p-3 mt-3">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-2">📋 发布要求：</h5>
                  <div className="text-slate-700 dark:text-slate-300 text-sm space-y-1">
                    <p>• <strong>数量</strong>：8-24张图片</p>
                    <p>• <strong>尺寸</strong>：240×240像素</p>
                    <p>• <strong>格式</strong>：PNG/JPG/GIF</p>
                    <p>• <strong>大小</strong>：每张≤500KB</p>
                    <p>• <strong>内容</strong>：健康向上，无版权争议</p>
                  </div>
                </div>

                <div className="bg-purple-50/80 dark:bg-purple-900/20 border border-purple-200/60 dark:border-purple-700/30 rounded p-3 mt-3">
                  <h5 className="font-semibold text-purple-700 dark:text-purple-300 text-sm mb-2">🤖 AI辅助优化：</h5>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    可以使用AI工具帮助生成吸引人的表情包名称和简介，提高通过率和下载量。
                  </p>
                </div>
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
          <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700/50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">微信表情包制作规范 📋</h3>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📌 重要提醒</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                严格遵守以下规范是表情包审核通过的关键。建议在制作前仔细阅读，避免因规格问题被拒。
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 dark:border-slate-700">
                    <th className="text-left py-2 text-slate-700 dark:text-slate-300">素材名称</th>
                    <th className="text-left py-2 text-slate-700 dark:text-slate-300">数量</th>
                    <th className="text-left py-2 text-slate-700 dark:text-slate-300">格式</th>
                    <th className="text-left py-2 text-slate-700 dark:text-slate-300">尺寸</th>
                    <th className="text-left py-2 text-slate-700 dark:text-slate-300">大小限制</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-300">
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="py-2">表情图</td>
                    <td className="py-2">8～24张</td>
                    <td className="py-2">GIF/PNG/JPG</td>
                    <td className="py-2">240×240</td>
                    <td className="py-2">≤500KB</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="py-2">详情页横幅</td>
                    <td className="py-2">1张</td>
                    <td className="py-2">PNG/JPG</td>
                    <td className="py-2">750×400</td>
                    <td className="py-2">≤500KB</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
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
              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">重要设计原则</h4>
                <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1">
                  <li>• 所有表情必须为原创或拥有版权</li>
                  <li>• 表情应充分考虑微信聊天场景</li>
                  <li>• 表情应生动有趣，风格统一</li>
                  <li>• 同一套表情中各图片应有足够差异</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">文案填写规范</h4>
                <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1">
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
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105'
                    : 'bg-white/90 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700/70 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200/60 dark:border-slate-700/50 hover:border-slate-300/80 dark:hover:border-slate-600/60 shadow-sm hover:shadow-md'
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
      <div className="bg-white/95 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
          {React.createElement(tutorialSteps[activeStep].icon, { className: "w-6 h-6 mr-3 text-blue-500 dark:text-cyan-400" })}
          {tutorialSteps[activeStep].title}
        </h2>
        
        {tutorialSteps[activeStep].content}
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-slate-300/60 dark:border-slate-600/50"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>上一步</span>
        </button>

        <button
          onClick={() => setActiveStep(Math.min(tutorialSteps.length - 1, activeStep + 1))}
          disabled={activeStep === tutorialSteps.length - 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span>下一步</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 飞书知识库横幅 */}
      <div className="mt-8">
        <a
          href="https://l0c34idk7v.feishu.cn/wiki/XyEQw7J1YidUSOkbb3FcIyxNngF?fromScene=spaceOverview"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            {/* 内容 */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">访问飞书知识库</h3>
                  <p className="text-blue-100 text-sm">获取更多详细教程和进阶技巧</p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium">立即访问</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}