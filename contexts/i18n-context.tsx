"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the i18n context type
interface I18nContextType {
  t: (key: string, params?: Record<string, string>) => string
  changeLanguage: (lang: string) => void
  currentLanguage: string
}

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Define translations for different languages
const translations: Record<string, Record<string, string>> = {
  en: {
    // General
    "app.title": "Anatomy Explorer",
    "app.subtitle": "Interactive 3D human anatomy explorer",
    "app.loading": "Loading...",
    "app.error": "An error occurred",
    "app.success": "Success",
    "error.modelLoad": "Failed to load 3D model. Displaying fallback.",

    // Navigation
    "nav.home": "Home",
    "nav.learn": "Learn",
    "nav.videos": "Videos",
    "nav.account": "Account",
    "nav.settings": "Settings",
    "nav.logout": "Log out",
    "nav.admin": "Admin Dashboard",
    "nav.profile": "Profile",

    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgotPassword": "Forgot your password?",
    "auth.name": "Name",
    "auth.confirmPassword": "Confirm Password",
    "auth.createAccount": "Create account",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.loginWithGoogle": "Login with Google",
    "auth.loginWithFacebook": "Login with Facebook",

    // Subscription
    "subscription.title": "Subscription Plans",
    "subscription.basic": "Basic",
    "subscription.premium": "Premium",
    "subscription.professional": "Professional",
    "subscription.current": "Current Plan",
    "subscription.upgrade": "Upgrade Now",
    "subscription.manage": "Manage Subscription",
    "subscription.cancel": "Cancel Subscription",

    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.notifications": "Notifications",
    "settings.save": "Save Changes",
    "settings.account": "Account",
    "settings.privacy": "Privacy",
    "settings.appearance": "Appearance",
    "settings.accessibility": "Accessibility",
    "settings.database": "Database",
    "settings.api": "API",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Database
    "database.title": "Database Settings",
    "database.connection": "Connection",
    "database.prisma": "Prisma Configuration",
    "database.supabase": "Supabase Configuration",
    "database.url": "Database URL",
    "database.apiKey": "API Key",
    "database.test": "Test Connection",

    // Admin
    "admin.title": "Admin Dashboard",
    "admin.users": "Users",
    "admin.content": "Content",
    "admin.videos": "Videos",
    "admin.settings": "Settings",
    "admin.stats": "Statistics",
    "admin.addVideo": "Add Video",
    "admin.editVideo": "Edit Video",
    "admin.deleteVideo": "Delete Video",
    "admin.videoTitle": "Video Title",
    "admin.videoDescription": "Video Description",
    "admin.videoUrl": "Video URL",
    "admin.videoThumbnail": "Video Thumbnail",
    "admin.videoDuration": "Video Duration",
    "admin.videoPremium": "Premium Content",
    "admin.videoMuscle": "Related Muscle",

    // Muscles
    "muscles.title": "Muscle Groups",
    "muscles.select": "Select a muscle",
    "muscles.overview": "Overview",
    "muscles.function": "Function",
    "muscles.conditions": "Conditions",
    "muscles.videos": "Videos",
    "muscles.origin": "Origin",
    "muscles.insertion": "Insertion",
    "muscles.click_to_view": "Click to view details", // Added for fallback model tooltip

    // Model Views (for FallbackModel)
    "model.front": "Front",
    "model.back": "Back",
    "model.side": "Side",
    "model.legendTitle": "Muscle Legend",
    // Fallback Muscle Names (add more as needed)
    "muscles.pectoralis.name": "Pectoralis Major",
    "muscles.deltoid.name": "Deltoid",
    "muscles.biceps.name": "Biceps Brachii",
    "muscles.rectus-abdominis.name": "Rectus Abdominis",
    "muscles.quadriceps.name": "Quadriceps",
    "muscles.tibialis-anterior.name": "Tibialis Anterior",
    "muscles.obliques.name": "Obliques",
    "muscles.forearm-flexors.name": "Forearm Flexors",
    "muscles.adductors.name": "Adductors",
    "muscles.sartorius.name": "Sartorius",
    "muscles.trapezius.name": "Trapezius",
    "muscles.latissimus-dorsi.name": "Latissimus Dorsi",
    "muscles.triceps.name": "Triceps",
    "muscles.gluteus-maximus.name": "Gluteus Maximus",
    "muscles.hamstrings.name": "Hamstrings",
    "muscles.gastrocnemius.name": "Gastrocnemius",
    "muscles.rhomboids.name": "Rhomboids",
    "muscles.posterior-deltoid.name": "Posterior Deltoid",
    "muscles.infraspinatus.name": "Infraspinatus",
    "muscles.erector-spinae.name": "Erector Spinae",
    "muscles.gluteus-medius.name": "Gluteus Medius",
    "muscles.soleus.name": "Soleus",

    // User
    "user.profile": "Profile",
    "user.settings": "Settings",
    "user.logout": "Logout",
    "user.subscription": "Subscription",
    "user.language": "Language",
    "user.theme": "Theme",
    "user.notifications": "Notifications",

    // Actions
    "actions.save": "Save",
    "actions.cancel": "Cancel",
    "actions.delete": "Delete",
    "actions.edit": "Edit",
    "actions.add": "Add",
    "actions.search": "Search",
    "actions.filter": "Filter",
    "actions.sort": "Sort",
    "actions.download": "Download",
    "actions.share": "Share",
    "actions.close": "Close",
    "actions.copyLinkSuccess": "Link copied to clipboard!",
    "actions.copyLinkError": "Failed to copy link.",

    // System
    "system.status": "System Status",
    "system.version": "Version",
    "system.lastUpdate": "Last Update",
    "system.maintenance": "Maintenance",
    "system.backup": "Backup",
    "system.restore": "Restore",
    "system.logs": "System Logs",

    "account.downloads": "My Downloads",
    "account.downloads.description": "Manage your downloaded content for offline access",
    "account.downloads.empty": "You haven't downloaded any content yet",
    "account.downloads.search": "Search downloads",
    "account.downloads.filter": "Filter",
    "account.downloads.sort": "Sort",
    "account.downloads.offline": "Available Offline",
    "account.downloads.online": "Online Only",
    "account.downloads.video": "Video",
    "account.downloads.document": "Document",
    "account.downloads.size": "Size",
    "account.downloads.date": "Downloaded",
    "account.downloads.remove": "Remove",
    "account.downloads.play": "Play",
    "account.downloads.open": "Open",
    "account.downloads.saveOffline": "Save Offline",
    "account.downloads.removeOffline": "Remove Offline",
    "account.downloads.offlineMode": "Offline Mode",
    "account.downloads.refresh": "Refresh",
    "account.downloads.settings": "Download Settings",
    "account.downloads.settings.description": "Configure how downloads are managed on your device",
    "account.downloads.settings.autoDownload": "Automatic Downloads",
    "account.downloads.settings.autoDownload.description": "Automatically download new premium content",
    "account.downloads.settings.offlineOnly": "Show Offline Content Only",
    "account.downloads.settings.offlineOnly.description": "Only show content available offline",
  },

  fr: {
    // General
    "app.title": "Explorateur d'Anatomie",
    "app.subtitle": "Explorateur interactif d'anatomie humaine en 3D",
    "app.loading": "Chargement...",
    "app.error": "Une erreur est survenue",
    "app.success": "Succès",
    "error.modelLoad": "Échec du chargement du modèle 3D. Affichage du modèle de secours.",

    // Navigation
    "nav.home": "Accueil",
    "nav.learn": "Apprendre",
    "nav.videos": "Vidéos",
    "nav.account": "Compte",
    "nav.settings": "Paramètres",
    "nav.logout": "Déconnexion",
    "nav.admin": "Tableau de Bord Admin",
    "nav.profile": "Profil",

    // Auth
    "auth.login": "Connexion",
    "auth.signup": "S'inscrire",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.forgotPassword": "Mot de passe oublié?",
    "auth.name": "Nom",
    "auth.confirmPassword": "Confirmer le mot de passe",
    "auth.createAccount": "Créer un compte",
    "auth.alreadyHaveAccount": "Vous avez déjà un compte?",
    "auth.dontHaveAccount": "Vous n'avez pas de compte?",
    "auth.loginWithGoogle": "Connexion avec Google",
    "auth.loginWithFacebook": "Connexion avec Facebook",

    // Subscription
    "subscription.title": "Plans d'Abonnement",
    "subscription.basic": "Basique",
    "subscription.premium": "Premium",
    "subscription.professional": "Professionnel",
    "subscription.current": "Plan Actuel",
    "subscription.upgrade": "Mettre à Niveau",
    "subscription.manage": "Gérer l'Abonnement",
    "subscription.cancel": "Annuler l'Abonnement",

    // Settings
    "settings.title": "Paramètres",
    "settings.language": "Langue",
    "settings.theme": "Thème",
    "settings.notifications": "Notifications",
    "settings.save": "Enregistrer les Modifications",
    "settings.account": "Compte",
    "settings.privacy": "Confidentialité",
    "settings.appearance": "Apparence",
    "settings.accessibility": "Accessibilité",
    "settings.database": "Base de données",
    "settings.api": "API",

    // Theme
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.system": "Système",

    // Database
    "database.title": "Paramètres de Base de Données",
    "database.connection": "Connexion",
    "database.prisma": "Configuration Prisma",
    "database.supabase": "Configuration Supabase",
    "database.url": "URL de la Base de Données",
    "database.apiKey": "Clé API",
    "database.test": "Tester la Connexion",

    // Admin
    "admin.title": "Tableau de Bord Admin",
    "admin.users": "Utilisateurs",
    "admin.content": "Contenu",
    "admin.videos": "Vidéos",
    "admin.settings": "Paramètres",
    "admin.stats": "Statistiques",
    "admin.addVideo": "Ajouter une Vidéo",
    "admin.editVideo": "Modifier la Vidéo",
    "admin.deleteVideo": "Supprimer la Vidéo",
    "admin.videoTitle": "Titre de la Vidéo",
    "admin.videoDescription": "Description de la Vidéo",
    "admin.videoUrl": "URL de la Vidéo",
    "admin.videoThumbnail": "Miniature de la Vidéo",
    "admin.videoDuration": "Durée de la Vidéo",
    "admin.videoPremium": "Contenu Premium",
    "admin.videoMuscle": "Muscle Associé",

    // Muscles
    "muscles.title": "Groupes Musculaires",
    "muscles.select": "Sélectionnez un muscle",
    "muscles.overview": "Aperçu",
    "muscles.function": "Fonction",
    "muscles.conditions": "Conditions",
    "muscles.videos": "Vidéos",
    "muscles.origin": "Origine",
    "muscles.insertion": "Insertion",
    "muscles.click_to_view": "Cliquez pour voir les détails", // Added for fallback model tooltip

    // Model Views (for FallbackModel)
    "model.front": "Avant",
    "model.back": "Arrière",
    "model.side": "Côté",
    "model.legendTitle": "Légende des Muscles",
    // Fallback Muscle Names (French - Placeholders/Direct names)
    "muscles.pectoralis.name": "Grand Pectoral",
    "muscles.deltoid.name": "Deltoïde",
    "muscles.biceps.name": "Biceps Brachial",
    "muscles.rectus-abdominis.name": "Grand Droit de l'Abdomen",
    "muscles.quadriceps.name": "Quadriceps",
    "muscles.tibialis-anterior.name": "Tibial Antérieur",
    "muscles.obliques.name": "Obliques",
    "muscles.forearm-flexors.name": "Fléchisseurs de l'Avant-bras",
    "muscles.adductors.name": "Adducteurs",
    "muscles.sartorius.name": "Sartorius",
    "muscles.trapezius.name": "Trapèze",
    "muscles.latissimus-dorsi.name": "Grand Dorsal",
    "muscles.triceps.name": "Triceps Brachial",
    "muscles.gluteus-maximus.name": "Grand Fessier",
    "muscles.hamstrings.name": "Ischio-jambiers",
    "muscles.gastrocnemius.name": "Gastrocnémien",
    "muscles.rhomboids.name": "Rhomboïdes",
    "muscles.posterior-deltoid.name": "Deltoïde Postérieur",
    "muscles.infraspinatus.name": "Infra-épineux",
    "muscles.erector-spinae.name": "Érecteurs du Rachis",
    "muscles.gluteus-medius.name": "Moyen Fessier",
    "muscles.soleus.name": "Soléaire",

    // User
    "user.profile": "Profil",
    "user.settings": "Paramètres",
    "user.logout": "Déconnexion",
    "user.subscription": "Abonnement",
    "user.language": "Langue",
    "user.theme": "Thème",
    "user.notifications": "Notifications",

    // Actions
    "actions.save": "Enregistrer",
    "actions.cancel": "Annuler",
    "actions.delete": "Supprimer",
    "actions.edit": "Modifier",
    "actions.add": "Ajouter",
    "actions.search": "Rechercher",
    "actions.filter": "Filtrer",
    "actions.sort": "Trier",
    "actions.download": "Télécharger",
    "actions.share": "Partager",
    "actions.close": "Fermer",
    "actions.copyLinkSuccess": "Lien copié dans le presse-papiers !",
    "actions.copyLinkError": "Échec de la copie du lien.",

    // System
    "system.status": "État du Système",
    "system.version": "Version",
    "system.lastUpdate": "Dernière Mise à Jour",
    "system.maintenance": "Maintenance",
    "system.backup": "Sauvegarde",
    "system.restore": "Restaurer",
    "system.logs": "Journaux Système",

    "account.downloads": "Mes Téléchargements",
    "account.downloads.description": "Gérez votre contenu téléchargé pour un accès hors ligne",
    "account.downloads.empty": "Vous n'avez pas encore téléchargé de contenu",
    "account.downloads.search": "Rechercher des téléchargements",
    "account.downloads.filter": "Filtrer",
    "account.downloads.sort": "Trier",
    "account.downloads.offline": "Disponible Hors Ligne",
    "account.downloads.online": "En Ligne Uniquement",
    "account.downloads.video": "Vidéo",
    "account.downloads.document": "Document",
    "account.downloads.size": "Taille",
    "account.downloads.date": "Téléchargé",
    "account.downloads.remove": "Supprimer",
    "account.downloads.play": "Lire",
    "account.downloads.open": "Ouvrir",
    "account.downloads.saveOffline": "Enregistrer Hors Ligne",
    "account.downloads.removeOffline": "Supprimer Hors Ligne",
    "account.downloads.offlineMode": "Mode Hors Ligne",
    "account.downloads.refresh": "Actualiser",
    "account.downloads.settings": "Paramètres de Téléchargement",
    "account.downloads.settings.description": "Configurez la gestion des téléchargements sur votre appareil",
    "account.downloads.settings.autoDownload": "Téléchargements Automatiques",
    "account.downloads.settings.autoDownload.description": "Télécharger automatiquement le nouveau contenu premium",
    "account.downloads.settings.offlineOnly": "Afficher Uniquement le Contenu Hors Ligne",
    "account.downloads.settings.offlineOnly.description": "Afficher uniquement le contenu disponible hors ligne",
  },

  ru: {
    // General
    "app.title": "Исследователь Анатомии",
    "app.subtitle": "Интерактивный 3D-исследователь анатомии человека",
    "app.loading": "Загрузка...",
    "app.error": "Произошла ошибка",
    "app.success": "Успех",
    "error.modelLoad": "Не удалось загрузить 3D-модель. Отображается запасной вариант.",

    // Navigation
    "nav.home": "Главная",
    "nav.learn": "Обучение",
    "nav.videos": "Видео",
    "nav.account": "Аккаунт",
    "nav.settings": "Настройки",
    "nav.logout": "Выйти",
    "nav.admin": "Панель Администратора",
    "nav.profile": "Профиль",

    // Auth
    "auth.login": "Вход",
    "auth.signup": "Регистрация",
    "auth.email": "Эл. почта",
    "auth.password": "Пароль",
    "auth.forgotPassword": "Забыли пароль?",
    "auth.name": "Имя",
    "auth.confirmPassword": "Подтвердите пароль",
    "auth.createAccount": "Создать аккаунт",
    "auth.alreadyHaveAccount": "Уже есть аккаунт?",
    "auth.dontHaveAccount": "Нет аккаунта?",
    "auth.loginWithGoogle": "Войти через Google",
    "auth.loginWithFacebook": "Войти через Facebook",

    // Subscription
    "subscription.title": "Планы Подписки",
    "subscription.basic": "Базовый",
    "subscription.premium": "Премиум",
    "subscription.professional": "Профессиональный",
    "subscription.current": "Текущий План",
    "subscription.upgrade": "Улучшить Сейчас",
    "subscription.manage": "Управление Подпиской",
    "subscription.cancel": "Отменить Подписку",

    // Settings
    "settings.title": "Настройки",
    "settings.language": "Язык",
    "settings.theme": "Тема",
    "settings.notifications": "Уведомления",
    "settings.save": "Сохранить Изменения",
    "settings.account": "Аккаунт",
    "settings.privacy": "Конфиденциальность",
    "settings.appearance": "Внешний вид",
    "settings.accessibility": "Доступность",
    "settings.database": "База данных",
    "settings.api": "API",

    // Theme
    "theme.light": "Светлая",
    "theme.dark": "Темная",
    "theme.system": "Системная",

    // Database
    "database.title": "Настройки Базы Данных",
    "database.connection": "Подключение",
    "database.prisma": "Конфигурация Prisma",
    "database.supabase": "Конфигурация Supabase",
    "database.url": "URL Базы Данных",
    "database.apiKey": "API Ключ",
    "database.test": "Проверить Соединение",

    // Admin
    "admin.title": "Панель Администратора",
    "admin.users": "Пользователи",
    "admin.content": "Контент",
    "admin.videos": "Видео",
    "admin.settings": "Настройки",
    "admin.stats": "Статистика",
    "admin.addVideo": "Добавить Видео",
    "admin.editVideo": "Редактировать Видео",
    "admin.deleteVideo": "Удалить Видео",
    "admin.videoTitle": "Название Видео",
    "admin.videoDescription": "Описание Видео",
    "admin.videoUrl": "URL Видео",
    "admin.videoThumbnail": "Миниатюра Видео",
    "admin.videoDuration": "Продолжительность Видео",
    "admin.videoPremium": "Премиум Контент",
    "admin.videoMuscle": "Связанная Мышца",

    // Muscles
    "muscles.title": "Группы Мышц",
    "muscles.select": "Выберите мышцу",
    "muscles.overview": "Обзор",
    "muscles.function": "Функция",
    "muscles.conditions": "Состояния",
    "muscles.videos": "Видео",
    "muscles.origin": "Начало",
    "muscles.insertion": "Прикрепление",
    "muscles.click_to_view": "Нажмите для просмотра деталей", // Added for fallback model tooltip

    // Model Views (for FallbackModel)
    "model.front": "Перед",
    "model.back": "Сзади",
    "model.side": "Сбоку",
    "model.legendTitle": "Легенда Мышц",
    // Fallback Muscle Names (Russian - Placeholders/Direct names)
    "muscles.pectoralis.name": "Большая Грудная Мышца",
    "muscles.deltoid.name": "Дельтовидная Мышца",
    "muscles.biceps.name": "Двуглавая Мышца Плеча",
    "muscles.rectus-abdominis.name": "Прямая Мышца Живота",
    "muscles.quadriceps.name": "Четырехглавая Мышца Бедра",
    "muscles.tibialis-anterior.name": "Передняя Большеберцовая Мышца",
    "muscles.obliques.name": "Косые Мышцы Живота",
    "muscles.forearm-flexors.name": "Сгибатели Предплечья",
    "muscles.adductors.name": "Приводящие Мышцы",
    "muscles.sartorius.name": "Портняжная Мышца",
    "muscles.trapezius.name": "Трапециевидная Мышца",
    "muscles.latissimus-dorsi.name": "Широчайшая Мышца Спины",
    "muscles.triceps.name": "Трехглавая Мышца Плеча",
    "muscles.gluteus-maximus.name": "Большая Ягодичная Мышца",
    "muscles.hamstrings.name": "Мышцы Задней Поверхности Бедра",
    "muscles.gastrocnemius.name": "Икроножная Мышца",
    "muscles.rhomboids.name": "Ромбовидные Мышцы",
    "muscles.posterior-deltoid.name": "Задняя Дельтовидная Мышца",
    "muscles.infraspinatus.name": "Подостная Мышца",
    "muscles.erector-spinae.name": "Мышца, Выпрямляющая Позвоночник",
    "muscles.gluteus-medius.name": "Средняя Ягодичная Мышца",
    "muscles.soleus.name": "Камбаловидная Мышца",

    // User
    "user.profile": "Профиль",
    "user.settings": "Настройки",
    "user.logout": "Выйти",
    "user.subscription": "Подписка",
    "user.language": "Язык",
    "user.theme": "Тема",
    "user.notifications": "Уведомления",

    // Actions
    "actions.save": "Сохранить",
    "actions.cancel": "Отмена",
    "actions.delete": "Удалить",
    "actions.edit": "Редактировать",
    "actions.add": "Добавить",
    "actions.search": "Поиск",
    "actions.filter": "Фильтр",
    "actions.sort": "Сортировка",
    "actions.download": "Скачать",
    "actions.share": "Поделиться",
    "actions.close": "Закрыть",
    "actions.copyLinkSuccess": "Ссылка скопирована в буфер обмена!",
    "actions.copyLinkError": "Не удалось скопировать ссылку.",

    // System
    "system.status": "Статус Системы",
    "system.version": "Версия",
    "system.lastUpdate": "Последнее Обновление",
    "system.maintenance": "Обслуживание",
    "system.backup": "Резервное Копирование",
    "system.restore": "Восстановление",
    "system.logs": "Системные Журналы",

    "account.downloads": "Мои Загрузки",
    "account.downloads.description": "Управляйте загруженным контентом для офлайн-доступа",
    "account.downloads.empty": "Вы еще не загрузили контент",
    "account.downloads.search": "Поиск загрузок",
    "account.downloads.filter": "Фильтр",
    "account.downloads.sort": "Сортировка",
    "account.downloads.offline": "Доступно Офлайн",
    "account.downloads.online": "Только Онлайн",
    "account.downloads.video": "Видео",
    "account.downloads.document": "Документ",
    "account.downloads.size": "Размер",
    "account.downloads.date": "Загружено",
    "account.downloads.remove": "Удалить",
    "account.downloads.play": "Воспроизвести",
    "account.downloads.open": "Открыть",
    "account.downloads.saveOffline": "Сохранить Офлайн",
    "account.downloads.removeOffline": "Удалить из Офлайн",
    "account.downloads.offlineMode": "Офлайн Режим",
    "account.downloads.refresh": "Обновить",
    "account.downloads.settings": "Настройки Загрузки",
    "account.downloads.settings.description": "Настройте управление загрузками на вашем устройстве",
    "account.downloads.settings.autoDownload": "Автоматические Загрузки",
    "account.downloads.settings.autoDownload.description": "Автоматически загружать новый премиум-контент",
    "account.downloads.settings.offlineOnly": "Показывать Только Офлайн-Контент",
    "account.downloads.settings.offlineOnly.description": "Показывать только контент, доступный офлайн",
  },
}

// Create the provider component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")

  // Initialize language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage && ["en", "fr", "ru"].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage)
      }
    }
  }, [])

  // Translation function
  const t = (key: string, params?: Record<string, string>): string => {
    // Get the translation for the current language
    const translation = translations[currentLanguage]?.[key] || translations.en[key] || key

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{{${key}}}`, value)
      }, translation)
    }

    return translation
  }

  // Change language function
  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setCurrentLanguage(lang)
      // Update HTML lang attribute
      document.documentElement.lang = lang
      // Store in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang)
      }
    }
  }

  return <I18nContext.Provider value={{ t, changeLanguage, currentLanguage }}>{children}</I18nContext.Provider>
}

// Custom hook to use the i18n context
export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
