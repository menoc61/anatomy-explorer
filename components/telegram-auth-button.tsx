"use client"

import { useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

declare global {
  interface Window {
    Telegram?: {
      Login: {
        auth: (options: {
          bot_id: string
          request_access?: boolean
          lang?: string
          callback: (data: any) => void
        }) => HTMLElement
      }
    }
  }
}

interface TelegramAuthButtonProps {
  botId: string
  buttonSize?: "large" | "medium" | "small"
  cornerRadius?: number
  requestAccess?: boolean
  usePic?: boolean
  className?: string
}

export function TelegramAuthButton({
  botId,
  buttonSize = "medium",
  cornerRadius = 8,
  requestAccess = true,
  usePic = true,
  className,
}: TelegramAuthButtonProps) {
  const { login } = useAuth()
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Telegram script if not already loaded
    if (!window.Telegram) {
      const script = document.createElement("script")
      script.src = "https://telegram.org/js/telegram-widget.js?22"
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }

    // Initialize Telegram login widget when script is loaded
    const initTelegramLogin = () => {
      if (window.Telegram && containerRef.current) {
        containerRef.current.innerHTML = ""

        const loginButton = window.Telegram.Login.auth({
          bot_id: botId,
          request_access: requestAccess,
          lang: language === "ru" ? "ru" : language === "fr" ? "fr" : "en",
          callback: handleTelegramAuth,
        })

        // Apply custom styles
        loginButton.dataset.size = buttonSize
        loginButton.dataset.radius = cornerRadius.toString()
        loginButton.dataset.userpic = usePic.toString()

        containerRef.current.appendChild(loginButton)
      }
    }

    // Check if Telegram is already loaded
    if (window.Telegram) {
      initTelegramLogin()
    } else {
      // Wait for script to load
      const checkTelegramLoaded = setInterval(() => {
        if (window.Telegram) {
          clearInterval(checkTelegramLoaded)
          initTelegramLogin()
        }
      }, 100)

      return () => clearInterval(checkTelegramLoaded)
    }
  }, [botId, buttonSize, cornerRadius, requestAccess, usePic, language])

  const handleTelegramAuth = (user: any) => {
    // In a real app, you would verify this data on your backend
    console.log("Telegram auth data:", user)

    if (user && user.id) {
      // For demo purposes, we'll just log in with the Telegram username
      login(`${user.username || user.first_name}@telegram.org`, "telegram-auth-123456")
    }
  }

  return <div ref={containerRef} className={className} />
}

