"use client";

import { memo } from "react";
import { useColors } from "@/context/ThemeContext";

const accentColor = "#5ba4cf";

const NODES = ["Building systems", "Leading execution", "Understanding people"];

function SectionConnector() {
  const colors = useColors();

  return (
    <div className="flex flex-col items-center py-15" aria-hidden="true">
      {NODES.map((label, i) => (
        <div key={label} className="flex flex-col items-center">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: colors.textFaint }}
          >
            {label}
          </span>
          {i < NODES.length - 1 && (
            <div
              className="w-px my-2"
              style={{
                height: 52,
                transformOrigin: "top",
                background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(SectionConnector);
