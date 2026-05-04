"use client"

import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import { DotsAccumulatorPropsType } from "@/types"
import { motion } from "framer-motion"
import * as React from "react"

const DotsAccumulator: React.FC<DotsAccumulatorPropsType> = ({ label = "processing command" }) => {
  const [dots, setDots] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <TerminalPrompt />

      <div className="flex items-center py-1">
        <span className="text-secondary-clr opacity-70">
          {label}
          <span className="inline-block w-[1.8ch] text-left">{".".repeat(dots)}</span>
        </span>
      </div>
    </motion.div>
  )
}

export default DotsAccumulator
