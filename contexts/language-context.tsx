"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr" | "ru"

type Translations = {
  [key: string]: {
    [key in Language]: string
  }
}

// Define translations
const translations: Translations = {
  "app.title": {
    en: "Anatomy Explorer",
    fr: "Explorateur d'Anatomie",
    ru: "Исследователь Анатомии",
  },
  "app.subtitle": {
    en: "Interactive 3D human anatomy explorer",
    fr: "Explorateur interactif d'anatomie humaine en 3D",
    ru: "Интерактивный 3D-исследователь анатомии человека",
  },
  "nav.home": {
    en: "Home",
    fr: "Accueil",
    ru: "Главная",
  },
  "nav.learn": {
    en: "Learn",
    fr: "Apprendre",
    ru: "Обучение",
  },
  "nav.videos": {
    en: "Videos",
    fr: "Vidéos",
    ru: "Видео",
  },
  "nav.account": {
    en: "Account",
    fr: "Compte",
    ru: "Аккаунт",
  },
  "nav.settings": {
    en: "Settings",
    fr: "Paramètres",
    ru: "Настройки",
  },
  "nav.logout": {
    en: "Log out",
    fr: "Déconnexion",
    ru: "Выйти",
  },
  "auth.login": {
    en: "Login",
    fr: "Connexion",
    ru: "Вход",
  },
  "auth.signup": {
    en: "Sign up",
    fr: "S'inscrire",
    ru: "Регистрация",
  },
  "auth.email": {
    en: "Email",
    fr: "Email",
    ru: "Эл. почта",
  },
  "auth.password": {
    en: "Password",
    fr: "Mot de passe",
    ru: "Пароль",
  },
  "auth.forgotPassword": {
    en: "Forgot your password?",
    fr: "Mot de passe oublié?",
    ru: "Забыли пароль?",
  },
  "auth.name": {
    en: "Name",
    fr: "Nom",
    ru: "Имя",
  },
  "auth.confirmPassword": {
    en: "Confirm Password",
    fr: "Confirmer le mot de passe",
    ru: "Подтвердите пароль",
  },
  "auth.createAccount": {
    en: "Create account",
    fr: "Créer un compte",
    ru: "Создать аккаунт",
  },
  "auth.alreadyHaveAccount": {
    en: "Already have an account?",
    fr: "Vous avez déjà un compte?",
    ru: "Уже есть аккаунт?",
  },
  "auth.dontHaveAccount": {
    en: "Don't have an account?",
    fr: "Vous n'avez pas de compte?",
    ru: "Нет аккаунта?",
  },
  "subscription.title": {
    en: "Subscription Plans",
    fr: "Plans d'Abonnement",
    ru: "Планы Подписки",
  },
  "subscription.basic": {
    en: "Basic",
    fr: "Basique",
    ru: "Базовый",
  },
  "subscription.premium": {
    en: "Premium",
    fr: "Premium",
    ru: "Премиум",
  },
  "subscription.professional": {
    en: "Professional",
    fr: "Professionnel",
    ru: "Профессиональный",
  },
  "subscription.current": {
    en: "Current Plan",
    fr: "Plan Actuel",
    ru: "Текущий План",
  },
  "subscription.upgrade": {
    en: "Upgrade Now",
    fr: "Mettre à Niveau",
    ru: "Улучшить Сейчас",
  },
  "settings.title": {
    en: "Settings",
    fr: "Paramètres",
    ru: "Настройки",
  },
  "settings.language": {
    en: "Language",
    fr: "Langue",
    ru: "Язык",
  },
  "settings.theme": {
    en: "Theme",
    fr: "Thème",
    ru: "Тема",
  },
  "settings.notifications": {
    en: "Notifications",
    fr: "Notifications",
    ru: "Уведомления",
  },
  "settings.save": {
    en: "Save Changes",
    fr: "Enregistrer",
    ru: "Сохранить",
  },
  "download.video": {
    en: "Download Video",
    fr: "Télécharger la Vidéo",
    ru: "Скачать Видео",
  },
  "download.pdf": {
    en: "Download PDF",
    fr: "Télécharger le PDF",
    ru: "Скачать PDF",
  },
  "theme.light": {
    en: "Light",
    fr: "Clair",
    ru: "Светлая",
  },
  "theme.dark": {
    en: "Dark",
    fr: "Sombre",
    ru: "Темная",
  },
  "theme.system": {
    en: "System",
    fr: "Système",
    ru: "Системная",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  availableLanguages: { code: Language; name: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "fr", "ru"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "fr") setLanguage("fr")
      else if (browserLang === "ru") setLanguage("ru")
      // Default to English for other languages
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  const availableLanguages = [
    { code: "en" as Language, name: "English" },
    { code: "fr" as Language, name: "Français" },
    { code: "ru" as Language, name: "Русский" },
  ]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

