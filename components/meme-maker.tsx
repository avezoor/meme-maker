"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function MemeMaker() {
  const [text, setText] = useState("") // Perubahan di sini, menjadi string kosong
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawContentOnCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const canvasSize = 500
    canvas.width = canvasSize
    canvas.height = canvasSize

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const padding = 40
    const maxWidth = canvas.width - padding * 2
    const lineHeightMultiplier = 1.2

    const wrapText = (
      context: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
    ) => {
      const words = text.split(" ")
      const lines: string[] = []
      let currentLine = words[0] || ""

      for (let i = 1; i < words.length; i++) {
        const word = words[i]
        const testLine = currentLine + " " + word
        const metrics = context.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && i > 0) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      lines.push(currentLine)

      const totalTextHeight = lines.length * lineHeight
      const startY = y - totalTextHeight / 2 + lineHeight / 2

      lines.forEach((line, index) => {
        context.fillText(line, x, startY + index * lineHeight)
      })

      return lines.length
    }

    let fontSize = 72
    let linesCount = 0
    const maxTextHeightArea = canvas.height - padding * 2

    do {
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      const tempLines: string[] = []
      const words = text.split(" ")
      let currentLine = words[0] || ""
      linesCount = 0

      for (let i = 1; i < words.length; i++) {
        const word = words[i]
        const testLine = currentLine + " " + word
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && i > 0) {
          tempLines.push(currentLine)
          currentLine = word
          linesCount++
        } else {
          currentLine = testLine
        }
      }
      tempLines.push(currentLine)
      linesCount++

      const totalHeightNeeded = linesCount * (fontSize * lineHeightMultiplier)
      if (totalHeightNeeded > maxTextHeightArea && fontSize > 10) {
        fontSize -= 2
      } else {
        break
      }
    } while (fontSize > 10)

    ctx.font = `bold ${fontSize}px Arial, sans-serif`
    wrapText(ctx, text, canvas.width / 2, canvas.height / 2, maxWidth, fontSize * lineHeightMultiplier)
  }, [text])

  useEffect(() => {
    drawContentOnCanvas()
  }, [drawContentOnCanvas])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = "typo-meme.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <Textarea
        placeholder="Tulis teks di sini..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-[120px] resize-y border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm transition-all duration-200"
        aria-label="Teks meme"
      />

      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-inner">
        <canvas ref={canvasRef} className="block bg-white" />
      </div>

      <Button
        onClick={handleDownload}
        className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md transition-all duration-200 rounded-lg"
        aria-label="Unduh"
      >
        <Download className="mr-2 h-5 w-5" />
        Unduh
      </Button>
    </div>
  )
}
