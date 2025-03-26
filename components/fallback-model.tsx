"use client"

import { useState } from "react"
import { muscleData } from "@/lib/muscle-data"

interface FallbackModelProps {
  onMuscleSelect: (muscleId: string) => void
}

export default function FallbackModel({ onMuscleSelect }: FallbackModelProps) {
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null)

  // This is a simplified 2D representation of the human body with clickable muscle regions
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
      <div className="relative w-[300px] h-[500px]">
        {/* Human body outline */}
        <svg
          viewBox="0 0 200 400"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 100, 255, 0.3))" }}
        >
          {/* Body outline */}
          <path
            d="M100,30 C130,30 140,50 140,70 C140,90 130,110 130,130 C130,150 140,170 140,190 C140,210 120,230 120,250 C120,270 130,290 130,310 C130,330 120,350 100,370 C80,350 70,330 70,310 C70,290 80,270 80,250 C80,230 60,210 60,190 C60,170 70,150 70,130 C70,110 60,90 60,70 C60,50 70,30 100,30 Z"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Head */}
          <circle cx="100" cy="20" r="15" fill="#1e293b" stroke="#64748b" strokeWidth="2" />

          {/* Clickable muscle regions */}
          <g>
            {/* Deltoids (shoulders) */}
            <path
              d="M70,70 C60,60 60,80 70,90 M130,70 C140,60 140,80 130,90"
              fill="none"
              stroke={hoveredMuscle === "deltoids" ? "#3b82f6" : "#64748b"}
              strokeWidth="8"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("deltoids")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("deltoids")}
              style={{ cursor: "pointer" }}
            />

            {/* Pectoralis (chest) */}
            <path
              d="M85,100 C90,110 110,110 115,100"
              fill="none"
              stroke={hoveredMuscle === "pectoralis" ? "#3b82f6" : "#64748b"}
              strokeWidth="10"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("pectoralis")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("pectoralis")}
              style={{ cursor: "pointer" }}
            />

            {/* Biceps */}
            <path
              d="M60,110 C55,130 65,150 70,160 M140,110 C145,130 135,150 130,160"
              fill="none"
              stroke={hoveredMuscle === "biceps" ? "#3b82f6" : "#64748b"}
              strokeWidth="8"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("biceps")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("biceps")}
              style={{ cursor: "pointer" }}
            />

            {/* Triceps */}
            <path
              d="M65,120 C60,140 70,150 75,155 M135,120 C140,140 130,150 125,155"
              fill="none"
              stroke={hoveredMuscle === "triceps" ? "#3b82f6" : "#64748b"}
              strokeWidth="6"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("triceps")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("triceps")}
              style={{ cursor: "pointer" }}
            />

            {/* Abdominals */}
            <path
              d="M90,130 C100,135 100,135 110,130 M90,150 C100,155 100,155 110,150 M90,170 C100,175 100,175 110,170"
              fill="none"
              stroke={hoveredMuscle === "abdominals" ? "#3b82f6" : "#64748b"}
              strokeWidth="6"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("abdominals")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("abdominals")}
              style={{ cursor: "pointer" }}
            />

            {/* Latissimus */}
            <path
              d="M75,120 C80,150 85,170 90,180 M125,120 C120,150 115,170 110,180"
              fill="none"
              stroke={hoveredMuscle === "latissimus" ? "#3b82f6" : "#64748b"}
              strokeWidth="8"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("latissimus")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("latissimus")}
              style={{ cursor: "pointer" }}
            />

            {/* Quadriceps */}
            <path
              d="M85,200 C85,230 90,260 90,280 M115,200 C115,230 110,260 110,280"
              fill="none"
              stroke={hoveredMuscle === "quadriceps" ? "#3b82f6" : "#64748b"}
              strokeWidth="12"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("quadriceps")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("quadriceps")}
              style={{ cursor: "pointer" }}
            />

            {/* Hamstrings */}
            <path
              d="M80,220 C80,250 85,270 85,290 M120,220 C120,250 115,270 115,290"
              fill="none"
              stroke={hoveredMuscle === "hamstrings" ? "#3b82f6" : "#64748b"}
              strokeWidth="8"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("hamstrings")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("hamstrings")}
              style={{ cursor: "pointer" }}
            />

            {/* Gastrocnemius (calves) */}
            <path
              d="M85,300 C85,320 90,340 90,350 M115,300 C115,320 110,340 110,350"
              fill="none"
              stroke={hoveredMuscle === "gastrocnemius" ? "#3b82f6" : "#64748b"}
              strokeWidth="10"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("gastrocnemius")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("gastrocnemius")}
              style={{ cursor: "pointer" }}
            />

            {/* Trapezius */}
            <path
              d="M85,70 C90,80 100,85 110,80 C115,70"
              fill="none"
              stroke={hoveredMuscle === "trapezius" ? "#3b82f6" : "#64748b"}
              strokeWidth="8"
              strokeLinecap="round"
              onMouseEnter={() => setHoveredMuscle("trapezius")}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => onMuscleSelect("trapezius")}
              style={{ cursor: "pointer" }}
            />
          </g>
        </svg>

        {/* Hover tooltip */}
        {hoveredMuscle && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 bg-primary text-white px-3 py-1 rounded-md text-sm font-medium">
            {muscleData[hoveredMuscle]?.name || hoveredMuscle}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
        Click on any muscle group to view details
      </div>
    </div>
  )
}

