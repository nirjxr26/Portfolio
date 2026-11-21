import { useEffect, useRef, useState } from "react"
import { CheckIcon } from "./Icons"

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
    title: "Link copied",
    message: "Page URL copied to clipboard.",
    visible: true, // Static by default as requested so design is immediately visible
  })

  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const handleNotification = (e: Event) => {
      const custom = e as CustomEvent<SiteNotificationDetail>
      if (custom.detail) {
        setNotification({
          title: custom.detail.title ?? "Action completed",
          message: custom.detail.message,
          visible: true,
        })

        if (timerRef.current) {
          window.clearTimeout(timerRef.current)
        }
        // Auto dismiss after 4.5 seconds
        timerRef.current = window.setTimeout(() => {
          setNotification((prev) => ({ ...prev, visible: false }))
        }, 4500)
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
      className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[60] flex items-start gap-3.5 p-4 rounded-[18px] backdrop-blur-2xl bg-card/95 dark:bg-[#18181b]/95 text-ink border border-hairline/90 dark:border-white/[0.12] shadow-[0_16px_45px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.7)] select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[92vw] sm:max-w-[360px] animate-in fade-in slide-in-from-top-3"
    >
      {/* Green circular checkmark icon */}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 shrink-0 mt-0.5">
        <CheckIcon width={14} height={14} strokeWidth={2.8} />
      </span>

      {/* Vertical text layout with bigger fonts */}
      <div className="flex flex-col min-w-0 pr-1">
        <span className="text-[15px] sm:text-[16px] font-semibold text-ink tracking-tight leading-snug">
          {notification.title}
        </span>
        {notification.message && (
          <p className="text-[13px] sm:text-[14px] font-normal text-muted leading-relaxed mt-0.5">
            {notification.message}
          </p>
        )}
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => setNotification((prev) => ({ ...prev, visible: false }))}
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-canvas/80 transition-colors ml-auto shrink-0 cursor-pointer -mr-1 -mt-0.5 hit-area"
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
