"use client";

import { CommandOutputPropsType } from "@/types";
import * as React from "react";

const CommandOutput: React.FC<CommandOutputPropsType> = ({ outputLines }) => {
  return (
    <div>
      {outputLines.map((outpute: string, index: number) => (
        <p key={index}>{outpute}</p>
      ))}
    </div>
  );
};

export default CommandOutput;
