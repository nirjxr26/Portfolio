export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 pt-40">
      <div className="max-w-screen-2xl mx-auto space-y-4 animate-pulse">
        <div className="h-16 md:h-20 w-3/4 bg-foreground/5 rounded-sm" />
        <div className="h-16 md:h-20 w-1/2 bg-foreground/5 rounded-sm" />
        <div className="h-4 w-2/3 bg-foreground/5 rounded-sm mt-8" />
        <div className="h-4 w-1/3 bg-foreground/5 rounded-sm" />
      </div>
    </div>
  );
}
