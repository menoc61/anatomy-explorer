// lib/fallback-muscle-data.ts

/**
 * Represents the data for a single muscle region within a specific view
 * for the fallback SVG model.
 */
export interface FallbackMuscleRegion {
  id: string; // Unique identifier for the muscle region (e.g., 'pectoralis', 'biceps')
  name: string; // Display name (consider using i18n keys later)
  path: string; // SVG path data for rendering the muscle shape
  number: number; // Number displayed on the model for this region in this view
  labelPosition: { x: number; y: number }; // Pre-calculated position for the number label
}

/**
 * Defines the structure for fallback muscle data, organized by view.
 */
export interface FallbackMuscleData {
  front: FallbackMuscleRegion[];
  back: FallbackMuscleRegion[];
  side: FallbackMuscleRegion[];
}

/**
 * Extracts the starting coordinate from an SVG path string (e.g., "M x,y ...").
 * @param path - The SVG path string.
 * @returns The {x, y} coordinates or {x: 0, y: 0} if parsing fails.
 */
const getLabelPositionFromPath = (path: string): { x: number; y: number } => {
  try {
    const parts = path.split(" ")[1]?.split(",");
    if (parts && parts.length === 2) {
      const x = parseFloat(parts[0]);
      const y = parseFloat(parts[1]);
      return { x: isNaN(x) ? 0 : x, y: isNaN(y) ? 0 : y };
    }
  } catch (error) {
    console.error("Error parsing path for label position:", path, error);
  }
  return { x: 0, y: 0 }; // Default fallback
};


