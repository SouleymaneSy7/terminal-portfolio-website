import Custom404 from "@/components/common/Custom404"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist. Return to the terminal.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="h-screen w-full overflow-hidden p-4 lg:p-5">
      <div className="terminal-container | mx-auto h-full w-full max-w-480 overflow-y-scroll rounded-md border-2 border-primary-clr bg-foreground-clr p-2 lg:p-4">
        <Custom404 />
      </div>
    </main>
  )
}
