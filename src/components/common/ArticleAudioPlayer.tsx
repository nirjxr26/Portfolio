import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { BlogArticle } from "@/data/blogArticles"
import { LinkIcon, PauseIcon, PlayIcon } from "./Icons"
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

export function calculateAudioDuration(chunks: string[], wpm = 145): { totalSeconds: number; formatted: string } {
  const text = chunks.join(" ")
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const totalSeconds = Math.max(60, Math.round((words / wpm) * 60))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return {
    totalSeconds,
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
  }
}

interface ArticleAudioPlayerProps {
  article: BlogArticle
  onShare?: () => void
  className?: string
}

export function ArticleAudioPlayer({ article, onShare, className = "" }: Readonly<ArticleAudioPlayerProps>) {
  const [supported, setSupported] = useState(false)
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle")
  const [chunkIndex, setChunkIndex] = useState(0)
  const [rate, setRate] = useState<1 | 1.25 | 1.5>(1)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  const chunks = useMemo(() => prepareSpeechChunks(article), [article])
  const duration = useMemo(() => calculateAudioDuration(chunks), [chunks])

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

  // Feature detection & voice loading
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      return
    }
    setSupported(true)

    const updateVoices = () => {
      try {
        const v = window.speechSynthesis.getVoices()
        if (v && v.length > 0) {
          setVoices(v)
        }
      } catch {}
    }

    updateVoices()
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices)
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices)
    }
  }, [])

  // Auto-stop narration on unmount or article change
  useEffect(() => {
    return () => {
      isCancelledRef.current = true
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel()
        } catch {}
      }
    }
  }, [article.slug])

  const getBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null
    const list = voices.length > 0 ? voices : window.speechSynthesis.getVoices()
    if (!list || list.length === 0) return null

    // Look for high-quality natural voices (macOS Samantha/Daniel/Ava, Chrome Google Natural, Windows Natural)
    const natural = list.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Natural") ||
          v.name.includes("Samantha") ||
          v.name.includes("Daniel") ||
          v.name.includes("Google") ||
          v.name.includes("Premium") ||
          v.name.includes("Ava") ||
          v.name.includes("Jenny")),
    )
    if (natural) return natural

    const english = list.find((v) => v.lang.startsWith("en"))
    return english || list[0] || null
  }, [voices])

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

      const text = chunks[index]?.trim()
      if (!text) {
        if (index + 1 < chunks.length) {
          speakChunk(index + 1)
        } else {
          setState("idle")
        }
        return
      }

      // If paused, unpause first
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"

      const voice = getBestVoice()
      if (voice) {
        utterance.voice = voice
        utterance.lang = voice.lang || "en-US"
      }

      utterance.rate = rateRef.current || 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0

      utterance.onstart = () => {
        setState("playing")
      }

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

      // Chromium Bug Fix: prevent V8 garbage collection mid-speech
      ;(window as unknown as { __speechUtterance?: SpeechSynthesisUtterance }).__speechUtterance = utterance
      activeUtteranceRef.current = utterance

      window.speechSynthesis.speak(utterance)
    },
    [article.title, chunks, getBestVoice],
  )

  const handleStart = () => {
    if (!supported || chunks.length === 0) return
    isCancelledRef.current = false
    setState("playing")

    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
        setTimeout(() => {
          speakChunk(chunkIndexRef.current)
        }, 40)
        return
      }
    }

    speakChunk(chunkIndexRef.current)
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

  // Calculate elapsed progress formatted string
  const elapsedSeconds = Math.round((chunkIndex / Math.max(1, chunks.length)) * duration.totalSeconds)
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const elapsedRemainingSec = elapsedSeconds % 60
  const elapsedFormatted = `${elapsedMinutes}:${elapsedRemainingSec.toString().padStart(2, "0")}`

  const displayTime =
    state === "playing" || state === "paused"
      ? `${elapsedFormatted} / ${duration.formatted}`
      : duration.formatted

  return (
    <div
      className={`flex items-center justify-between w-full py-3.5 sm:py-4 select-none ${className}`.trim()}
      aria-label="Article narration and share bar"
    >
      {/* Left side: Circular Play button + "Listen to article" + "|" + Duration */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={() => {
            if (state === "playing") {
              handlePause()
            } else if (state === "paused") {
              handleResume()
            } else {
              handleStart()
            }
          }}
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#1c1c1e] dark:bg-[#27272a] text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm shrink-0 hit-area"
          aria-label={state === "playing" ? "Pause narration" : "Listen to article"}
          title={state === "playing" ? "Pause narration" : "Listen to article"}
        >
          {state === "playing" ? (
            <PauseIcon width={13} height={13} />
          ) : (
            <PlayIcon width={13} height={13} className="ml-0.5" />
          )}
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[15px] sm:text-[16px] font-semibold text-ink tracking-tight select-none whitespace-nowrap">
            Listen to article
          </span>

          <span className="h-4 w-px bg-hairline dark:bg-hairline/70 select-none shrink-0" aria-hidden="true" />

          <span className="text-[14px] sm:text-[15px] font-medium text-ink/90 dark:text-ink/90 font-mono tracking-tight select-none whitespace-nowrap">
            {displayTime}
          </span>

          {/* Quick speed toggle & stop controls visible when active */}
          {(state === "playing" || state === "paused") && (
            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={cycleRate}
                className="px-2 py-0.5 rounded-full bg-surface-alt hover:bg-hairline text-muted hover:text-ink text-[11px] font-mono font-medium transition-colors cursor-pointer select-none border border-hairline/60 hit-area"
                aria-label={`Playback speed: ${rate}x. Click to change.`}
                title="Change speed"
              >
                {rate}×
              </button>

              <button
                type="button"
                onClick={handleStop}
                className="flex h-5 w-5 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer hit-area"
                aria-label="Stop narration"
                title="Stop narration"
              >
                <svg
                  width={10}
                  height={10}
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
      </div>

      {/* Right side: Share icon + "Share" text */}
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          className="flex items-center gap-1.5 sm:gap-2 text-ink hover:text-accent transition-colors font-medium sm:font-semibold text-[14px] sm:text-[15px] cursor-pointer select-none hit-area shrink-0 ml-4"
          aria-label="Share article"
          title="Share this article"
        >
          <LinkIcon width={16} height={16} strokeWidth={2.2} className="shrink-0" />
          <span>Share</span>
        </button>
      )}
    </div>
  )
}
