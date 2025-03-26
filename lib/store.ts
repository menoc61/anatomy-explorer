import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Subscription, MuscleData } from "@/types"
import { muscleData } from "@/lib/muscle-data"

// User Store
interface UserState {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateSubscription: (subscription: Subscription) => void
  updateUser: (updatedUser: User) => void
  checkSession: () => Promise<boolean>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAdmin: false,

      // Add this new function
      checkSession: async () => {
        set({ isLoading: true })

        try {
          // In a real app, this would be an API call to verify the session
          // For now, we'll just check if we have a user in localStorage
          const storedUser = localStorage.getItem("user-storage")
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser)
              if (userData.state && userData.state.user) {
                const user = userData.state.user
                set({
                  user,
                  isAdmin: user.role === "admin",
                })
                return true
              }
            } catch (e) {
              console.error("Error parsing stored user:", e)
            }
          }

          // Check for auth cookie as fallback
          const cookies = document.cookie.split(";")
          const authCookie = cookies.find((c) => c.trim().startsWith("auth="))

          if (authCookie) {
            // We have an auth cookie but no user in store
            // This is a simplified version - in a real app you'd validate the cookie with the server
            return true
          }

          return false
        } catch (error) {
          console.error("Session check error:", error)
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
          // Special case for admin login
          if (email === "admin@admin.com" && password === "admin") {
            const adminUser: User = {
              id: "admin-user",
              name: "Admin User",
              email: "admin@admin.com",
              role: "admin",
              subscription: {
                id: "admin-subscription",
                status: "active",
                plan: "professional",
                startDate: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                autoRenew: true,
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }

            // Set a cookie for server-side auth check
            document.cookie = `auth=${btoa(JSON.stringify({ id: adminUser.id, email: adminUser.email }))};path=/;max-age=86400`
            set({ user: adminUser, isAdmin: true })
            return true
          }

          // Regular login logic
          if (email && password.length >= 6) {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Create a mock user with subscription data
            // For demo purposes, if email contains "admin", make them an admin
            const isAdminUser = email.toLowerCase().includes("admin")

            const newUser: User = {
              id: `user-${Date.now()}`,
              name: email.split("@")[0],
              email,
              role: isAdminUser ? "admin" : "user",
              subscription: {
                id: `sub-${Date.now()}`,
                status: "trial",
                plan: "basic",
                startDate: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
                autoRenew: false,
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }

            // Set a cookie for server-side auth check
            document.cookie = `auth=${btoa(JSON.stringify({ id: newUser.id, email: newUser.email }))};path=/;max-age=86400`
            set({ user: newUser, isAdmin: isAdminUser })

            return true
          }
          return false
        } catch (error) {
          console.error("Login error:", error)
          return false
        } finally {
          set({ isLoading: false })
        }
      },
      logout: () => {
        // Clear the auth cookie
        document.cookie = "auth=;path=/;max-age=0"
        set({ user: null, isAdmin: false })
      },
      updateSubscription: (subscription: Subscription) => {
        const { user } = get()
        if (!user) return

        const updatedUser = {
          ...user,
          subscription,
        }

        set({ user: updatedUser })
      },
      updateUser: (updatedUser: User) => {
        set({ user: updatedUser, isAdmin: updatedUser.role === "admin" })
      },
    }),
    {
      name: "user-storage",
    },
  ),
)

// UI Store
interface UIState {
  theme: "light" | "dark" | "system"
  language: "en" | "fr" | "ru"
  setTheme: (theme: "light" | "dark" | "system") => void
  setLanguage: (language: "en" | "fr" | "ru") => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "system",
      language: "en",
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "ui-storage",
    },
  ),
)

// Video Store
interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
}

interface VideoRating {
  videoId: string
  muscleId: string
  averageRating: number
  totalRatings: number
  userRating: number | null
}

interface VideoState {
  comments: Record<string, Comment[]>
  ratings: VideoRating[]
  addComment: (videoId: string, content: string) => void
  likeComment: (videoId: string, commentId: string) => void
  rateVideo: (videoId: string, muscleId: string, rating: number) => void
  getCommentsForVideo: (videoId: string) => Comment[]
  getRatingForVideo: (videoId: string, muscleId: string) => VideoRating | undefined
}

