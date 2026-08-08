import Link from "next/link";
import { MAILTO } from "@/lib/email";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24 text-center">
        <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-sans font-normal leading-none text-foreground/20 select-none tracking-tighter">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-foreground tracking-tight mt-2 md:mt-4 text-center">
          Page not found
        </h1>
        <p className="text-secondary text-sm sm:text-base mt-2 max-w-sm mx-auto leading-relaxed text-center">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link href="/" className="btn-cta">
            Back to homepage
          </Link>
          <a
            href={MAILTO}
            className="btn-outlined px-5 py-2.5 rounded-full text-xs font-medium tracking-normal inline-flex items-center gap-2 cursor-pointer no-underline"
          >
            Report issue
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
