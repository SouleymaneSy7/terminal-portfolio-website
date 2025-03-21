"use client";

import * as React from "react";
import Terminal from "@/components/Terminal";

export default function Home() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <main className="w-full h-screen overflow-hidden p-4 lg:p-5">
      <div
        className="terminal-container | w-full h-full overflow-y-scroll border-2 border-primary-clr rounded-md bg-foreground-clr p-2 lg:p-4"
        ref={containerRef}
      >
        <Terminal containerRef={containerRef} />
      </div>
    </main>
  );
}
