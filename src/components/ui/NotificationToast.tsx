import { useEffect, useRef, useState } from "react"
import { CheckIcon } from "@/components/ui/Icons"

export interface SiteNotificationDetail {
  title?: string
  message: string
}

export function notifySite(title: string, message?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<SiteNotificationDetail>("site-notification", {
        detail: {
          title: title || "Yes, it's done",
          message: message || "Action completed",
        },
      }),
    )
  }
}

export function NotificationToast() {
  const [notification, setNotification] = useState<{
    title: string
    message: string
    visible: boolean
  }>({
    title: "",
    message: "",
    visible: false,
  })

  const timerRef = useRef<number | null>(null)
  const lastTriggerRef = useRef<{ msg: string; time: number }>({ msg: "", time: 0 })

  useEffect(() => {
    const handleNotification = (e: Event) => {
      // Don't show notifications on touch-only mobile devices or iPads/tablets
      const isTouchOnly =
        typeof window !== "undefined" &&
        navigator.maxTouchPoints > 1 &&
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

      if (isTouchOnly) {
        return
      }

      const custom = e as CustomEvent<SiteNotificationDetail>
      if (custom.detail) {
        const now = Date.now()
        // Deduplicate rapid double clicks/triggers within 1.2s
        if (
          custom.detail.message === lastTriggerRef.current.msg &&
          now - lastTriggerRef.current.time < 1200
        ) {
          return
        }
        lastTriggerRef.current = { msg: custom.detail.message, time: now }

        setNotification({
          title: custom.detail.title ?? "Action completed",
          message: custom.detail.message,
          visible: true,
        })

        if (timerRef.current) {
          window.clearTimeout(timerRef.current)
        }
        // Auto dismiss after exactly 3 seconds
        timerRef.current = window.setTimeout(() => {
          setNotification((prev) => ({ ...prev, visible: false }))
        }, 3000)
      }
    }

    window.addEventListener("site-notification", handleNotification)
    return () => {
      window.removeEventListener("site-notification", handleNotification)
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  if (!notification.visible) return null

  return (
    <aside
      aria-label="Notification"
      aria-live="polite"
      className="hidden sm:flex fixed top-5 right-5 sm:top-6 sm:right-6 z-[60] items-start justify-between gap-4 px-5 sm:px-6 py-4 rounded-[20px] bg-[#f0f0f3] dark:bg-[#18181b] text-ink select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[92vw] sm:max-w-[380px] tracking-normal [letter-spacing:normal] animate-in fade-in slide-in-from-top-3"
    >
      {/* Left group: green circular checkmark icon centered to title and subtitle */}
      <div className="flex items-center gap-3.5 min-w-0">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 shrink-0">
          <CheckIcon width={14} height={14} strokeWidth={2.8} />
        </span>

        {/* Vertical text layout with reduced line height and normal letter-spacing */}
        <div className="flex flex-col min-w-0 pr-1 tracking-normal [letter-spacing:normal]">
          <span className="text-[15px] sm:text-[16px] font-semibold text-ink tracking-normal [letter-spacing:normal] leading-tight">
            {notification.title}
          </span>
          {notification.message && (
            <p className="text-[13px] sm:text-[14px] font-normal text-muted tracking-normal [letter-spacing:normal] leading-tight mt-1">
              {notification.message}
            </p>
          )}
        </div>
      </div>

      {/* Dismiss button - positioned at top right */}
      <button
        type="button"
        onClick={() => setNotification((prev) => ({ ...prev, visible: false }))}
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer -mr-1 -mt-0.5 hit-area self-start ml-2"
        aria-label="Dismiss notification"
        title="Dismiss"
      >
        <svg
          width={13}
          height={13}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </aside>
  )
}
