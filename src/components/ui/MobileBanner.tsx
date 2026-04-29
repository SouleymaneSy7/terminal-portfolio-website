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
      className="md:hidden mb-3 border-2 border-primary-clr rounded-md px-4 py-2 bg-foreground-clr flex items-center gap-4"
    >
      <span
        aria-hidden="true"
        className="text-primary-clr shrink-0 text-fs-subtitle"
      >
        ⌨
      </span>

      <VisuallyHidden>
        Best experienced on a desktop with a keyboard.
      </VisuallyHidden>

      <p className="text-text-clr opacity-70 grow" aria-hidden="true">
        Best on desktop —{" "}
        <span className="text-secondary-clr">mobile works</span>, but grab a
        keyboard for the full experience.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="text-text-clr cursor-pointer opacity-40 hover:opacity-100 transition-opacity shrink-0 leading-none"
        aria-label="Close experience notice"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
};

export default MobileBanner;
