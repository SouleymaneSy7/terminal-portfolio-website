"use client";

import * as React from "react";
import Terminal from "@/components/Terminal";
import MobileBanner from "@/components/MobileBanner";

export default function Home() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const bannerRef = React.useRef<HTMLDivElement | null>(null);

  const [bannerVisible, setBannerVisible] = React.useState(true);
  const [bannerHeight, setBannerHeight] = React.useState(0);

  React.useEffect(() => {
    if (!bannerVisible || !bannerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const fullHeight = entry.target.getBoundingClientRect().height;
      setBannerHeight(fullHeight > 0 ? fullHeight + 12 : 0);
    });

    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, [bannerVisible]);

  return (
    <main className="w-full h-screen overflow-hidden p-4 lg:p-5">
      {bannerVisible && (
        <div ref={bannerRef}>
          <MobileBanner onClose={() => setBannerVisible(false)} />
        </div>
      )}

      <div
        className="w-full h-full max-w-480 mx-auto rounded-md bg-[linear-gradient(45deg,var(--color-foreground-clr),var(--color-primary-clr),var(--color-primary-clr),var(--color-foreground-clr))] p-0.5"
        style={{
          height:
            bannerVisible && bannerHeight > 0
              ? `calc(100% - ${bannerHeight}px)`
              : "100%",
        }}
      >
        <div
          className="terminal-container w-full h-full overflow-y-scroll bg-foreground-clr rounded-md p-2 lg:p-4"
          ref={containerRef}
        >
          <Terminal containerRef={containerRef} />
        </div>
      </div>
    </main>
  );
}
