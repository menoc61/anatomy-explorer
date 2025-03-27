"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/context/i18n-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Save, Trash, RefreshCw } from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

// Mock function to translate text using Google Translate API
const translateText = async (text: string, targetLang: string) => {
  // In a real implementation, this would call the Google Translate API
  console.log(`Translating "${text}" to ${targetLang}`)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a mock translation (in a real app, this would come from the API)
  const mockTranslations: Record<string, Record<string, string>> = {
    en: {
      Welcome: "Welcome",
      Muscles: "Muscles",
      Settings: "Settings",
      Help: "Help",
    },
    es: {
      Welcome: "Bienvenido",
      Muscles: "Músculos",
      Settings: "Configuración",
      Help: "Ayuda",
    },
    fr: {
      Welcome: "Bienvenue",
      Muscles: "Muscles",
      Settings: "Paramètres",
      Help: "Aide",
    },
    de: {
      Welcome: "Willkommen",
      Muscles: "Muskeln",
      Settings: "Einstellungen",
      Help: "Hilfe",
    },
  }

  return mockTranslations[targetLang]?.[text] || text
}

export default function TranslationsPage() {
  const router = useRouter()
  const { t, addTranslation, translations } = useTranslation()
  const { language, setLanguage, availableLanguages } = useLanguage()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [newKey, setNewKey] = useState("")
  const [newTranslation, setNewTranslation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  // Filter translations based on search term
  const filteredTranslations = Object.entries(translations[selectedLanguage] || {})
    .filter(
      ([key, value]) =>
        key.toLowerCase().includes(searchTerm.toLowerCase()) || value.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => a[0].localeCompare(b[0]))

  const handleAddTranslation = () => {
    if (!newKey.trim()) {
      toast({
        title: "Error",
        description: "Translation key cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (!newTranslation.trim()) {
      toast({
        title: "Error",
        description: "Translation value cannot be empty",
        variant: "destructive",
      })
      return
    }

    addTranslation(selectedLanguage, newKey, newTranslation)

    toast({
      title: "Success",
      description: "Translation added successfully",
    })

    setNewKey("")
    setNewTranslation("")
  }

  const handleSaveEdit = (key: string) => {
    if (!editValue.trim()) {
      toast({
        title: "Error",
        description: "Translation value cannot be empty",
        variant: "destructive",
      })
      return
    }

    addTranslation(selectedLanguage, key, editValue)
    setEditingKey(null)

    toast({
      title: "Success",
      description: "Translation updated successfully",
    })
  }

  const handleDeleteTranslation = (key: string) => {
    // In a real implementation, this would call an API to delete the translation
    const updatedTranslations = { ...translations[selectedLanguage] }
    delete updatedTranslations[key]

    // Update the context
    const newTranslations = { ...translations }
    newTranslations[selectedLanguage] = updatedTranslations

    // This is a mock implementation - in a real app you'd update the context properly
    toast({
      title: "Success",
      description: `Translation "${key}" deleted successfully`,
    })
  }

  const handleAutoTranslate = async () => {
    if (!newKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a key to translate",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const translatedText = await translateText(newKey, selectedLanguage)
      setNewTranslation(translatedText)

      toast({
        title: "Success",
        description: "Auto-translation completed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to auto-translate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBulkTranslate = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would call an API to translate all missing keys
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Bulk translation completed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform bulk translation",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(translations, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `translations_${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedTranslations = JSON.parse(e.target?.result as string)

        // In a real implementation, this would update the translations in the context
        toast({
          title: "Success",
          description: "Translations imported successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import translations. Invalid file format.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Translation Management</h1>
          <div className="flex gap-2">
            <Button onClick={handleExport}>Export All</Button>
            <Button as="label" className="cursor-pointer">
              Import
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Translations</TabsTrigger>
            <TabsTrigger value="add">Add New Translations</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Edit Translations</CardTitle>
                <CardDescription>Manage existing translations for all supported languages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLanguages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Search translations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />

                  <Button onClick={handleBulkTranslate} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Bulk Translate Missing
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Key</TableHead>
                        <TableHead>Translation</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTranslations.length > 0 ? (
                        filteredTranslations.map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium">{key}</TableCell>
                            <TableCell>
                              {editingKey === key ? (
                                <Textarea
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="min-h-[80px]"
                                />
                              ) : (
                                value
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {editingKey === key ? (
                                  <Button size="sm" onClick={() => handleSaveEdit(key)}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setEditingKey(key)
                                      setEditValue(value)
                                    }}
                                  >
                                    Edit
                                  </Button>
                                )}
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteTranslation(key)}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">
                            No translations found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Translation</CardTitle>
                <CardDescription>Add new translation keys and values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLanguages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Translation Key</label>
                    <Input
                      placeholder="Enter translation key"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium">Translation Value</label>
                      <Button size="sm" variant="outline" onClick={handleAutoTranslate} disabled={isLoading || !newKey}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Auto-translate</>}
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Enter translation value"
                      value={newTranslation}
                      onChange={(e) => setNewTranslation(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddTranslation}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Translation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

