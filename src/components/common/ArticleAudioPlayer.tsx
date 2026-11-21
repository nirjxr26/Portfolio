import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { BlogArticle } from "@/data/blogArticles"
import { HeadphonesIcon, PauseIcon, PlayIcon } from "./Icons"
import { notifySite } from "./NotificationToast"

export function cleanTextForSpeech(text: string): string {
  return text
    // Replace markdown code blocks with a brief natural narration
    .replace(/```[\s\S]*?```/g, "Code block omitted.")
    // Strip markdown images first: ![alt](url) -> ""
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    // Strip inline backticks: `code` -> code
    .replace(/`([^`]+)`/g, "$1")
    // Strip markdown links: [link text](url) -> link text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Strip markdown headers: ### Header -> Header
    .replace(/^#+\s+/gm, "")
    // Strip bold/italics markers: **text** or *text* -> text
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    // Strip blockquote markers: > quote -> quote
    .replace(/^>\s+/gm, "")
    // Strip bullet points: - item -> item
    .replace(/^[-*+]\s+/gm, "")
    // Normalize spaces and linebreaks
    .replace(/\s+/g, " ")
    .trim()
}

export function prepareSpeechChunks(article: BlogArticle): string[] {
  const chunks: string[] = []

  // 1. Title & Subhead
  const introParts = [article.title, article.subhead].filter(Boolean) as string[]
  const intro = introParts.map(cleanTextForSpeech).join(". ")
  if (intro) chunks.push(intro)

  // 2. Sections
  for (const section of article.sections) {
    if (section.subtitle) {
      const sub = cleanTextForSpeech(section.subtitle)
      if (sub) chunks.push(sub)
    }

    const cleaned = cleanTextForSpeech(section.content)
    if (cleaned) {
      // Split into sentences (~150-220 characters max) to prevent browser buffer stalls
      const sentences = cleaned.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [cleaned]
      let current = ""
      for (const s of sentences) {
        const trimmed = s.trim()
        if (!trimmed) continue
        if ((current + " " + trimmed).length > 200) {
          if (current) chunks.push(current)
          current = trimmed
        } else {
          current = current ? `${current} ${trimmed}` : trimmed
        }
      }
      if (current) chunks.push(current)
    }
  }

  return chunks
}

interface ArticleAudioPlayerProps {
  article: BlogArticle
}

export function ArticleAudioPlayer({ article }: Readonly<ArticleAudioPlayerProps>) {
  const [supported, setSupported] = useState(false)
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle")
  const [chunkIndex, setChunkIndex] = useState(0)
  const [rate, setRate] = useState<1 | 1.25 | 1.5>(1)

  const chunks = useMemo(() => prepareSpeechChunks(article), [article])
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const isCancelledRef = useRef(false)
  const chunkIndexRef = useRef(0)
  const rateRef = useRef(rate)

  useEffect(() => {
    rateRef.current = rate
  }, [rate])

  useEffect(() => {
    chunkIndexRef.current = chunkIndex
  }, [chunkIndex])

  // Feature detection
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      setSupported(true)
    }
  }, [])

  // Auto-stop narration on unmount or article change
  useEffect(() => {
    return () => {
      isCancelledRef.current = true
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [article.slug])

  const getBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null
    const voices = window.speechSynthesis.getVoices()
    if (!voices || voices.length === 0) return null

    // Look for high-quality English natural voices (macOS Samantha/Daniel, Chrome Google Natural, Windows Natural)
    const natural = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Natural") ||
          v.name.includes("Samantha") ||
          v.name.includes("Daniel") ||
          v.name.includes("Google") ||
          v.name.includes("Premium")),
    )
    if (natural) return natural

    const english = voices.find((v) => v.lang.startsWith("en"))
    return english || voices[0] || null
  }, [])

  const speakChunk = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return
      if (index >= chunks.length) {
        // Finished entire article
        setState("idle")
        setChunkIndex(0)
        notifySite("Narration finished", `Completed listening to "${article.title}".`)
        return
      }

      window.speechSynthesis.cancel()
      const text = chunks[index]
      const utterance = new SpeechSynthesisUtterance(text)

      const voice = getBestVoice()
      if (voice) utterance.voice = voice

      utterance.rate = rateRef.current
      utterance.pitch = 1.0

      utterance.onend = () => {
        if (isCancelledRef.current) return
        const nextIdx = index + 1
        setChunkIndex(nextIdx)
        speakChunk(nextIdx)
      }

      utterance.onerror = (e) => {
        // "canceled" or "interrupted" are normal when user pauses or stops
        if (e.error === "canceled" || e.error === "interrupted") return
        setState("idle")
      }

      activeUtteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    [article.title, chunks, getBestVoice],
  )

  const handleStart = () => {
    if (!supported || chunks.length === 0) return
    isCancelledRef.current = false
    setState("playing")
    speakChunk(chunkIndex)
  }

  const handlePause = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return
    setState("paused")
    window.speechSynthesis.pause()
  }

  const handleResume = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return
    setState("playing")
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    } else {
      speakChunk(chunkIndexRef.current)
    }
  }

  const handleStop = () => {
    isCancelledRef.current = true
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setState("idle")
    setChunkIndex(0)
  }

  const cycleRate = () => {
    const nextRate: 1 | 1.25 | 1.5 = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1
    setRate(nextRate)
    rateRef.current = nextRate

    // If currently playing, restart current chunk with new rate
    if (state === "playing") {
      speakChunk(chunkIndexRef.current)
    }
  }

  if (!supported || chunks.length === 0) {
    return null
  }

  const progressPercent = Math.min(100, Math.round((chunkIndex / chunks.length) * 100))

  return (
    <div className="flex items-center select-none" aria-label="Article narration player">
      {state === "idle" ? (
        <button
          type="button"
          onClick={handleStart}
          className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-surface-alt hover:bg-surface-alt/80 text-ink font-medium text-[13px] sm:text-[13.5px] border border-hairline/80 dark:border-hairline/40 transition-all hover:border-hairline active:scale-[0.98] select-none cursor-pointer hit-area shadow-2xs"
          aria-label={`Listen to article (${article.readTime} read)`}
        >
          <HeadphonesIcon width={14} height={14} className="text-accent shrink-0" />
          <span>Listen to article</span>
          <span className="text-muted/60 text-[11px]" aria-hidden="true">
            •
          </span>
          <span className="text-muted text-[12px]">{article.readTime} read</span>
        </button>
      ) : (
        <div className="inline-flex items-center gap-2.5 sm:gap-3 h-10 px-3 py-1.5 rounded-full bg-surface-alt dark:bg-[#18181b] text-ink border border-hairline/90 dark:border-hairline/50 shadow-md backdrop-blur-md transition-all select-none max-w-full animate-in fade-in zoom-in-95 duration-200">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={state === "playing" ? handlePause : handleResume}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white hover:opacity-90 transition-opacity cursor-pointer shrink-0 active:scale-95 hit-area"
            aria-label={state === "playing" ? "Pause narration" : "Resume narration"}
            title={state === "playing" ? "Pause" : "Resume"}
          >
            {state === "playing" ? (
              <PauseIcon width={11} height={11} />
            ) : (
              <PlayIcon width={11} height={11} className="ml-0.5" />
            )}
          </button>

          {/* Progress bar & Percent */}
          <div className="flex items-center gap-2 min-w-[70px] sm:min-w-[90px]">
            <div className="h-1.5 w-16 sm:w-20 rounded-full bg-hairline dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-muted tabular-nums shrink-0">
              {progressPercent}%
            </span>
          </div>

          {/* Speed Toggle (1x, 1.25x, 1.5x) */}
          <button
            type="button"
            onClick={cycleRate}
            className="px-2 py-0.5 rounded-full bg-canvas/80 dark:bg-white/[0.08] hover:bg-canvas text-muted hover:text-ink text-[11px] font-mono font-medium transition-colors cursor-pointer select-none border border-hairline/40 hit-area"
            aria-label={`Playback speed: ${rate}x. Click to change.`}
            title="Change playback speed"
          >
            {rate}×
          </button>

          {/* Stop / Dismiss Button */}
          <button
            type="button"
            onClick={handleStop}
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 hit-area ml-0.5"
            aria-label="Stop narration"
            title="Stop narration"
          >
            <svg
              width={11}
              height={11}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
