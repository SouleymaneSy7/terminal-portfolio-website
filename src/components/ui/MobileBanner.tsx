/**
 * MobileBanner — desktop-experience notice for mobile visitors.
 *
 */

"use client";

import { MobileBannerPropsType } from "@/types";
import * as React from "react";
import VisuallyHidden from "../common/VisuallyHidden";

const MobileBanner: React.FC<MobileBannerPropsType> = ({ onClose }) => {
  return (
    <div
      role="region"
      aria-label="Experience notice"
      className="mb-3 flex items-center gap-4 rounded-md border-2 border-primary-clr bg-foreground-clr px-4 py-2 md:hidden"
    >
      <span aria-hidden="true" className="shrink-0 text-fs-subtitle text-primary-clr">
        ⌨
      </span>

      <VisuallyHidden>Best experienced on a desktop with a keyboard.</VisuallyHidden>

      <p className="grow text-text-clr opacity-70" aria-hidden="true">
        Best on desktop — <span className="text-secondary-clr">mobile works</span>, but grab a
        keyboard for the full experience.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 cursor-pointer leading-none text-text-clr opacity-40 transition-opacity hover:opacity-100"
        aria-label="Close experience notice"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
};

export default MobileBanner;
