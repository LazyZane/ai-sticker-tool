'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, Scissors, Download, Settings, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle, X } from 'lucide-react'
import JSZip from 'jszip'

// --- 类型定义 ---
interface ImageFile {
  id: string
  file: File
  preview: string
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

type Handle = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'right' | 'bottom' | 'left' | 'move'

// --- 主组件 ---
export function ImageToolSection() {
  // --- 状态管理 ---
  const [images, setImages] = useState<ImageFile[]>([])
  const [cropEnabled, setCropEnabled] = useState(false)
  const [cropArea, setCropArea] = useState<CropArea>({ x: 10, y: 10, width: 200, height: 200 })
  const [selectedRatioId, setSelectedRatioId] = useState<string>('square')
  const [selectedPresetId, setSelectedPresetId] = useState('wechat-sticker')
  const [status, setStatus] = useState<string>('请上传图片')
  const [customRatioWidth, setCustomRatioWidth] = useState<string>('3')
  const [customRatioHeight, setCustomRatioHeight] = useState<string>('2')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [cropTemplate, setCropTemplate] = useState<{
    relativeX: number, relativeY: number,
    relativeWidth: number, relativeHeight: number
  } | null>(null)
  const cropAreaRef = useRef<CropArea>(cropArea)
  
  // --- Ref 管理 ---
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(new window.Image())
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const interactionRef = useRef<{
    active: boolean;
    handle: Handle | null;
    startX: number;
    startY: number;
    startCrop: CropArea;
  }>({ active: false, handle: null, startX: 0, startY: 0, startCrop: cropArea })

  // --- 静态配置 ---
  const presets = [
    { id: 'wechat-sticker', name: '微信表情图', size: '240×240', format: 'PNG/GIF', width: 240, height: 240 },
    { id: 'wechat-banner', name: '详情页横幅', size: '750×400', format: 'PNG/JPG', width: 750, height: 400 },
    { id: 'wechat-cover', name: '表情封面图', size: '240×240', format: 'PNG', width: 240, height: 240 },
    { id: 'wechat-icon', name: '聊天面板图标', size: '50×50', format: 'PNG', width: 50, height: 50 },
  ]
  const ratios = [
    { id: 'square', name: '正方形', displayName: '正方形 (1:1)', ratio: 1 },
    { id: 'landscape', name: '横屏', displayName: '横屏 (16:9)', ratio: 16/9 },
    { id: 'portrait', name: '竖屏', displayName: '竖屏 (9:16)', ratio: 9/16 },
    { id: 'photo', name: '照片', displayName: '照片 (4:3)', ratio: 4/3 },
    { id: 'free', name: '自由比例', displayName: '自由比例', ratio: null },
    { id: 'custom', name: '自定义比例', displayName: '自定义比例', ratio: null }
  ]

  // --- 核心功能 ---

  const showStatus = (message: string, duration: number = 3000) => {
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
    setStatus(message)
    statusTimeoutRef.current = setTimeout(() => setStatus('准备就绪'), duration)
  }

  const handleFileUpload = useCallback((files: FileList) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
    if (validFiles.length === 0) return
    if (images.length + validFiles.length > 24) {
      alert('最多只能处理24张图片，已超出限制。')
      return
    }
    const newImages: ImageFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
    showStatus(`成功上传 ${newImages.length} 张图片！`)
  }, [images.length])

  const removeImage = (idToRemove: string) => {
    setImages(prev => {
      const newImages = prev.filter(image => image.id !== idToRemove)
      // 如果删除的是当前选中的图片，重置索引
      if (currentImageIndex >= newImages.length) {
        setCurrentImageIndex(Math.max(0, newImages.length - 1))
      }
      return newImages
    })
  }

