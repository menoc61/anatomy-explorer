"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { muscleData } from "@/lib/muscle-data"
import { useI18n } from "@/contexts/i18n-context"

interface FallbackModelProps {
  onMuscleSelect: (muscleId: string) => void
}

export default function FallbackModel({ onMuscleSelect }: FallbackModelProps) {
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<"front" | "back" | "side">("front")
  const { t } = useI18n()

  // Define muscle groups with proper anatomical positions
  const muscleGroups = {
    front: [
      {
        id: "pectoralis",
        name: "Pectoralis Major",
        path: "M 150,120 C 170,115 190,115 210,120 L 210,170 C 190,175 170,175 150,170 Z",
        number: 1,
      },
      {
        id: "deltoid",
        name: "Deltoid",
        path: "M 120,100 C 130,90 140,85 150,90 L 150,120 C 140,125 130,125 120,120 Z",
        number: 2,
      },
      {
        id: "biceps",
        name: "Biceps Brachii",
        path: "M 120,130 C 130,125 140,125 150,130 L 150,180 C 140,185 130,185 120,180 Z",
        number: 3,
      },
      {
        id: "rectus-abdominis",
        name: "Rectus Abdominis",
        path: "M 160,180 C 170,175 190,175 200,180 L 200,250 C 190,255 170,255 160,250 Z",
        number: 4,
      },
      {
        id: "quadriceps",
        name: "Quadriceps",
        path: "M 160,260 C 170,255 190,255 200,260 L 200,350 C 190,355 170,355 160,350 Z",
        number: 5,
      },
      {
        id: "tibialis-anterior",
        name: "Tibialis Anterior",
        path: "M 170,360 C 175,355 185,355 190,360 L 190,410 C 185,415 175,415 170,410 Z",
        number: 6,
      },
      {
        id: "obliques",
        name: "Obliques",
        path: "M 140,180 C 150,175 160,175 170,180 L 170,230 C 160,235 150,235 140,230 Z",
        number: 7,
      },
      {
        id: "forearm-flexors",
        name: "Forearm Flexors",
        path: "M 110,190 C 120,185 130,185 140,190 L 140,230 C 130,235 120,235 110,230 Z",
        number: 8,
      },
      {
        id: "adductors",
        name: "Adductors",
        path: "M 140,260 C 150,255 160,255 170,260 L 170,350 C 160,355 150,355 140,350 Z",
        number: 9,
      },
      {
        id: "sartorius",
        name: "Sartorius",
        path: "M 130,240 C 140,235 150,235 160,240 L 160,280 C 150,285 140,285 130,280 Z",
        number: 10,
      },
    ],
    back: [
      {
        id: "trapezius",
        name: "Trapezius",
        path: "M 150,80 C 170,75 190,75 210,80 L 210,130 C 190,135 170,135 150,130 Z",
        number: 1,
      },
      {
        id: "latissimus-dorsi",
        name: "Latissimus Dorsi",
        path: "M 140,140 C 160,135 200,135 220,140 L 220,200 C 200,205 160,205 140,200 Z",
        number: 2,
      },
      {
        id: "triceps",
        name: "Triceps",
        path: "M 120,130 C 130,125 140,125 150,130 L 150,180 C 140,185 130,185 120,180 Z",
        number: 3,
      },
      {
        id: "gluteus-maximus",
        name: "Gluteus Maximus",
        path: "M 160,210 C 180,205 200,205 220,210 L 220,260 C 200,265 180,265 160,260 Z",
        number: 4,
      },
      {
        id: "hamstrings",
        name: "Hamstrings",
        path: "M 160,270 C 180,265 200,265 220,270 L 220,350 C 200,355 180,355 160,350 Z",
        number: 5,
      },
      {
        id: "gastrocnemius",
        name: "Gastrocnemius",
        path: "M 160,360 C 180,355 200,355 220,360 L 220,410 C 200,415 180,415 160,410 Z",
        number: 6,
      },
      {
        id: "rhomboids",
        name: "Rhomboids",
        path: "M 170,110 C 180,105 190,105 200,110 L 200,140 C 190,145 180,145 170,140 Z",
        number: 7,
      },
      {
        id: "posterior-deltoid",
        name: "Posterior Deltoid",
        path: "M 120,100 C 130,95 140,95 150,100 L 150,130 C 140,135 130,135 120,130 Z",
        number: 8,
      },
      {
        id: "infraspinatus",
        name: "Infraspinatus",
        path: "M 140,110 C 150,105 160,105 170,110 L 170,140 C 160,145 150,145 140,140 Z",
        number: 9,
      },
      {
        id: "erector-spinae",
        name: "Erector Spinae",
        path: "M 175,140 C 180,135 185,135 190,140 L 190,210 C 185,215 180,215 175,210 Z",
        number: 10,
      },
    ],
    side: [
      {
        id: "deltoid",
        name: "Deltoid",
        path: "M 120,100 C 130,95 140,95 150,100 L 150,130 C 140,135 130,135 120,130 Z",
        number: 1,
      },
      {
        id: "triceps",
        name: "Triceps",
        path: "M 100,130 C 110,125 120,125 130,130 L 130,180 C 120,185 110,185 100,180 Z",
        number: 2,
      },
      {
        id: "obliques",
        name: "Obliques",
        path: "M 150,180 C 160,175 170,175 180,180 L 180,230 C 170,235 160,235 150,230 Z",
        number: 3,
      },
      {
        id: "gluteus-medius",
        name: "Gluteus Medius",
        path: "M 170,210 C 180,205 190,205 200,210 L 200,240 C 190,245 180,245 170,240 Z",
        number: 4,
      },
      {
        id: "gluteus-maximus",
        name: "Gluteus Maximus",
        path: "M 160,240 C 170,235 190,235 200,240 L 200,280 C 190,285 170,285 160,280 Z",
        number: 5,
      },
      {
        id: "hamstrings",
        name: "Hamstrings",
        path: "M 140,280 C 150,275 170,275 180,280 L 180,350 C 170,355 150,355 140,350 Z",
        number: 6,
      },
      {
        id: "gastrocnemius",
        name: "Gastrocnemius",
        path: "M 130,360 C 140,355 160,355 170,360 L 170,410 C 160,415 140,415 130,410 Z",
        number: 7,
      },
      {
        id: "soleus",
        name: "Soleus",
        path: "M 130,410 C 140,405 160,405 170,410 L 170,430 C 160,435 140,435 130,430 Z",
        number: 8,
      },
      {
        id: "biceps",
        name: "Biceps Brachii",
        path: "M 150,130 C 160,125 170,125 180,130 L 180,180 C 170,185 160,185 150,180 Z",
        number: 9,
      },
      {
        id: "quadriceps",
        name: "Quadriceps",
        path: "M 180,280 C 190,275 210,275 220,280 L 220,350 C 210,355 190,355 180,350 Z",
        number: 10,
      },
    ],
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setCurrentView("front")}
          className={`px-3 py-1 rounded-md text-sm ${
            currentView === "front" ? "bg-primary text-primary-foreground" : "bg-background/30 text-foreground"
          }`}
        >
          {t("model.front")}
        </button>
        <button
          onClick={() => setCurrentView("back")}
          className={`px-3 py-1 rounded-md text-sm ${
            currentView === "back" ? "bg-primary text-primary-foreground" : "bg-background/30 text-foreground"
          }`}
        >
          {t("model.back")}
        </button>
        <button
          onClick={() => setCurrentView("side")}
          className={`px-3 py-1 rounded-md text-sm ${
            currentView === "side" ? "bg-primary text-primary-foreground" : "bg-background/30 text-foreground"
          }`}
        >
          {t("model.side")}
        </button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 360 500" className="w-full h-full max-w-md" preserveAspectRatio="xMidYMid meet">
          {/* Human body outline */}
          <path
            d={
              currentView === "front"
                ? "M180,50 C220,50 240,70 240,100 C240,120 230,140 220,150 C240,160 250,180 250,210 C250,240 240,270 230,290 C240,300 245,320 245,340 C245,370 235,400 220,420 C230,430 235,450 235,470 C235,490 225,500 215,500 C205,500 195,490 195,470 C195,450 200,430 210,420 C195,400 185,370 185,340 C185,320 190,300 200,290 C190,270 180,240 180,210 C180,180 190,160 210,150 C200,140 190,120 190,100 C190,70 170,50 130,50 C90,50 70,70 70,100 C70,120 80,140 90,150 C70,160 60,180 60,210 C60,240 70,270 80,290 C70,300 65,320 65,340 C65,370 75,400 90,420 C80,430 75,450 75,470 C75,490 85,500 95,500 C105,500 115,490 115,470 C115,450 110,430 100,420 C115,400 125,370 125,340 C125,320 120,300 110,290 C120,270 130,240 130,210 C130,180 120,160 100,150 C110,140 120,120 120,100 C120,70 140,50 180,50 Z"
                : currentView === "back"
                  ? "M180,50 C220,50 240,70 240,100 C240,120 230,140 220,150 C240,160 250,180 250,210 C250,240 240,270 230,290 C240,300 245,320 245,340 C245,370 235,400 220,420 C230,430 235,450 235,470 C235,490 225,500 215,500 C205,500 195,490 195,470 C195,450 200,430 210,420 C195,400 185,370 185,340 C185,320 190,300 200,290 C190,270 180,240 180,210 C180,180 190,160 210,150 C200,140 190,120 190,100 C190,70 170,50 130,50 C90,50 70,70 70,100 C70,120 80,140 90,150 C70,160 60,180 60,210 C60,240 70,270 80,290 C70,300 65,320 65,340 C65,370 75,400 90,420 C80,430 75,450 75,470 C75,490 85,500 95,500 C105,500 115,490 115,470 C115,450 110,430 100,420 C115,400 125,370 125,340 C125,320 120,300 110,290 C120,270 130,240 130,210 C130,180 120,160 100,150 C110,140 120,120 120,100 C120,70 140,50 180,50 Z"
                  : "M160,50 C200,50 220,70 220,100 C220,120 210,140 200,150 C220,160 230,180 230,210 C230,240 220,270 210,290 C220,300 225,320 225,340 C225,370 215,400 200,420 C210,430 215,450 215,470 C215,490 205,500 195,500 C185,500 175,490 175,470 C175,450 180,430 190,420 C175,400 165,370 165,340 C165,320 170,300 180,290 C170,270 160,240 160,210 C160,180 170,160 190,150 C180,140 170,120 170,100 C170,70 150,50 110,50 C70,50 50,70 50,100 C50,120 60,140 70,150 C50,160 40,180 40,210 C40,240 50,270 60,290 C50,300 45,320 45,340 C45,370 55,400 70,420 C60,430 55,450 55,470 C55,490 65,500 75,500 C85,500 95,490 95,470 C95,450 90,430 80,420 C95,400 105,370 105,340 C105,320 100,300 90,290 C100,270 110,240 110,210 C110,180 100,160 80,150 C90,140 100,120 100,100 C100,70 120,50 160,50 Z"
            }
            fill="#333"
            stroke="#555"
            strokeWidth="2"
          />

          {/* Muscle groups */}
          {muscleGroups[currentView].map((muscle) => {
            const isHovered = hoveredMuscle === muscle.id

            // Calculate center point for the number label
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
            pathElement.setAttribute("d", muscle.path)
            const bbox = pathElement.getBBox ? pathElement.getBBox() : { x: 0, y: 0, width: 0, height: 0 }
            const centerX = bbox.x + bbox.width / 2
            const centerY = bbox.y + bbox.height / 2

            return (
              <g key={muscle.id}>
                <path
                  d={muscle.path}
                  fill={isHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.2)"}
                  stroke={isHovered ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.4)"}
                  strokeWidth="2"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredMuscle(muscle.id)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  onClick={() => onMuscleSelect(muscle.id)}
                />
                <circle
                  cx={muscle.path.split(" ")[1].split(",")[0]}
                  cy={muscle.path.split(" ")[1].split(",")[1]}
                  r="10"
                  fill={isHovered ? "rgba(59, 130, 246, 0.9)" : "rgba(255, 255, 255, 0.8)"}
                  stroke={isHovered ? "white" : "rgba(59, 130, 246, 0.8)"}
                  strokeWidth="1"
                />
                <text
                  x={muscle.path.split(" ")[1].split(",")[0]}
                  y={Number.parseInt(muscle.path.split(" ")[1].split(",")[1]) + 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHovered ? "white" : "black"}
                  fontSize="12"
                  fontWeight="bold"
                  style={{ pointerEvents: "none" }}
                >
                  {muscle.number}
                </text>
              </g>
            )
          })}
        </svg>

        {hoveredMuscle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
          >
            <p className="font-medium text-foreground">
              {muscleData[hoveredMuscle]?.name ||
                muscleGroups[currentView].find((m) => m.id === hoveredMuscle)?.name ||
                hoveredMuscle}
            </p>
            <p className="text-sm text-muted-foreground">{t("muscles.click_to_view")}</p>
          </motion.div>
        )}

        <div className="absolute bottom-4 right-4 bg-background/50 px-3 py-2 rounded-lg text-sm max-w-[200px] md:max-w-xs">
          <h4 className="font-medium mb-1">Muscle Legend:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {muscleGroups[currentView].map((muscle) => (
              <div key={muscle.id} className="flex items-center gap-1">
                <span className="inline-block w-4 h-4 rounded-full bg-primary/80 text-white text-[10px] flex items-center justify-center">
                  {muscle.number}
                </span>
                <span className="truncate">{muscle.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

