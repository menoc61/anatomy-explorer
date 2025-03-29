/**
 * Utility functions for working with external APIs
 * This centralizes API calls and provides fallbacks when APIs are not configured
 */

import { useEnvironmentStore } from "@/lib/store"

// Sketchfab API
export const getSketchfabModel = async (modelId?: string) => {
  const { getApiConfig, isApiConfigured } = useEnvironmentStore.getState()
  const config = getApiConfig("sketchfab")

  // Use provided modelId or fall back to configured one
  const effectiveModelId = modelId || config.additionalConfig?.modelId || "31b40fd809b14665b93773936d67c52c"

  // If API is not configured, return the model ID directly
  if (!isApiConfigured("sketchfab")) {
    return { modelId: effectiveModelId }
  }

  try {
    // In a real implementation, this would fetch model details from Sketchfab API
    // For now, we'll just return the model ID
    return { modelId: effectiveModelId }
  } catch (error) {
    console.error("Error fetching Sketchfab model:", error)
    return { modelId: effectiveModelId }
  }
}

// OpenAI API
export const generateAIResponse = async (prompt: string, fallback: string) => {
  const { getApiConfig, isApiConfigured } = useEnvironmentStore.getState()

  if (!isApiConfigured("openai")) {
    console.warn("OpenAI API not configured. Using fallback response.")
    return fallback
  }

  const config = getApiConfig("openai")

  try {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll just return a mock response
    return `AI response to: ${prompt}\n\nThis is a simulated response since the OpenAI API is not actually being called.`
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    return fallback
  }
}

// Stripe API
export const createCheckoutSession = async (priceId: string, customerId: string) => {
  const { getApiConfig, isApiConfigured } = useEnvironmentStore.getState()

  if (!isApiConfigured("stripe")) {
    console.warn("Stripe API not configured. Using fallback checkout URL.")
    return { url: "/subscription?demo=true" }
  }

  const config = getApiConfig("stripe")

  try {
    // In a real implementation, this would call the Stripe API
    // For now, we'll just return a mock checkout URL
    return { url: `/subscription?session=demo_${priceId}_${Date.now()}` }
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error)
    return { url: "/subscription?demo=true&error=true" }
  }
}

// SendGrid API
export const sendEmail = async (templateId: string, to: string, dynamicData: Record<string, any>): Promise<boolean> => {
  const { getApiConfig, isApiConfigured } = useEnvironmentStore.getState()

  if (!isApiConfigured("sendgrid")) {
    console.warn("SendGrid API not configured. Email would have been sent to:", to)
    return true
  }

  const config = getApiConfig("sendgrid")

  try {
    // In a real implementation, this would call the SendGrid API
    // For now, we'll just log the email details
    console.log(`Email would be sent to ${to} using template ${templateId} with data:`, dynamicData)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Vercel Blob API
export const uploadToBlob = async (file: File): Promise<string> => {
  const { getApiConfig, isApiConfigured } = useEnvironmentStore.getState()

  if (!isApiConfigured("vercelBlob")) {
    console.warn("Vercel Blob API not configured. Using fallback URL.")
    return URL.createObjectURL(file)
  }

  const config = getApiConfig("vercelBlob")

  try {
    // In a real implementation, this would upload to Vercel Blob
    // For now, we'll just return a mock URL
    return `/mock-blob-url/${file.name}`
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    return URL.createObjectURL(file)
  }
}

// Supabase API
export const queryDatabase = async <T>(
  query: string, 
  params: any[] = [], 
  fallback: T
)
: Promise<T> =>
{
  const { getApiConfig, isApiConfigured } = useEnvironmentStore.getState()

  if (!isApiConfigured("supabase")) {
    console.warn("Supabase API not configured. Using fallback data.")
    return fallback
  }

  try {
    // In a real implementation, this would query the Supabase database
    // For now, we'll just return the fallback
    return fallback
  } catch (error) {
    console.error("Error querying Supabase database:", error)
    return fallback
  }
}

