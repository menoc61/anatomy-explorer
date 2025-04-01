"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { fallbackMuscleData } from "@/lib/fallback-muscle-data";
import type { FallbackMuscleRegion } from "@/lib/fallback-muscle-data";

interface FallbackModelProps {
  onMuscleSelect: (muscleId: string) => void;
}

export default function FallbackModel({ onMuscleSelect }: FallbackModelProps) {
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const [currentView, setCurrentView] =
    useState<keyof typeof fallbackMuscleData>("front");
  const { t } = useI18n();

  const currentMuscleRegions: FallbackMuscleRegion[] =
    fallbackMuscleData[currentView] || [];

  const getMuscleDisplayName = (
    muscle: FallbackMuscleRegion | undefined
  ): string => {
    if (!muscle) return "Unknown Muscle";
    const translationKey = `muscles.${muscle.id}.name`;
    const translatedName = t(translationKey);
    return translatedName !== translationKey ? translatedName : muscle.name;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-foreground">
      {/* View selection buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setCurrentView("front")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentView === "front"
              ? "bg-primary text-primary-foreground"
              : "bg-background/30 text-foreground hover:bg-background/50"
          }`}
        >
          {t("model.front")}
        </button>
        <button
          onClick={() => setCurrentView("back")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentView === "back"
              ? "bg-primary text-primary-foreground"
              : "bg-background/30 text-foreground hover:bg-background/50"
          }`}
        >
          {t("model.back")}
        </button>
        <button
          onClick={() => setCurrentView("side")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentView === "side"
              ? "bg-primary text-primary-foreground"
              : "bg-background/30 text-foreground hover:bg-background/50"
          }`}
        >
          {t("model.side")}
        </button>
      </div>

      {/* SVG container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-4">
        <svg
          viewBox="0 0 360 500"
          className="w-full h-full max-w-md"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={
              currentView === "front"
                ? "M 180 20 C 200 20 220 40 220 60 C 220 80 200 100 180 100 C 160 100 140 80 140 60 C 140 40 160 20 180 20 Z M 140 100 L 120 160 C 110 180 110 200 120 220 L 140 280 C 140 300 130 320 130 340 L 130 400 C 130 420 120 440 120 460 L 120 480 C 120 490 130 500 140 500 C 150 500 160 490 160 480 L 160 460 C 160 440 150 420 150 400 L 150 340 C 150 320 160 300 160 280 L 180 220 L 200 280 C 200 300 210 320 210 340 L 210 400 C 210 420 200 440 200 460 L 200 480 C 200 490 210 500 220 500 C 230 500 240 490 240 480 L 240 460 C 240 440 230 420 230 400 L 230 340 C 230 320 240 300 240 280 L 260 220 C 270 200 270 180 260 160 L 240 100 Z"
                : currentView === "back"
                  ? "M 180 20 C 200 20 220 40 220 60 C 220 80 200 100 180 100 C 160 100 140 80 140 60 C 140 40 160 20 180 20 Z M 140 100 L 110 160 C 100 180 100 200 110 220 L 140 280 C 140 300 130 320 130 340 L 130 400 C 130 420 120 440 120 460 L 120 480 C 120 490 130 500 140 500 C 150 500 160 490 160 480 L 160 460 C 160 440 150 420 150 400 L 150 340 C 150 320 160 300 160 280 L 180 220 L 200 280 C 200 300 210 320 210 340 L 210 400 C 210 420 200 440 200 460 L 200 480 C 200 490 210 500 220 500 C 230 500 240 490 240 480 L 240 460 C 240 440 230 420 230 400 L 230 340 C 230 320 240 300 240 280 L 270 220 C 280 200 280 180 270 160 L 240 100 Z"
                  : "M 180 20 C 200 20 220 40 220 60 C 220 80 200 100 180 100 C 160 100 140 80 140 60 C 140 40 160 20 180 20 Z M 180 100 L 240 160 C 250 180 250 200 240 220 L 200 280 C 200 300 210 320 210 340 L 210 400 C 210 420 200 440 200 460 L 200 480 C 200 490 210 500 220 500 C 230 500 240 490 240 480 L 240 460 C 240 440 230 420 230 400 L 230 340 C 230 320 220 300 220 280 L 220 220 L 180 280 C 180 300 170 320 170 340 L 170 400 C 170 420 160 440 160 460 L 160 480 C 160 490 170 500 180 500 C 190 500 200 490 200 480 L 200 460 C 200 440 190 420 190 400 L 190 340 C 190 320 200 300 200 280 L 240 220 L 240 160 Z"
            }
            fill="var(--fallback-body-fill)"
            stroke="var(--fallback-body-stroke)"
            strokeWidth="2"
          />
          {currentMuscleRegions.map((muscle) => {
            const isHovered = hoveredMuscle === muscle.id;
            const labelPos = muscle.labelPosition || { x: 0, y: 0 };

            return (
              <g key={muscle.id}>
                <path
                  d={muscle.path}
                  fill={
                    isHovered
                      ? "var(--fallback-muscle-fill-hover)"
                      : "var(--fallback-muscle-fill)"
                  }
                  stroke={
                    isHovered
                      ? "var(--fallback-muscle-stroke-hover)"
                      : "var(--fallback-muscle-stroke)"
                  }
                  strokeWidth="2"
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s, stroke 0.2s",
                  }}
                  onMouseEnter={() => setHoveredMuscle(muscle.id)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  onClick={() => onMuscleSelect(muscle.id)}
                />
                <circle
                  cx={labelPos.x}
                  cy={labelPos.y}
                  r="10"
                  fill={
                    isHovered
                      ? "var(--fallback-label-circle-fill-hover)"
                      : "var(--fallback-label-circle-fill)"
                  }
                  stroke={
                    isHovered
                      ? "var(--fallback-label-circle-stroke-hover)"
                      : "var(--fallback-label-circle-stroke)"
                  }
                  strokeWidth="1"
                  style={{ transition: "fill 0.2s, stroke 0.2s" }}
                  className="pointer-events-none"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={
                    isHovered
                      ? "var(--fallback-label-text-hover)"
                      : "var(--fallback-label-text)"
                  }
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none"
                  style={{ transition: "fill 0.2s" }}
                >
                  {muscle.number}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip displayed when hovering over a muscle */}
        {hoveredMuscle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-center"
          >
            <p className="font-medium text-foreground">
              {getMuscleDisplayName(
                currentMuscleRegions.find((m) => m.id === hoveredMuscle)
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("muscles.click_to_view")}
            </p>
          </motion.div>
        )}

        {/* Muscle Legend */}
        <div className="absolute bottom-4 right-4 bg-background/50 px-3 py-2 rounded-lg text-sm max-w-[200px] md:max-w-xs backdrop-blur-sm shadow-md">
          <h4 className="font-medium mb-1">{t("model.legendTitle")}</h4>{" "}
          {/* Translated title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {currentMuscleRegions.map((muscle) => (
              <div key={muscle.id} className="flex items-center gap-1.5">
                {/* Number indicator */}
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold"
                  style={{
                    backgroundColor: "var(--fallback-label-circle-stroke)",
                    color: "var(--fallback-label-text-hover)",
                  }}
                >
                  {muscle.number}
                </span>
                {/* Translated muscle name */}
                <span className="truncate">{getMuscleDisplayName(muscle)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
