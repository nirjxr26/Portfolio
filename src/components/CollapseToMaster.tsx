'use client'

import { useEffect, useRef, useState } from 'react'

const items = [
  { title: 'OTLP export connected', time: 'moments ago' },
  { title: 'Observability stack deployed', time: 'moments ago' },
  { title: 'Namespace synced', time: 'moments ago' },
  { title: 'Kyverno policies applied', time: 'moments ago' },
  { title: 'ArgoCD installed', time: 'moments ago' },
]

const staggerMs = 900
const animMs = 1200

export default function CollapseToMaster() {
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [progress, setProgress] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  const [pulse, setPulse] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = items.length

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (prefersReduced) {
          setProgress(count)
          setShowBadge(true)
          setPhase('done')
        } else {
          setPhase('running')
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [count])

  useEffect(() => {
    if (phase !== 'running') return
    if (progress >= count) {
      const t = setTimeout(() => setShowBadge(true), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setPulse(true)
      setProgress(p => p + 1)
      setTimeout(() => setPulse(false), animMs)
    }, staggerMs)
    return () => clearTimeout(t)
  }, [phase, progress, count])

  // loop: after showing ready badge, wait then reset
  useEffect(() => {
    if (phase !== 'done' || !showBadge) return
    const t = setTimeout(() => {
      setProgress(0)
      setShowBadge(false)
      setPhase('running')
    }, 3000)
    return () => clearTimeout(t)
  }, [phase, showBadge])

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex flex-col items-center justify-start pt-3 select-none"
      style={{ minHeight: 378 }}
    >
      <div className="flex flex-col items-center justify-start flex-1 w-full px-3">
        {/* header pill — always at top */}
        <div
          className={`
            flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#17150E] border border-white/[0.06] mb-3 z-10
            transition-transform ${animMs}ms ease-out
            ${pulse ? 'scale-[1.03]' : 'scale-100'}
          `}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 8.5L7 10.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] font-normal text-foreground font-sans leading-none">Cluster</span>

          {/* Ready badge */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-out
              ${showBadge ? 'max-w-[60px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'}
            `}
          >
            <span className="text-[12px] font-medium text-[#22C55E] bg-[#22C55E]/10 px-[8px] py-[3px] rounded-full whitespace-nowrap leading-none">
              Ready
            </span>
          </div>
        </div>

        {/* cards */}
        <div className="flex flex-col items-center gap-[6px] w-full">
          {items.map((item, i) => {
            const hidden = i >= count - progress
            const offset = hidden ? 0 : (count - 1 - i) * (50 + 6)
            return (
              <div
                key={item.title}
                className={`
                  flex items-center justify-between w-full px-4 py-[10px] rounded-[6px] bg-[#17150E] border border-white/[0.06]
                  ${!hidden ? 'opacity-100' : ''}
                `}
                style={{
                  minHeight: 44,
                  transition: `all ${animMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  transform: hidden
                    ? `translateY(${-offset - 80}px) scale(0.5)`
                    : 'translateY(0) scale(1)',
                  opacity: hidden ? 0 : 1,
                  marginTop: hidden ? -50 - 6 : 0,
                  pointerEvents: hidden ? 'none' : 'auto',
                }}
              >
                <span className="text-[12px] leading-[16px] text-foreground font-sans tracking-tight truncate pr-2">
                  {item.title}
                </span>
                <span className="text-[11px] leading-[16px] text-[#6B6B70] font-sans whitespace-nowrap shrink-0">
                  {item.time}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
