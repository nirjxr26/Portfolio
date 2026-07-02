import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <span className="text-[6rem] sm:text-[8rem] font-sans font-normal leading-none text-secondary select-none">
        404
      </span>
      <h1 className="text-xl sm:text-2xl font-sans font-normal text-foreground mt-4 text-center">
        Page not found
      </h1>
      <p className="text-secondary text-sm sm:text-base mt-2 text-center max-w-md font-normal">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-10">
        <Link
          href="/"
          className="btn-outlined px-5 py-2 rounded-full text-xs font-medium tracking-wide inline-flex items-center gap-2 cursor-pointer no-underline"
        >
          Back to homepage
        </Link>
        <a
          href="mailto:nirjargoswami2626@gmail.com"
          className="text-xs text-secondary hover:text-foreground transition-colors tracking-wide"
        >
          Report issue
        </a>
      </div>
    </div>
  );
}