  const switchToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index)
    }
  }

  // 更新裁剪模板（当用户手动调整裁剪框时）
  const updateCropTemplate = (newCropArea: CropArea) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      setCropTemplate({
        relativeX: newCropArea.x / canvas.width,
        relativeY: newCropArea.y / canvas.height,
        relativeWidth: newCropArea.width / canvas.width,
        relativeHeight: newCropArea.height / canvas.height,
      })
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files) }, [handleFileUpload])
  const handleDragOver = useCallback((e: React.DragEvent) => e.preventDefault(), [])

  const draw = () => {
    if (!canvasRef.current) {
      console.log('Draw跳过: canvas引用不存在')
      return
    }
    if (!imageRef.current.complete) {
      console.log('Draw跳过: 图片未加载完成')
      return
    }
    if (imageRef.current.naturalWidth === 0) {
      console.log('Draw跳过: 图片naturalWidth为0')
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const img = imageRef.current

    console.log('开始绘制:', {
      canvasSize: { width: canvas.width, height: canvas.height },
      imageSize: { width: img.naturalWidth, height: img.naturalHeight },
      cropEnabled,
      cropArea
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    if (cropEnabled) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.beginPath()
      ctx.rect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
      ctx.clip()
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      ctx.restore()

      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 2
      ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)

      ctx.fillStyle = '#06b6d4'
      const handleSize = 8
      const { x, y, width, height } = cropArea
      const handlesPos = [
        { x, y }, { x: x + width, y },
        { x, y: y + height }, { x: x + width, y: y + height }
      ]
      handlesPos.forEach(pos => ctx.fillRect(pos.x - handleSize/2, pos.y - handleSize/2, handleSize, handleSize))
    }
  }

  const getMousePos = (e: MouseEvent | React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const getHandleUnderMouse = (pos: { x: number, y: number }): Handle | null => {
    if (!cropEnabled) return null
    const { x, y, width, height } = cropArea
    const handleSize = 10
    const borderThickness = 5 // 边框厚度，用于检测边缘区域

    // 首先检查是否在缩放手柄上（角和边的中点）
    const handles: { id: Handle; x: number; y: number }[] = [
      { id: 'topLeft', x, y }, { id: 'topRight', x: x + width, y },
      { id: 'bottomLeft', x, y: y + height }, { id: 'bottomRight', x: x + width, y: y + height },
      { id: 'top', x: x + width / 2, y }, { id: 'right', x: x + width, y: y + height / 2 },
      { id: 'bottom', x: x + width / 2, y: y + height }, { id: 'left', x, y: y + height / 2 },
    ]

    for (const handle of handles) {
      if (Math.abs(pos.x - handle.x) < handleSize && Math.abs(pos.y - handle.y) < handleSize) {
        return handle.id
      }
    }

    // 检查是否在裁剪框边缘（显示缩放光标）
    const onLeftEdge = Math.abs(pos.x - x) < borderThickness && pos.y >= y && pos.y <= y + height
    const onRightEdge = Math.abs(pos.x - (x + width)) < borderThickness && pos.y >= y && pos.y <= y + height
    const onTopEdge = Math.abs(pos.y - y) < borderThickness && pos.x >= x && pos.x <= x + width
    const onBottomEdge = Math.abs(pos.y - (y + height)) < borderThickness && pos.x >= x && pos.x <= x + width

    if (onLeftEdge) return 'left'
    if (onRightEdge) return 'right'
    if (onTopEdge) return 'top'
    if (onBottomEdge) return 'bottom'

    // 检查是否在裁剪框内部（显示移动光标）
    const insideBox = pos.x > x + borderThickness && pos.x < x + width - borderThickness &&
                      pos.y > y + borderThickness && pos.y < y + height - borderThickness

    if (insideBox) return 'move'

    return null
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cropEnabled) return
    const pos = getMousePos(e)
    const handle = getHandleUnderMouse(pos)
    if (!handle) return
    
    e.preventDefault()
    interactionRef.current = {
      active: true,
      handle,
      startX: pos.x,
      startY: pos.y,
      startCrop: { ...cropArea }
    }
  }

  const applyRatio = (ratioId: string) => {
    setSelectedRatioId(ratioId)

    let ratio: number | null = null

    if (ratioId === 'custom') {
      const widthNum = parseFloat(customRatioWidth)
      const heightNum = parseFloat(customRatioHeight)
      if (widthNum > 0 && heightNum > 0) {
        ratio = widthNum / heightNum
      }
    } else {
      ratio = ratios.find(r => r.id === ratioId)?.ratio || null
    }

    if (!ratio || !canvasRef.current) return

    const canvas = canvasRef.current
    const currentCrop = cropArea
    let newWidth = currentCrop.width
    let newHeight = newWidth / ratio

    if (currentCrop.x + newWidth > canvas.width) {
      newWidth = canvas.width - currentCrop.x
      newHeight = newWidth / ratio
    }
    if (currentCrop.y + newHeight > canvas.height) {
      newHeight = canvas.height - currentCrop.y
      newWidth = newHeight * ratio
    }
    const newCropArea = { ...cropArea, width: newWidth, height: newHeight }
    setCropArea(newCropArea)
    // 更新裁剪模板
    updateCropTemplate(newCropArea)
  }

  const generateAndDownload = async () => {
    const preset = presets.find(p => p.id === selectedPresetId)
    if (!preset) { alert("请选择一个有效的输出格式。"); return; }
    if (images.length === 0) { alert("请先上传图片。"); return; }

    setStatus(`正在处理 ${images.length} 张图片...`);
    const zip = new JSZip()
    
    for (const [i, imageFile] of images.entries()) {
      setStatus(`正在处理第 ${i + 1} / ${images.length} 张...`);
      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const tempImg = new window.Image()
          tempImg.crossOrigin = "Anonymous"
          tempImg.onload = () => resolve(tempImg)
          tempImg.onerror = () => reject(new Error(`图片 ${imageFile.file.name} 加载失败`))
          tempImg.src = imageFile.preview
        })

        const outputCanvas = document.createElement('canvas')
        const outputCtx = outputCanvas.getContext('2d')!
        outputCanvas.width = preset.width
        outputCanvas.height = preset.height

        if (cropEnabled && canvasRef.current) {
          let sx = (cropArea.x / canvasRef.current.width) * img.naturalWidth
          let sy = (cropArea.y / canvasRef.current.height) * img.naturalHeight
          let sWidth = (cropArea.width / canvasRef.current.width) * img.naturalWidth
          let sHeight = (cropArea.height / canvasRef.current.height) * img.naturalHeight
          outputCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, preset.width, preset.height)
        } else {
          outputCtx.drawImage(img, 0, 0, preset.width, preset.height)
        }
        
        const blob = await new Promise<Blob | null>(resolve => outputCanvas.toBlob(resolve, 'image/png'))
        if (blob) {
          if (images.length > 1) {
            zip.file(`sticker-${i + 1}.png`, blob)
          } else {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `sticker-${i + 1}.png`
            a.click()
            URL.revokeObjectURL(url)
          }
        }
      } catch (error) {
        console.error(error)
        alert((error as Error).message)
        setStatus('处理中断，请检查失败的图片。')
        return
      }
    }

    if (images.length > 1) {
      setStatus('正在生成压缩包...')
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'stickers.zip'
      a.click()
      URL.revokeObjectURL(url)
    }
    showStatus(`全部 ${images.length} 张图片处理完成！`)
  }

  // --- Effects ---
  // 同步cropArea到ref
  useEffect(() => {
    cropAreaRef.current = cropArea
  }, [cropArea])

  const setupCanvas = (img: HTMLImageElement) => {
    console.log('setupCanvas被调用，检查canvas引用:', !!canvasRef.current)
    if (!canvasRef.current) {
      console.log('Canvas引用不存在，可能是因为裁剪功能未启用')
      return
    }

    const canvas = canvasRef.current

    // 改进的尺寸计算逻辑，保持原图比例
    const maxSize = 400 // 统一最大尺寸
    const imgRatio = img.naturalWidth / img.naturalHeight

    console.log('图片信息:', {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      ratio: imgRatio
    })

    let canvasWidth, canvasHeight

    if (Math.abs(imgRatio - 1) < 0.01) {
      // 正方形图片：保持正方形
      const size = Math.min(maxSize, Math.min(img.naturalWidth, img.naturalHeight))
      canvasWidth = size
      canvasHeight = size
    } else if (imgRatio >= 1) {
      // 横图：以宽度为准
      canvasWidth = Math.min(maxSize, img.naturalWidth)
      canvasHeight = canvasWidth / imgRatio
    } else {
      // 竖图：以高度为准
      canvasHeight = Math.min(maxSize, img.naturalHeight)
      canvasWidth = canvasHeight * imgRatio
    }

    console.log('Canvas尺寸:', { canvasWidth, canvasHeight })

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // 如果有裁剪模板，使用模板；否则创建新的默认裁剪框
    if (cropTemplate) {
      // 使用相对比例恢复裁剪框
      const newCropArea = {
        x: cropTemplate.relativeX * canvas.width,
        y: cropTemplate.relativeY * canvas.height,
        width: cropTemplate.relativeWidth * canvas.width,
        height: cropTemplate.relativeHeight * canvas.height,
      }
      setCropArea(newCropArea)
    } else {
      // 创建默认裁剪框并保存为模板
      const initialCropWidth = canvas.width * 0.8
      const initialCropHeight = canvas.height * 0.8
      const newCropArea = {
        x: (canvas.width - initialCropWidth) / 2,
        y: (canvas.height - initialCropHeight) / 2,
        width: initialCropWidth,
        height: initialCropHeight,
      }
      setCropArea(newCropArea)

      // 保存为相对比例模板
      setCropTemplate({
        relativeX: newCropArea.x / canvas.width,
        relativeY: newCropArea.y / canvas.height,
        relativeWidth: newCropArea.width / canvas.width,
        relativeHeight: newCropArea.height / canvas.height,
      })
    }

    // 图片加载完成后立即绘制
    setTimeout(() => draw(), 0)
  }

  useEffect(() => {
    if (images.length === 0) {
      imageRef.current.src = ''
      setStatus('请上传图片')
      return
    }

    const img = imageRef.current
    const handleImageLoad = () => {
      console.log('图片加载完成')
      // 只有在裁剪启用时才设置canvas
      if (cropEnabled) {
        setupCanvas(img)
      }
    }

    // 先设置图片源 - 使用当前选中的图片
    img.src = images[currentImageIndex]?.preview || images[0]?.preview

    // 使用setTimeout确保图片源设置后再检查
    setTimeout(() => {
      if (img.complete && img.naturalWidth > 0) {
        console.log('图片已加载')
        // 只有在裁剪启用时才设置canvas
        if (cropEnabled) {
          setupCanvas(img)
        }
      } else {
        console.log('等待图片加载')
        img.onload = handleImageLoad
      }
    }, 10)
  }, [images, currentImageIndex])

  // 当裁剪功能启用时，重新设置canvas
  useEffect(() => {
    if (cropEnabled && images.length > 0 && imageRef.current.complete) {
      console.log('裁剪功能启用，重新设置canvas')
      setupCanvas(imageRef.current)
    }
  }, [cropEnabled])

  // 只在裁剪相关状态变化时重新绘制
  useEffect(() => {
    if (images.length > 0 && imageRef.current.complete) {
      draw()
    }
  }, [cropArea, cropEnabled])

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!interactionRef.current.active) return;

      const pos = getMousePos(e);
      const { startX, startY, startCrop, handle } = interactionRef.current;
      const dx = pos.x - startX;
      const dy = pos.y - startY;
      
      let newCrop = { ...startCrop };

      // 计算当前比例
      let ratio: number | null = null
      if (selectedRatioId === 'custom') {
        const widthNum = parseFloat(customRatioWidth)
        const heightNum = parseFloat(customRatioHeight)
        if (widthNum > 0 && heightNum > 0) {
          ratio = widthNum / heightNum
        }
      } else {
        ratio = ratios.find(r => r.id === selectedRatioId)?.ratio || null
      }

      if (handle === 'move') {
        newCrop.x += dx;
        newCrop.y += dy;
      } else if (handle) {
        if (handle.includes('right')) newCrop.width += dx;
        if (handle.includes('left')) { newCrop.x += dx; newCrop.width -= dx; }
        if (handle.includes('bottom')) newCrop.height += dy;
        if (handle.includes('top')) { newCrop.y += dy; newCrop.height -= dy; }

        if (ratio) {
            if (handle.includes('left') || handle.includes('right')) {
                newCrop.height = newCrop.width / ratio;
            } else {
                newCrop.width = newCrop.height * ratio;
            }
        }
      }

      const canvas = canvasRef.current!;
      newCrop.x = Math.max(0, newCrop.x);
      newCrop.y = Math.max(0, newCrop.y);
      newCrop.width = Math.max(10, newCrop.width);
      newCrop.height = Math.max(10, newCrop.height);
      if (newCrop.x + newCrop.width > canvas.width) newCrop.width = canvas.width - newCrop.x;
      if (newCrop.y + newCrop.height > canvas.height) newCrop.height = canvas.height - newCrop.y;
      
      setCropArea(newCrop);
      // 实时更新裁剪模板
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        setCropTemplate({
          relativeX: newCrop.x / canvas.width,
          relativeY: newCrop.y / canvas.height,
          relativeWidth: newCrop.width / canvas.width,
          relativeHeight: newCrop.height / canvas.height,
        });
      }
    };

    const handleWindowMouseUp = () => {
      interactionRef.current.active = false;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [selectedRatioId, customRatioWidth, customRatioHeight]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (interactionRef.current.active) return;
    const pos = getMousePos(e);
    const handle = getHandleUnderMouse(pos);
    const cursorMap: { [key in Handle]: string } = {
      topLeft: 'nwse-resize', topRight: 'nesw-resize', bottomLeft: 'nesw-resize', bottomRight: 'nwse-resize',
      top: 'ns-resize', bottom: 'ns-resize', left: 'ew-resize', right: 'ew-resize', move: 'move'
    };
    canvasRef.current!.style.cursor = handle ? cursorMap[handle] : 'default';
  }

  // --- JSX ---
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white dark:text-white text-gray-900 mb-2">AI表情包图片处理工具</h1>
        <p className="text-slate-300 dark:text-slate-300 text-gray-600">简单、高效，一键生成符合规范的表情包</p>
      </div>

      <div
        onDrop={handleDrop} onDragOver={handleDragOver}
        className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors duration-200 cursor-pointer mb-6 dark:border-slate-600 dark:hover:border-cyan-500 border-gray-300 hover:border-cyan-500"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-10 h-10 text-slate-400 dark:text-slate-400 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white dark:text-white text-gray-900 mb-1">点击或拖拽图片到此处上传</h3>
        <p className="text-slate-400 dark:text-slate-400 text-gray-500 text-sm">（最多上传24张）</p>
        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFileUpload(e.target.files)} />
      </div>

      {images.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 animate-fade-in dark:bg-slate-800/50 dark:border-slate-700/50 bg-white/80 border-gray-200/50">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">已上传图片 ({images.length})</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {images.map((image, index) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt="preview"
                    onClick={() => switchToImage(index)}
                    className={`w-full h-20 object-cover rounded-md border-2 cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                  />
                  <button onClick={() => removeImage(image.id)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                  {currentImageIndex === index && (
                    <div className="absolute bottom-1 left-1 bg-cyan-600 text-white text-xs px-1 rounded">
                      预览中
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <hr className="my-6 border-slate-700" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center"><Scissors className="mr-2" /> 统一裁剪设置</h2>
              <button onClick={() => setCropEnabled(!cropEnabled)} className="flex items-center space-x-2 text-sm">
                {cropEnabled ? <ToggleRight className="w-10 h-10 text-cyan-400" /> : <ToggleLeft className="w-10 h-10 text-slate-500" />}
                <span className={cropEnabled ? 'text-white' : 'text-slate-400'}>{cropEnabled ? '已启用' : '未启用'}</span>
              </button>
            </div>
            
            {cropEnabled && (
              <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">在第一张图上设置裁剪模板</p>
                    <div className="bg-slate-900/50 rounded-lg flex justify-center items-center p-2 min-h-[200px]">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={400}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        className="max-w-full max-h-[400px]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">比例约束</p>
                    <div className="grid grid-cols-2 gap-2">
                      {ratios.filter(ratio => ratio.id !== 'custom').map((ratio) => (
                        <button key={ratio.id} onClick={() => applyRatio(ratio.id)} className={`p-2 rounded text-sm transition-all duration-200 ${selectedRatioId === ratio.id ? 'bg-cyan-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'}`}>
                          {ratio.displayName}
                        </button>
                      ))}
                    </div>

                    {/* 自定义比例输入 */}
                    <div className="space-y-3">
                      <button
                        onClick={() => applyRatio('custom')}
                        className={`w-full p-2 rounded text-sm transition-all duration-200 ${selectedRatioId === 'custom' ? 'bg-cyan-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'}`}
                      >
                        自定义比例
                      </button>

                      {selectedRatioId === 'custom' && (
                        <div className="flex items-center space-x-2 p-3 bg-slate-900/50 rounded-lg">
                          <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={customRatioWidth}
                            onChange={(e) => setCustomRatioWidth(e.target.value)}
                            className="w-16 px-2 py-1 bg-slate-700 text-white rounded text-sm"
                            placeholder="3"
                          />
                          <span className="text-slate-400">:</span>
                          <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={customRatioHeight}
                            onChange={(e) => setCustomRatioHeight(e.target.value)}
                            className="w-16 px-2 py-1 bg-slate-700 text-white rounded text-sm"
                            placeholder="2"
                          />
                          <button
                            onClick={() => applyRatio('custom')}
                            className="px-3 py-1 bg-cyan-600 text-white rounded text-sm hover:bg-cyan-700 transition-colors"
                          >
                            应用
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 pt-4">
                      <AlertTriangle className="inline w-4 h-4 mr-1" />
                      小贴士：为达最佳效果，建议使用长宽比例相似的图片进行统一裁剪。
                    </div>
                  </div>
              </div>
            )}
          </div>

          <hr className="my-6 border-slate-700" />

          <div>
            <h2 className="text-xl font-bold text-white flex items-center mb-4"><Settings className="mr-2" /> 格式化与下载</h2>
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-2">选择输出规格</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-3 rounded-lg border text-left text-sm transition-all duration-200 ${
                      selectedPresetId === preset.id
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs opacity-75">{preset.size}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900/50 p-4 rounded-lg">
              <div className="text-slate-300 mb-4 sm:mb-0">
                <p>将处理 <strong className="text-white">{images.length}</strong> 张图片</p>
                <p>裁剪模式: <strong className={cropEnabled ? 'text-cyan-400' : 'text-slate-500'}>{cropEnabled ? '已启用' : '未启用'}</strong></p>
              </div>
              <button onClick={generateAndDownload} disabled={images.length === 0} className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                <Download className="w-5 h-5" />
                <span>生成并下载全部</span>
              </button>
            </div>
            <p className="text-center text-sm text-slate-400 mt-4 h-5 flex items-center justify-center">
              {status.includes('成功') && <CheckCircle className="w-4 h-4 mr-2 text-green-400" />}
              {status}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}