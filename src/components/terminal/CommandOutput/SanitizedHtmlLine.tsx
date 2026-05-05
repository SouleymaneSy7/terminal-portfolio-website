import DOMPurify from "dompurify";
import { motion, Variants } from "framer-motion";
import * as React from "react";

const LINE_DURATION = 0.1;

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -4 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: LINE_DURATION, ease: "easeOut" },
  },
};

const SanitizedHtmlLine = React.memo<{ text: string; index: number }>(({ text, index }) => {
  const cleanText = React.useMemo(
    () => DOMPurify.sanitize(text, { USE_PROFILES: { html: true } }),
    [text],
  );

  return (
    <motion.div
      key={index}
      className="terminal-output lg:pt-t-section lg:pl-t-section"
      variants={lineVariants}
      dangerouslySetInnerHTML={{ __html: cleanText }}
    />
  );
});

SanitizedHtmlLine.displayName = "SanitizedHtmlLine";

export default SanitizedHtmlLine;
