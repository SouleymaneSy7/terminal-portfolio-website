import { CommandHistory } from "@/types";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import * as React from "react";
import TerminalPrompt from "./TerminalPrompt";

const CommandOutput = dynamic(() => import("./CommandOutput/CommandOutput"), {
  ssr: false,
});

const HistoryEntry = React.memo<{
  item: CommandHistory;
  index: number;
  isLastEntry: boolean;
  setInputReady: (ready: boolean) => void;
}>(({ item, index, isLastEntry, setInputReady }) => {
  return (
    <motion.div
      key={item.id ?? `${item.command}-${index}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 0.85, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <TerminalPrompt />
      <span className="text-secondary-clr"> {item.command}</span>
      <br />

      {item.output.map((block, bi) => {
        const isLastBlock = bi === item.output.length - 1;
        const handleComplete = isLastEntry && isLastBlock ? () => setInputReady(true) : undefined;

        return (
          <CommandOutput
            key={bi}
            outputTypes={block.type}
            outputLines={"content" in block ? block.content : []}
            component={"component" in block ? block.component : undefined}
            onComplete={handleComplete}
          />
        );
      })}
    </motion.div>
  );
});

HistoryEntry.displayName = "HistoryEntry";

export default HistoryEntry;