export const useVideoStore = create<VideoState>()(
  persist(
    (set, get) => ({
      comments: {
        "biceps-anatomy": [
          {
            id: "comment-1",
            userId: "user-1",
            userName: "John Doe",
            userAvatar: "https://avatar.vercel.sh/johndoe@example.com",
            content: "This video was really helpful for understanding bicep anatomy!",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 5,
            isLiked: false,
          },
          {
            id: "comment-2",
            userId: "user-2",
            userName: "Jane Smith",
            userAvatar: "https://avatar.vercel.sh/janesmith@example.com",
            content: "Could you explain more about the bicep tendon attachment?",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 2,
            isLiked: false,
          },
        ],
        "biceps-function": [
          {
            id: "comment-3",
            userId: "user-3",
            userName: "Mike Johnson",
            userAvatar: "https://avatar.vercel.sh/mikejohnson@example.com",
            content: "Great explanation of supination! I never understood that before.",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 8,
            isLiked: false,
          },
        ],
        "quadriceps-anatomy": [
          {
            id: "comment-4",
            userId: "user-4",
            userName: "Sarah Williams",
            userAvatar: "https://avatar.vercel.sh/sarahwilliams@example.com",
            content: "The explanation of the four different muscles was very clear!",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 3,
            isLiked: false,
          },
        ],
      },
      ratings: [
        {
          videoId: "biceps-anatomy",
          muscleId: "biceps",
          averageRating: 4.5,
          totalRatings: 12,
          userRating: null,
        },
        {
          videoId: "biceps-function",
          muscleId: "biceps",
          averageRating: 4.2,
          totalRatings: 8,
          userRating: null,
        },
        {
          videoId: "quadriceps-anatomy",
          muscleId: "quadriceps",
          averageRating: 4.7,
          totalRatings: 15,
          userRating: null,
        },
      ],
      addComment: (videoId, content) => {
        const { user } = useUserStore.getState()
        if (!user) return

        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userAvatar: `https://avatar.vercel.sh/${user.email}`,
          content,
          createdAt: new Date().toISOString(),
          likes: 0,
          isLiked: false,
        }

        const currentComments = get().comments[videoId] || []

        set({
          comments: {
            ...get().comments,
            [videoId]: [newComment, ...currentComments],
          },
        })
      },
      likeComment: (videoId, commentId) => {
        const videoComments = [...(get().comments[videoId] || [])]
        const commentIndex = videoComments.findIndex((c) => c.id === commentId)

        if (commentIndex !== -1) {
          const comment = videoComments[commentIndex]
          const isLiked = !comment.isLiked

          videoComments[commentIndex] = {
            ...comment,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1,
            isLiked,
          }

          set({
            comments: {
              ...get().comments,
              [videoId]: videoComments,
            },
          })
        }
      },
      rateVideo: (videoId, muscleId, rating) => {
        const ratings = [...get().ratings]
        const ratingIndex = ratings.findIndex((r) => r.videoId === videoId && r.muscleId === muscleId)

        if (ratingIndex !== -1) {
          // Update existing rating
          const currentRating = ratings[ratingIndex]
          const oldUserRating = currentRating.userRating

          // Calculate new average
          let newAverage = currentRating.averageRating
          let newTotal = currentRating.totalRatings

          if (oldUserRating === null) {
            // First time rating
            newAverage = (newAverage * newTotal + rating) / (newTotal + 1)
            newTotal += 1
          } else {
            // Changing existing rating
            newAverage = (newAverage * newTotal - oldUserRating + rating) / newTotal
          }

          ratings[ratingIndex] = {
            ...currentRating,
            averageRating: newAverage,
            totalRatings: newTotal,
            userRating: rating,
          }
        } else {
          // Create new rating
          ratings.push({
            videoId,
            muscleId,
            averageRating: rating,
            totalRatings: 1,
            userRating: rating,
          })
        }

        set({ ratings })
      },
      getCommentsForVideo: (videoId) => {
        return get().comments[videoId] || []
      },
      getRatingForVideo: (videoId, muscleId) => {
        return get().ratings.find((r) => r.videoId === videoId && r.muscleId === muscleId)
      },
    }),
    {
      name: "video-storage",
    },
  ),
)

// Muscle Store
interface MuscleState {
  muscles: Record<string, MuscleData>
  selectedMuscle: string | null
  setSelectedMuscle: (muscleId: string | null) => void
  updateMuscle: (muscleId: string, data: Partial<MuscleData>) => void
}

