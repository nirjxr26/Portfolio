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
    title: "Yes, it's done",
    message: "Action completed successfully",
    visible: true, // Static by default as requested so design is immediately visible
  })

  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const handleNotification = (e: Event) => {
      const custom = e as CustomEvent<SiteNotificationDetail>
      if (custom.detail) {
        setNotification({
          title: custom.detail.title ?? "Yes, it's done",
          message: custom.detail.message,
          visible: true,
        })

        if (timerRef.current) {
          window.clearTimeout(timerRef.current)
        }
        // Auto dismiss after 4 seconds
        timerRef.current = window.setTimeout(() => {
          setNotification((prev) => ({ ...prev, visible: false }))
        }, 4000)
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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-xl bg-card/95 dark:bg-[#18181b]/95 text-ink border border-hairline/90 dark:border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.7)] select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[92vw] sm:max-w-max animate-in fade-in slide-in-from-bottom-2"
    >
      {/* Green circular check icon */}
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0">
        <CheckIcon width={12} height={12} strokeWidth={2.8} />
      </span>

      {/* Title & Message */}
      <div className="flex items-center gap-1.5 whitespace-nowrap text-[13px] leading-none">
        <span className="font-semibold text-ink tracking-tight">
          {notification.title}
        </span>
        {notification.message && (
          <>
            <span className="text-muted/60 select-none">·</span>
            <span className="font-medium text-muted/90 truncate max-w-[210px] sm:max-w-[340px]">
              {notification.message}
            </span>
          </>
        )}
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => setNotification((prev) => ({ ...prev, visible: false }))}
        className="flex h-5 w-5 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-canvas/80 transition-colors ml-1 shrink-0 cursor-pointer hit-area"
        aria-label="Dismiss notification"
        title="Dismiss"
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
    </aside>
  )
}
