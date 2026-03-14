"use client";

import * as React from "react";

interface MobileBannerProps {
  onClose: () => void;
}

const MobileBanner: React.FC<MobileBannerProps> = ({ onClose }) => {
  return (
    <div className="md:hidden mb-3 border-2 border-primary-clr rounded-md px-4 py-2 bg-foreground-clr flex items-center gap-4">
      <span className="text-primary-clr shrink-0 text-fs-subtitle">⌨</span>
      <p className="text-text-clr opacity-70 grow">
        Best on desktop —{" "}
        <span className="text-secondary-clr">mobile works</span>, but grab a
        keyboard for the full experience.
      </p>
      <button
        onClick={onClose}
        className="text-text-clr cursor-pointer opacity-40 hover:opacity-100 transition-opacity shrink-0 leading-none"
        aria-label="Close banner"
      >
        ✕
      </button>
    </div>
  );
};

export default MobileBanner;
