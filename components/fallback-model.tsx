"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { fallbackMuscleData } from "@/lib/fallback-muscle-data"; // Import new data source
import type { FallbackMuscleRegion } from "@/lib/fallback-muscle-data"; // Import type

// Define the props for the FallbackModel component
interface FallbackModelProps {
  /**
   * Callback function triggered when a muscle region is clicked.
   * @param muscleId - The ID of the selected muscle region.
   */
  onMuscleSelect: (muscleId: string) => void;
}

/**
 * FallbackModel Component
 *
 * Renders a simplified SVG-based human anatomy model as a fallback
 * when the primary 3D model (e.g., Sketchfab) fails to load or is unavailable.
 * Allows users to select muscle regions, adapting to theme and language settings.
 */
export default function FallbackModel({ onMuscleSelect }: FallbackModelProps) {
  // State to track the currently hovered muscle region ID
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  // State to track the current view (front, back, or side)
  const [currentView, setCurrentView] = useState<keyof typeof fallbackMuscleData>("front");
  // Hook for internationalization
  const { t } = useI18n();

  // Get the muscle regions for the current view from the imported data
  const currentMuscleRegions: FallbackMuscleRegion[] = fallbackMuscleData[currentView] || [];

  // Function to get the display name for a muscle, using i18n if available
  const getMuscleDisplayName = (muscle: FallbackMuscleRegion | undefined): string => {
    if (!muscle) return "Unknown Muscle";
    // Attempt to translate using a pattern like 'muscles.biceps.name'
    const translationKey = `muscles.${muscle.id}.name`;
    const translatedName = t(translationKey);
    // If translation exists and is not the key itself, use it. Otherwise, fallback to the name in the data.
    return translatedName !== translationKey ? translatedName : muscle.name;
  };

  return (
    // Main container, using Tailwind for layout and a gradient background
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-foreground">
      {/* View selection buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setCurrentView("front")}
          // Apply dynamic classes based on the current view using Tailwind utility classes
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentView === "front"
              ? "bg-primary text-primary-foreground" // Active state
              : "bg-background/30 text-foreground hover:bg-background/50" // Inactive state
          }`}
        >
          {t("model.front")} {/* Translate button text */}
        </button>
        <button
          onClick={() => setCurrentView("back")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentView === "back"
              ? "bg-primary text-primary-foreground"
              : "bg-background/30 text-foreground hover:bg-background/50"
          }`}
        >
          {t("model.back")} {/* Translate button text */}
        </button>
        <button
          onClick={() => setCurrentView("side")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentView === "side"
              ? "bg-primary text-primary-foreground"
              : "bg-background/30 text-foreground hover:bg-background/50"
          }`}
        >
          {t("model.side")} {/* Translate button text */}
        </button>
      </div>

      {/* SVG container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-4">
        <svg
          viewBox="0 0 360 500" // Defines the coordinate system
          className="w-full h-full max-w-md" // Responsive sizing
          preserveAspectRatio="xMidYMid meet" // Maintain aspect ratio
        >
          {/* Human body outline - uses CSS variables for theme adaptation */}
          <path
            d={
              // Selects the correct SVG path based on the current view
              currentView === "front"
                ? "M180,50 C220,50 240,70 240,100 C240,120 230,140 220,150 C240,160 250,180 250,210 C250,240 240,270 230,290 C240,300 245,320 245,340 C245,370 235,400 220,420 C230,430 235,450 235,470 C235,490 225,500 215,500 C205,500 195,490 195,470 C195,450 200,430 210,420 C195,400 185,370 185,340 C185,320 190,300 200,290 C190,270 180,240 180,210 C180,180 190,160 210,150 C200,140 190,120 190,100 C190,70 170,50 130,50 C90,50 70,70 70,100 C70,120 80,140 90,150 C70,160 60,180 60,210 C60,240 70,270 80,290 C70,300 65,320 65,340 C65,370 75,400 90,420 C80,430 75,450 75,470 C75,490 85,500 95,500 C105,500 115,490 115,470 C115,450 110,430 100,420 C115,400 125,370 125,340 C125,320 120,300 110,290 C120,270 130,240 130,210 C130,180 120,160 100,150 C110,140 120,120 120,100 C120,70 140,50 180,50 Z"
                : currentView === "back"
                ? "M180,50 C220,50 240,70 240,100 C240,120 230,140 220,150 C240,160 250,180 250,210 C250,240 240,270 230,290 C240,300 245,320 245,340 C245,370 235,400 220,420 C230,430 235,450 235,470 C235,490 225,500 215,500 C205,500 195,490 195,470 C195,450 200,430 210,420 C195,400 185,370 185,340 C185,320 190,300 200,290 C190,270 180,240 180,210 C180,180 190,160 210,150 C200,140 190,120 190,100 C190,70 170,50 130,50 C90,50 70,70 70,100 C70,120 80,140 90,150 C70,160 60,180 60,210 C60,240 70,270 80,290 C70,300 65,320 65,340 C65,370 75,400 90,420 C80,430 75,450 75,470 C75,490 85,500 95,500 C105,500 115,490 115,470 C115,450 110,430 100,420 C115,400 125,370 125,340 C125,320 120,300 110,290 C120,270 130,240 130,210 C130,180 120,160 100,150 C110,140 120,120 120,100 C120,70 140,50 180,50 Z"
                : "M160,50 C200,50 220,70 220,100 C220,120 210,140 200,150 C220,160 230,180 230,210 C230,240 220,270 210,290 C220,300 225,320 225,340 C225,370 215,400 200,420 C210,430 215,450 215,470 C215,490 205,500 195,500 C185,500 175,490 175,470 C175,450 180,430 190,420 C175,400 165,370 165,340 C165,320 170,300 180,290 C170,270 160,240 160,210 C160,180 170,160 190,150 C180,140 170,120 170,100 C170,70 150,50 110,50 C70,50 50,70 50,100 C50,120 60,140 70,150 C50,160 40,180 40,210 C40,240 50,270 60,290 C50,300 45,320 45,340 C45,370 55,400 70,420 C60,430 55,450 55,470 C55,490 65,500 75,500 C85,500 95,490 95,470 C95,450 90,430 80,420 C95,400 105,370 105,340 C105,320 100,300 90,290 C100,270 110,240 110,210 C110,180 100,160 80,150 C90,140 100,120 100,100 C100,70 120,50 160,50 Z"
            }
            // Apply theme colors using CSS variables
            fill="var(--fallback-body-fill)"
            stroke="var(--fallback-body-stroke)"
            strokeWidth="2"
          />

          {/* Render muscle regions for the current view */}
          {currentMuscleRegions.map((muscle) => {
            // Determine if the current muscle is being hovered over
            const isHovered = hoveredMuscle === muscle.id;
            // Use pre-calculated label position
            const labelPos = muscle.labelPosition || { x: 0, y: 0 };

            return (
              // Group elements for each muscle region
              <g key={muscle.id}>
                {/* Muscle region path */}
                <path
                  d={muscle.path}
                  // Apply theme colors, changing on hover
                  fill={isHovered ? "var(--fallback-muscle-fill-hover)" : "var(--fallback-muscle-fill)"}
                  stroke={isHovered ? "var(--fallback-muscle-stroke-hover)" : "var(--fallback-muscle-stroke)"}
                  strokeWidth="2"
                  style={{ cursor: "pointer", transition: "fill 0.2s, stroke 0.2s" }} // Add smooth transition
                  // Event handlers for hover and click
                  onMouseEnter={() => setHoveredMuscle(muscle.id)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  onClick={() => onMuscleSelect(muscle.id)}
                />
                {/* Number label circle */}
                <circle
                  cx={labelPos.x}
                  cy={labelPos.y}
                  r="10" // Radius of the circle
                  // Apply theme colors for the circle, changing on hover
                  fill={isHovered ? "var(--fallback-label-circle-fill-hover)" : "var(--fallback-label-circle-fill)"}
                  stroke={isHovered ? "var(--fallback-label-circle-stroke-hover)" : "var(--fallback-label-circle-stroke)"}
                  strokeWidth="1"
                  style={{ transition: "fill 0.2s, stroke 0.2s" }} // Add smooth transition
                  className="pointer-events-none" // Prevent circle from blocking path events
                />
                {/* Number label text */}
                <text
                  x={labelPos.x}
                  y={labelPos.y + 1} // Slight vertical adjustment for better centering
                  textAnchor="middle" // Center text horizontally
                  dominantBaseline="middle" // Center text vertically
                  // Apply theme colors for the text, changing on hover
                  fill={isHovered ? "var(--fallback-label-text-hover)" : "var(--fallback-label-text)"}
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none" // Prevent text from blocking path events
                  style={{ transition: "fill 0.2s" }} // Add smooth transition
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
            initial={{ opacity: 0, y: 10 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animate to visible state
            transition={{ duration: 0.2 }} // Animation duration
            // Styling for the tooltip using Tailwind classes
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-center"
          >
            {/* Display translated muscle name */}
            <p className="font-medium text-foreground">
              {getMuscleDisplayName(currentMuscleRegions.find((m) => m.id === hoveredMuscle))}
            </p>
            {/* Display translated action text */}
            <p className="text-sm text-muted-foreground">{t("muscles.click_to_view")}</p>
          </motion.div>
        )}

        {/* Muscle Legend */}
        <div className="absolute bottom-4 right-4 bg-background/50 px-3 py-2 rounded-lg text-sm max-w-[200px] md:max-w-xs backdrop-blur-sm shadow-md">
          <h4 className="font-medium mb-1">{t("model.legendTitle")}</h4> {/* Translated title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {/* Map through muscles for the current view to display in legend */}
            {currentMuscleRegions.map((muscle) => (
              <div key={muscle.id} className="flex items-center gap-1.5">
                {/* Number indicator */}
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold"
                  style={{
                    backgroundColor: "var(--fallback-label-circle-stroke)", // Use theme color
                    color: "var(--fallback-label-text-hover)", // Use theme color
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