export const useMuscleStore = create<MuscleState>()(
  persist(
    (set, get) => ({
      muscles: muscleData,
      selectedMuscle: null,
      setSelectedMuscle: (muscleId) => set({ selectedMuscle: muscleId }),
      updateMuscle: (muscleId, data) => {
        const muscles = { ...get().muscles }
        if (muscles[muscleId]) {
          muscles[muscleId] = { ...muscles[muscleId], ...data }
          set({ muscles })
        }
      },
    }),
    {
      name: "muscle-storage",
    },
  ),
)

// Define types for API configuration
export interface ApiConfig {
  apiKey?: string
  endpoint?: string
  enabled: boolean
  additionalConfig?: Record<string, any>
}

// Define types for environment store
interface EnvironmentState {
  apiConfigs: Record<string, ApiConfig>
  getApiConfig: (apiName: string) => ApiConfig
  isApiConfigured: (apiName: string) => boolean
  updateApiConfig: (apiName: string, config: Partial<ApiConfig>) => void
  resetApiConfig: (apiName: string) => void
  resetAllApiConfigs: () => void
  exportConfigs: () => string
  importConfigs: (configsJson: string) => boolean
}

// Default API configurations
const defaultApiConfigs: Record<string, ApiConfig> = {
  sketchfab: {
    apiKey: "",
    enabled: false,
    additionalConfig: {
      modelId: "31b40fd809b14665b93773936d67c52c", // Default model ID
    },
  },
  openai: {
    apiKey: "",
    endpoint: "https://api.openai.com/v1",
    enabled: false,
    additionalConfig: {
      model: "gpt-4",
    },
  },
  stripe: {
    apiKey: "",
    enabled: false,
    additionalConfig: {
      publicKey: "",
      webhookSecret: "",
    },
  },
  sendgrid: {
    apiKey: "",
    enabled: false,
    additionalConfig: {
      fromEmail: "noreply@example.com",
    },
  },
  vercelBlob: {
    apiKey: "",
    enabled: false,
  },
  supabase: {
    apiKey: "",
    endpoint: "",
    enabled: false,
    additionalConfig: {
      publicKey: "",
    },
  },
  googleAnalytics: {
    enabled: false,
    additionalConfig: {
      measurementId: "",
    },
  },
}

// Create the environment store
export const useEnvironmentStore = create<EnvironmentState>()(
  persist(
    (set, get) => ({
      apiConfigs: { ...defaultApiConfigs },

      // Get API configuration for a specific API
      getApiConfig: (apiName: string) => {
        const { apiConfigs } = get()
        return apiConfigs[apiName] || { enabled: false }
      },

      // Check if an API is configured and enabled
      isApiConfigured: (apiName: string) => {
        const { apiConfigs } = get()
        const config = apiConfigs[apiName]
        if (!config || !config.enabled) return false

        // For APIs that require an API key
        if (apiName !== "googleAnalytics" && !config.apiKey) return false

        // For APIs that require an endpoint
        if (["openai", "supabase"].includes(apiName) && !config.endpoint) return false

        // For Google Analytics, check for measurement ID
        if (apiName === "googleAnalytics" && !config.additionalConfig?.measurementId) return false

        return true
      },

      // Update API configuration
      updateApiConfig: (apiName: string, config: Partial<ApiConfig>) => {
        set((state) => ({
          apiConfigs: {
            ...state.apiConfigs,
            [apiName]: {
              ...state.apiConfigs[apiName],
              ...config,
            },
          },
        }))
      },

      // Reset API configuration to default
      resetApiConfig: (apiName: string) => {
        set((state) => ({
          apiConfigs: {
            ...state.apiConfigs,
            [apiName]: { ...defaultApiConfigs[apiName] },
          },
        }))
      },

      // Reset all API configurations to default
      resetAllApiConfigs: () => {
        set({ apiConfigs: { ...defaultApiConfigs } })
      },

      // Export configurations as JSON
      exportConfigs: () => {
        const { apiConfigs } = get()
        return JSON.stringify(apiConfigs, null, 2)
      },

      // Import configurations from JSON
      importConfigs: (configsJson: string) => {
        try {
          const configs = JSON.parse(configsJson)
          set({ apiConfigs: configs })
          return true
        } catch (error) {
          console.error("Failed to import configurations:", error)
          return false
        }
      },
    }),
    {
      name: "environment-store",
      partialize: (state) => ({ apiConfigs: state.apiConfigs }),
    },
  ),
)