export const fallbackMuscleData: FallbackMuscleData = {
  front: [
    {
      id: "pectoralis",
      name: "Pectoralis Major",
      path: "M 150,120 C 170,115 190,115 210,120 L 210,170 C 190,175 170,175 150,170 Z",
      number: 1,
      labelPosition: getLabelPositionFromPath("M 150,120 C 170,115 190,115 210,120 L 210,170 C 190,175 170,175 150,170 Z"),
    },
    {
      id: "deltoid",
      name: "Deltoid",
      path: "M 120,100 C 130,90 140,85 150,90 L 150,120 C 140,125 130,125 120,120 Z",
      number: 2,
      labelPosition: getLabelPositionFromPath("M 120,100 C 130,90 140,85 150,90 L 150,120 C 140,125 130,125 120,120 Z"),
    },
    {
      id: "biceps",
      name: "Biceps Brachii",
      path: "M 120,130 C 130,125 140,125 150,130 L 150,180 C 140,185 130,185 120,180 Z",
      number: 3,
      labelPosition: getLabelPositionFromPath("M 120,130 C 130,125 140,125 150,130 L 150,180 C 140,185 130,185 120,180 Z"),
    },
    {
      id: "rectus-abdominis",
      name: "Rectus Abdominis",
      path: "M 160,180 C 170,175 190,175 200,180 L 200,250 C 190,255 170,255 160,250 Z",
      number: 4,
      labelPosition: getLabelPositionFromPath("M 160,180 C 170,175 190,175 200,180 L 200,250 C 190,255 170,255 160,250 Z"),
    },
    {
      id: "quadriceps",
      name: "Quadriceps",
      path: "M 160,260 C 170,255 190,255 200,260 L 200,350 C 190,355 170,355 160,350 Z",
      number: 5,
      labelPosition: getLabelPositionFromPath("M 160,260 C 170,255 190,255 200,260 L 200,350 C 190,355 170,355 160,350 Z"),
    },
    {
      id: "tibialis-anterior",
      name: "Tibialis Anterior",
      path: "M 170,360 C 175,355 185,355 190,360 L 190,410 C 185,415 175,415 170,410 Z",
      number: 6,
      labelPosition: getLabelPositionFromPath("M 170,360 C 175,355 185,355 190,360 L 190,410 C 185,415 175,415 170,410 Z"),
    },
    {
      id: "obliques",
      name: "Obliques",
      path: "M 140,180 C 150,175 160,175 170,180 L 170,230 C 160,235 150,235 140,230 Z",
      number: 7,
      labelPosition: getLabelPositionFromPath("M 140,180 C 150,175 160,175 170,180 L 170,230 C 160,235 150,235 140,230 Z"),
    },
    {
      id: "forearm-flexors",
      name: "Forearm Flexors",
      path: "M 110,190 C 120,185 130,185 140,190 L 140,230 C 130,235 120,235 110,230 Z",
      number: 8,
      labelPosition: getLabelPositionFromPath("M 110,190 C 120,185 130,185 140,190 L 140,230 C 130,235 120,235 110,230 Z"),
    },
    {
      id: "adductors",
      name: "Adductors",
      path: "M 140,260 C 150,255 160,255 170,260 L 170,350 C 160,355 150,355 140,350 Z",
      number: 9,
      labelPosition: getLabelPositionFromPath("M 140,260 C 150,255 160,255 170,260 L 170,350 C 160,355 150,355 140,350 Z"),
    },
    {
      id: "sartorius",
      name: "Sartorius",
      path: "M 130,240 C 140,235 150,235 160,240 L 160,280 C 150,285 140,285 130,280 Z",
      number: 10,
      labelPosition: getLabelPositionFromPath("M 130,240 C 140,235 150,235 160,240 L 160,280 C 150,285 140,285 130,280 Z"),
    },
  ],
  back: [
    {
      id: "trapezius",
      name: "Trapezius",
      path: "M 150,80 C 170,75 190,75 210,80 L 210,130 C 190,135 170,135 150,130 Z",
      number: 1,
      labelPosition: getLabelPositionFromPath("M 150,80 C 170,75 190,75 210,80 L 210,130 C 190,135 170,135 150,130 Z"),
    },
    {
      id: "latissimus-dorsi",
      name: "Latissimus Dorsi",
      path: "M 140,140 C 160,135 200,135 220,140 L 220,200 C 200,205 160,205 140,200 Z",
      number: 2,
      labelPosition: getLabelPositionFromPath("M 140,140 C 160,135 200,135 220,140 L 220,200 C 200,205 160,205 140,200 Z"),
    },
    {
      id: "triceps",
      name: "Triceps",
      path: "M 120,130 C 130,125 140,125 150,130 L 150,180 C 140,185 130,185 120,180 Z",
      number: 3,
      labelPosition: getLabelPositionFromPath("M 120,130 C 130,125 140,125 150,130 L 150,180 C 140,185 130,185 120,180 Z"),
    },
    {
      id: "gluteus-maximus",
      name: "Gluteus Maximus",
      path: "M 160,210 C 180,205 200,205 220,210 L 220,260 C 200,265 180,265 160,260 Z",
      number: 4,
      labelPosition: getLabelPositionFromPath("M 160,210 C 180,205 200,205 220,210 L 220,260 C 200,265 180,265 160,260 Z"),
    },
    {
      id: "hamstrings",
      name: "Hamstrings",
      path: "M 160,270 C 180,265 200,265 220,270 L 220,350 C 200,355 180,355 160,350 Z",
      number: 5,
      labelPosition: getLabelPositionFromPath("M 160,270 C 180,265 200,265 220,270 L 220,350 C 200,355 180,355 160,350 Z"),
    },
    {
      id: "gastrocnemius",
      name: "Gastrocnemius",
      path: "M 160,360 C 180,355 200,355 220,360 L 220,410 C 200,415 180,415 160,410 Z",
      number: 6,
      labelPosition: getLabelPositionFromPath("M 160,360 C 180,355 200,355 220,360 L 220,410 C 200,415 180,415 160,410 Z"),
    },
    {
      id: "rhomboids",
      name: "Rhomboids",
      path: "M 170,110 C 180,105 190,105 200,110 L 200,140 C 190,145 180,145 170,140 Z",
      number: 7,
      labelPosition: getLabelPositionFromPath("M 170,110 C 180,105 190,105 200,110 L 200,140 C 190,145 180,145 170,140 Z"),
    },
    {
      id: "posterior-deltoid",
      name: "Posterior Deltoid",
      path: "M 120,100 C 130,95 140,95 150,100 L 150,130 C 140,135 130,135 120,130 Z",
      number: 8,
      labelPosition: getLabelPositionFromPath("M 120,100 C 130,95 140,95 150,100 L 150,130 C 140,135 130,135 120,130 Z"),
    },
    {
      id: "infraspinatus",
      name: "Infraspinatus",
      path: "M 140,110 C 150,105 160,105 170,110 L 170,140 C 160,145 150,145 140,140 Z",
      number: 9,
      labelPosition: getLabelPositionFromPath("M 140,110 C 150,105 160,105 170,110 L 170,140 C 160,145 150,145 140,140 Z"),
    },
    {
      id: "erector-spinae",
      name: "Erector Spinae",
      path: "M 175,140 C 180,135 185,135 190,140 L 190,210 C 185,215 180,215 175,210 Z",
      number: 10,
      labelPosition: getLabelPositionFromPath("M 175,140 C 180,135 185,135 190,140 L 190,210 C 185,215 180,215 175,210 Z"),
    },
  ],
  side: [
    {
      id: "deltoid",
      name: "Deltoid",
      path: "M 120,100 C 130,95 140,95 150,100 L 150,130 C 140,135 130,135 120,130 Z",
      number: 1,
      labelPosition: getLabelPositionFromPath("M 120,100 C 130,95 140,95 150,100 L 150,130 C 140,135 130,135 120,130 Z"),
    },
    {
      id: "triceps",
      name: "Triceps",
      path: "M 100,130 C 110,125 120,125 130,130 L 130,180 C 120,185 110,185 100,180 Z",
      number: 2,
      labelPosition: getLabelPositionFromPath("M 100,130 C 110,125 120,125 130,130 L 130,180 C 120,185 110,185 100,180 Z"),
    },
    {
      id: "obliques",
      name: "Obliques",
      path: "M 150,180 C 160,175 170,175 180,180 L 180,230 C 170,235 160,235 150,230 Z",
      number: 3,
      labelPosition: getLabelPositionFromPath("M 150,180 C 160,175 170,175 180,180 L 180,230 C 170,235 160,235 150,230 Z"),
    },
    {
      id: "gluteus-medius",
      name: "Gluteus Medius",
      path: "M 170,210 C 180,205 190,205 200,210 L 200,240 C 190,245 180,245 170,240 Z",
      number: 4,
      labelPosition: getLabelPositionFromPath("M 170,210 C 180,205 190,205 200,210 L 200,240 C 190,245 180,245 170,240 Z"),
    },
    {
      id: "gluteus-maximus",
      name: "Gluteus Maximus",
      path: "M 160,240 C 170,235 190,235 200,240 L 200,280 C 190,285 170,285 160,280 Z",
      number: 5,
      labelPosition: getLabelPositionFromPath("M 160,240 C 170,235 190,235 200,240 L 200,280 C 190,285 170,285 160,280 Z"),
    },
    {
      id: "hamstrings",
      name: "Hamstrings",
      path: "M 140,280 C 150,275 170,275 180,280 L 180,350 C 170,355 150,355 140,350 Z",
      number: 6,
      labelPosition: getLabelPositionFromPath("M 140,280 C 150,275 170,275 180,280 L 180,350 C 170,355 150,355 140,350 Z"),
    },
    {
      id: "gastrocnemius",
      name: "Gastrocnemius",
      path: "M 130,360 C 140,355 160,355 170,360 L 170,410 C 160,415 140,415 130,410 Z",
      number: 7,
      labelPosition: getLabelPositionFromPath("M 130,360 C 140,355 160,355 170,360 L 170,410 C 160,415 140,415 130,410 Z"),
    },
    {
      id: "soleus",
      name: "Soleus",
      path: "M 130,410 C 140,405 160,405 170,410 L 170,430 C 160,435 140,435 130,430 Z",
      number: 8,
      labelPosition: getLabelPositionFromPath("M 130,410 C 140,405 160,405 170,410 L 170,430 C 160,435 140,435 130,430 Z"),
    },
    {
      id: "biceps",
      name: "Biceps Brachii",
      path: "M 150,130 C 160,125 170,125 180,130 L 180,180 C 170,185 160,185 150,180 Z",
      number: 9,
      labelPosition: getLabelPositionFromPath("M 150,130 C 160,125 170,125 180,130 L 180,180 C 170,185 160,185 150,180 Z"),
    },
    {
      id: "quadriceps",
      name: "Quadriceps",
      path: "M 180,280 C 190,275 210,275 220,280 L 220,350 C 210,355 190,355 180,350 Z",
      number: 10,
      labelPosition: getLabelPositionFromPath("M 180,280 C 190,275 210,275 220,280 L 220,350 C 210,355 190,355 180,350 Z"),
    },
  ],
};
