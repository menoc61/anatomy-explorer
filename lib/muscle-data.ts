export interface MuscleCondition {
  name: string
  description: string
}

export interface MuscleData {
  name: string
  shortDescription: string
  description: string
  image: string
  origin: string
  insertion: string
  functions: string[]
  movements: string[]
  conditions: MuscleCondition[]
}

export const muscleData: Record<string, MuscleData> = {
  biceps: {
    name: "Biceps Brachii",
    shortDescription: "A two-headed muscle located on the upper arm between the shoulder and the elbow.",
    description:
      "The biceps brachii is a large, thick muscle on the ventral portion of the upper arm. It has two heads (origins), the short head and the long head, which converge to form a single muscle belly that attaches to the radius bone in the forearm.",
    image: "/placeholder.svg?height=300&width=500",
    origin: "Short head: Coracoid process of the scapula. Long head: Supraglenoid tubercle of the scapula.",
    insertion: "Radial tuberosity and the bicipital aponeurosis into the forearm fascia.",
    functions: ["Flexion of the elbow joint", "Supination of the forearm", "Weak flexion of the shoulder joint"],
    movements: ["Lifting objects", "Pulling movements", "Turning doorknobs", "Opening bottles"],
    conditions: [
      {
        name: "Biceps Tendinitis",
        description: "Inflammation of the biceps tendon, often caused by repetitive overhead movements.",
      },
      {
        name: "Biceps Tear/Rupture",
        description:
          "Partial or complete tear of the biceps tendon, often resulting in a visible bulge in the upper arm.",
      },
    ],
  },
  triceps: {
    name: "Triceps Brachii",
    shortDescription: "A three-headed muscle located on the posterior of the upper arm.",
    description:
      "The triceps brachii is a large muscle on the posterior of the upper arm. It has three heads: the long head, lateral head, and medial head. The primary function of the triceps is the extension of the elbow joint.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Long head: Infraglenoid tubercle of the scapula. Lateral head: Posterior surface of the humerus. Medial head: Posterior surface of the humerus.",
    insertion: "Olecranon process of the ulna.",
    functions: [
      "Extension of the elbow joint",
      "The long head assists in extension and adduction of the shoulder joint",
    ],
    movements: [
      "Pushing movements",
      "Stabilizing the elbow during fine motor activities",
      "Supporting body weight in activities like push-ups",
    ],
    conditions: [
      {
        name: "Triceps Tendinitis",
        description: "Inflammation of the triceps tendon, often caused by repetitive extension movements of the elbow.",
      },
      {
        name: "Triceps Tear",
        description: "Partial or complete tear of the triceps tendon, often at the insertion point on the olecranon.",
      },
    ],
  },
  deltoids: {
    name: "Deltoid Muscle",
    shortDescription: "A triangular muscle that caps the shoulder and gives it its rounded shape.",
    description:
      "The deltoid is a large, triangular muscle that covers the shoulder joint and gives the shoulder its rounded contour. It consists of three parts: the anterior (front), middle, and posterior (rear) deltoid.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Anterior: Lateral third of the clavicle. Middle: Acromion process of the scapula. Posterior: Spine of the scapula.",
    insertion: "Deltoid tuberosity of the humerus.",
    functions: [
      "Anterior: Flexion and medial rotation of the arm",
      "Middle: Abduction of the arm",
      "Posterior: Extension and lateral rotation of the arm",
    ],
    movements: [
      "Raising the arm to the side",
      "Raising the arm to the front",
      "Bringing the arm backward",
      "Stabilizing the shoulder joint",
    ],
    conditions: [
      {
        name: "Deltoid Strain",
        description: "Overstretching or tearing of the deltoid muscle fibers, often from sudden movements or overuse.",
      },
      {
        name: "Shoulder Impingement Syndrome",
        description:
          "Compression of the rotator cuff tendons and bursa under the acromion, often affecting deltoid function.",
      },
    ],
  },
  pectoralis: {
    name: "Pectoralis Major",
    shortDescription: "A large, fan-shaped muscle that covers the upper chest.",
    description:
      "The pectoralis major is a thick, fan-shaped muscle that makes up the bulk of the chest muscles. It has two heads: the clavicular (upper) head and the sternal (lower) head.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Clavicular head: Anterior surface of the medial half of the clavicle. Sternal head: Anterior surface of the sternum and upper six costal cartilages.",
    insertion: "Lateral lip of the bicipital groove of the humerus.",
    functions: [
      "Adduction of the arm",
      "Medial rotation of the arm",
      "Flexion of the arm (clavicular head)",
      "Extension of the arm from a flexed position (sternal head)",
    ],
    movements: ["Pushing movements", "Hugging movements", "Climbing", "Swimming (particularly the breaststroke)"],
    conditions: [
      {
        name: "Pectoralis Major Tear",
        description:
          "Partial or complete tear of the pectoralis major muscle or tendon, often during weightlifting or contact sports.",
      },
      {
        name: "Pectoral Strain",
        description: "Overstretching or minor tearing of the pectoral muscle fibers, causing pain and weakness.",
      },
    ],
  },
  quadriceps: {
    name: "Quadriceps Femoris",
    shortDescription: "A group of four muscles located at the front of the thigh.",
    description:
      "The quadriceps femoris is a large muscle group that includes four muscles on the front of the thigh: rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius. Together, they form the main extensor muscle of the knee.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Rectus femoris: Anterior inferior iliac spine and superior margin of acetabulum. Vastus lateralis: Greater trochanter and lateral lip of linea aspera. Vastus medialis: Medial lip of linea aspera. Vastus intermedius: Anterior and lateral surfaces of femur shaft.",
    insertion:
      "Via the quadriceps tendon into the patella, and then via the patellar ligament into the tibial tuberosity.",
    functions: ["Extension of the knee joint", "Rectus femoris also assists in hip flexion"],
    movements: ["Walking", "Running", "Jumping", "Climbing stairs", "Standing up from a seated position"],
    conditions: [
      {
        name: "Quadriceps Strain",
        description:
          "Overstretching or tearing of the quadriceps muscle fibers, common in sports involving sprinting and jumping.",
      },
      {
        name: "Quadriceps Tendinitis",
        description: "Inflammation of the quadriceps tendon, often from overuse or repetitive stress.",
      },
      {
        name: "Patellofemoral Pain Syndrome",
        description: "Pain around the patella, often related to imbalances or weakness in the quadriceps muscles.",
      },
    ],
  },
  hamstrings: {
    name: "Hamstrings",
    shortDescription: "A group of three muscles located at the back of the thigh.",
    description:
      "The hamstrings are a group of three muscles that run along the back of the thigh: the semitendinosus, semimembranosus, and biceps femoris. They are powerful knee flexors and hip extensors.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "All three muscles originate from the ischial tuberosity of the pelvis. The short head of the biceps femoris originates from the linea aspera of the femur.",
    insertion:
      "Semitendinosus and semimembranosus: Medial surface of the tibia. Biceps femoris: Head of the fibula and lateral condyle of the tibia.",
    functions: [
      "Flexion of the knee joint",
      "Extension of the hip joint",
      "Medial and lateral rotation of the knee when flexed",
    ],
    movements: ["Walking", "Running", "Jumping", "Bending forward at the hips"],
    conditions: [
      {
        name: "Hamstring Strain",
        description:
          "Overstretching or tearing of the hamstring muscle fibers, common in sports involving sprinting and sudden changes in direction.",
      },
      {
        name: "Hamstring Tendinopathy",
        description: "Degeneration of the hamstring tendons, often from chronic overuse.",
      },
    ],
  },
  gastrocnemius: {
    name: "Gastrocnemius",
    shortDescription: "A two-headed muscle that forms the bulk of the calf.",
    description:
      "The gastrocnemius is a two-headed muscle that forms the bulk of the calf. It has a medial and a lateral head, both originating from the femur and inserting into the calcaneus (heel bone) via the Achilles tendon.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Medial head: Posterior surface of the medial condyle of the femur. Lateral head: Posterior surface of the lateral condyle of the femur.",
    insertion: "Via the Achilles tendon into the posterior surface of the calcaneus.",
    functions: ["Plantar flexion of the foot (pointing the toes downward)", "Flexion of the knee joint"],
    movements: ["Walking", "Running", "Jumping", "Standing on tiptoes", "Pushing off the ground during locomotion"],
    conditions: [
      {
        name: "Calf Strain",
        description:
          "Overstretching or tearing of the gastrocnemius muscle fibers, often during sudden acceleration or change in direction.",
      },
      {
        name: "Achilles Tendinitis",
        description: "Inflammation of the Achilles tendon, which connects the gastrocnemius to the calcaneus.",
      },
      {
        name: "Tennis Leg",
        description: "Partial tear at the medial head of the gastrocnemius, causing sudden pain in the calf.",
      },
    ],
  },
  trapezius: {
    name: "Trapezius",
    shortDescription: "A large, triangular muscle that extends from the skull to the lower thoracic vertebrae.",
    description:
      "The trapezius is a large, triangular muscle that extends from the base of the skull to the lower thoracic vertebrae and laterally to the spine of the scapula. It can be divided into three functional parts: upper, middle, and lower fibers.",
    image: "/placeholder.svg?height=300&width=500",
    origin: "External occipital protuberance, ligamentum nuchae, spinous processes of C7-T12 vertebrae.",
    insertion: "Lateral third of the clavicle, acromion process, and spine of the scapula.",
    functions: [
      "Upper fibers: Elevation of the scapula (shrugging)",
      "Middle fibers: Retraction of the scapula (squeezing shoulder blades together)",
      "Lower fibers: Depression of the scapula",
      "All fibers: Rotation of the scapula during arm abduction",
    ],
    movements: [
      "Shrugging the shoulders",
      "Maintaining posture",
      "Supporting the arm during arm movements",
      "Tilting and turning the head",
    ],
    conditions: [
      {
        name: "Trapezius Strain",
        description:
          "Overstretching or tearing of the trapezius muscle fibers, often from poor posture or repetitive movements.",
      },
      {
        name: "Trapezius Myalgia",
        description:
          "Chronic pain in the trapezius muscle, common in people who work at computers or perform repetitive upper body movements.",
      },
    ],
  },
  latissimus: {
    name: "Latissimus Dorsi",
    shortDescription: "A large, flat muscle on the back that gives the torso a V-shape.",
    description:
      "The latissimus dorsi is a large, flat, triangular muscle that covers the lower posterior thorax. It's one of the widest muscles in the human body and is responsible for the V-shape of a well-developed back. It acts on the humerus and is a powerful adductor and extensor of the arm.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Spinous processes of T7-T12, thoracolumbar fascia, iliac crest, lower 3-4 ribs, and inferior angle of the scapula.",
    insertion: "Intertubercular groove of the humerus.",
    functions: [
      "Adduction of the arm",
      "Extension of the arm",
      "Medial rotation of the arm",
      "Depression of the shoulder girdle",
    ],
    movements: [
      "Pulling movements",
      "Swimming (particularly the freestyle and butterfly strokes)",
      "Climbing",
      "Rowing",
    ],
    conditions: [
      {
        name: "Latissimus Dorsi Strain",
        description:
          "Overstretching or tearing of the latissimus dorsi muscle fibers, often from activities involving overhead reaching or pulling.",
      },
      {
        name: "Latissimus Dorsi Tendinopathy",
        description: "Degeneration of the latissimus dorsi tendon, often from repetitive overhead activities.",
      },
    ],
  },
  abdominals: {
    name: "Abdominal Muscles",
    shortDescription: "A group of muscles that form the anterior and lateral walls of the abdominal cavity.",
    description:
      "The abdominal muscles consist of several muscle groups: the rectus abdominis (the 'six-pack'), the external obliques, the internal obliques, and the transversus abdominis. Together, they form the abdominal wall and provide support and movement for the trunk.",
    image: "/placeholder.svg?height=300&width=500",
    origin:
      "Rectus abdominis: Pubic crest and symphysis. External obliques: External surfaces of ribs 5-12. Internal obliques: Thoracolumbar fascia, iliac crest, inguinal ligament. Transversus abdominis: Thoracolumbar fascia, iliac crest, inguinal ligament, costal cartilages of ribs 7-12.",
    insertion:
      "Rectus abdominis: Xiphoid process and costal cartilages of ribs 5-7. External obliques: Linea alba, pubic tubercle, anterior iliac crest. Internal obliques: Linea alba, pubic crest, lower ribs. Transversus abdominis: Linea alba, pubic crest.",
    functions: [
      "Flexion of the trunk",
      "Lateral flexion of the trunk (obliques)",
      "Rotation of the trunk (obliques)",
      "Compression of the abdominal contents",
      "Stabilization of the core during movement",
    ],
    movements: [
      "Bending forward",
      "Bending sideways",
      "Twisting the torso",
      "Forced expiration",
      "Maintaining posture",
    ],
    conditions: [
      {
        name: "Diastasis Recti",
        description:
          "Separation of the rectus abdominis muscles, common during pregnancy or from improper exercise technique.",
      },
      {
        name: "Abdominal Strain",
        description:
          "Overstretching or tearing of the abdominal muscle fibers, often from sudden twisting or excessive exercise.",
      },
      {
        name: "Hernia",
        description: "Protrusion of internal organs through a weakness in the abdominal wall.",
      },
    ],
  },
}

