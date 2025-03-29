"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/contexts/i18n-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Save, Trash } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function TranslationsPage() {
  const router = useRouter()
  const { t, changeLanguage, currentLanguage } = useI18n()

  const [isLoading, setIsLoading] = useState(false)
  const [newKey, setNewKey] = useState("")
  const [newTranslation, setNewTranslation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  // Mock translations for the current language
  const translations = {
    Welcome: t("Welcome"),
    Muscles: t("Muscles"),
    Settings: t("Settings"),
    Help: t("Help"),
  }

  const filteredTranslations = Object.entries(translations)
    .filter(([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => a[0].localeCompare(b[0]))

  const handleAddTranslation = () => {
    if (!newKey.trim() || !newTranslation.trim()) {
      toast({
        title: "Error",
        description: "Both key and value are required",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, this would update the translations in the context or backend
    toast({
      title: "Success",
      description: `Translation for "${newKey}" added successfully`,
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

    // In a real implementation, this would update the translations in the context or backend
    toast({
      title: "Success",
      description: `Translation for "${key}" updated successfully`,
    })

    setEditingKey(null)
  }

  const handleDeleteTranslation = (key: string) => {
    // In a real implementation, this would delete the translation from the context or backend
    toast({
      title: "Success",
      description: `Translation for "${key}" deleted successfully`,
    })
  }

  return (
    <AdminSidebar>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("admin.title")}</h1>
          <div className="flex gap-2">
            <Select value={currentLanguage} onValueChange={changeLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("settings.language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">{t("actions.edit")}</TabsTrigger>
            <TabsTrigger value="add">{t("actions.add")}</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("actions.edit")}</CardTitle>
                <CardDescription>{t("admin.content")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder={t("actions.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("actions.key")}</TableHead>
                      <TableHead>{t("actions.value")}</TableHead>
                      <TableHead>{t("actions.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTranslations.map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>
                          {editingKey === key ? (
                            <Textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
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
                                {t("actions.edit")}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteTranslation(key)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("actions.add")}</CardTitle>
                <CardDescription>{t("admin.content")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder={t("actions.key")}
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="mb-4"
                />
                <Textarea
                  placeholder={t("actions.value")}
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  className="mb-4"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddTranslation}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("actions.add")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminSidebar>
  )
}