"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { muscleData } from "@/lib/muscle-data"
import { Plus, Minus, FileUp, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface MuscleCondition {
  name: string
  description: string
}

interface MuscleData {
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

export default function MuscleEditor() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(Object.keys(muscleData)[0])
  const [editedMuscle, setEditedMuscle] = useState<MuscleData | null>(null)
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  // Only allow admin to edit
  const isAdmin = user?.role === "admin"

  // Load muscle data when a muscle is selected
  const handleSelectMuscle = (muscleId: string) => {
    setSelectedMuscle(muscleId)
    setEditedMuscle(structuredClone(muscleData[muscleId]))
    setActiveTab("general")
  }

  // Update a field in the edited muscle
  const handleChange = (field: keyof MuscleData, value: any) => {
    if (!editedMuscle) return
    setEditedMuscle({
      ...editedMuscle,
      [field]: value,
    })
  }

  // Add an item to an array field
  const handleAddArrayItem = (field: "functions" | "movements", value: string) => {
    if (!editedMuscle) return
    setEditedMuscle({
      ...editedMuscle,
      [field]: [...editedMuscle[field], value],
    })
  }

  // Remove an item from an array field
  const handleRemoveArrayItem = (field: "functions" | "movements", index: number) => {
    if (!editedMuscle) return
    setEditedMuscle({
      ...editedMuscle,
      [field]: editedMuscle[field].filter((_, i) => i !== index),
    })
  }

  // Add a condition
  const handleAddCondition = (condition: MuscleCondition) => {
    if (!editedMuscle) return
    setEditedMuscle({
      ...editedMuscle,
      conditions: [...editedMuscle.conditions, condition],
    })
  }

  // Remove a condition
  const handleRemoveCondition = (index: number) => {
    if (!editedMuscle) return
    setEditedMuscle({
      ...editedMuscle,
      conditions: editedMuscle.conditions.filter((_, i) => i !== index),
    })
  }

  // Update a condition
  const handleUpdateCondition = (index: number, field: keyof MuscleCondition, value: string) => {
    if (!editedMuscle) return
    const updatedConditions = [...editedMuscle.conditions]
    updatedConditions[index] = {
      ...updatedConditions[index],
      [field]: value,
    }
    setEditedMuscle({
      ...editedMuscle,
      conditions: updatedConditions,
    })
  }

  // Save changes
  const handleSave = async () => {
    if (!editedMuscle || !selectedMuscle) return

    setIsSaving(true)

    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // This is just for the demo - in a real app you'd update your backend
    // muscleData[selectedMuscle] = editedMuscle

    toast({
      title: "Muscle data saved",
      description: `${editedMuscle.name} data has been updated successfully.`,
      duration: 3000,
    })

    setIsSaving(false)
  }

  if (!isAdmin) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You don't have permission to edit muscles.</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Muscle Editor</h1>
        <p className="text-muted-foreground mt-2">Edit muscle information in the anatomy database</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Muscle Groups</CardTitle>
            <CardDescription>Select a muscle to edit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(muscleData).map(([id, muscle]) => (
                <Button
                  key={id}
                  variant={selectedMuscle === id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSelectMuscle(id)}
                >
                  {muscle.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {editedMuscle && selectedMuscle && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{editedMuscle.name}</h2>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="anatomy">Anatomy</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Muscle Name</Label>
                    <Input id="name" value={editedMuscle.name} onChange={(e) => handleChange("name", e.target.value)} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      value={editedMuscle.shortDescription}
                      onChange={(e) => handleChange("shortDescription", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      rows={5}
                      value={editedMuscle.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="anatomy" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Textarea
                      id="origin"
                      rows={3}
                      value={editedMuscle.origin}
                      onChange={(e) => handleChange("origin", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="insertion">Insertion</Label>
                    <Textarea
                      id="insertion"
                      rows={3}
                      value={editedMuscle.insertion}
                      onChange={(e) => handleChange("insertion", e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="functions" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Functions</CardTitle>
                      <CardDescription>The primary functions of this muscle</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editedMuscle.functions.map((func, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={func}
                            onChange={(e) => {
                              const updated = [...editedMuscle.functions]
                              updated[index] = e.target.value
                              handleChange("functions", updated)
                            }}
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveArrayItem("functions", index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add a new function"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                              handleAddArrayItem("functions", e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            const input = e.currentTarget.previousSibling as HTMLInputElement
                            if (input && input.value) {
                              handleAddArrayItem("functions", input.value)
                              input.value = ""
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Movements</CardTitle>
                      <CardDescription>Common movements involving this muscle</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editedMuscle.movements.map((movement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={movement}
                            onChange={(e) => {
                              const updated = [...editedMuscle.movements]
                              updated[index] = e.target.value
                              handleChange("movements", updated)
                            }}
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveArrayItem("movements", index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add a new movement"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                              handleAddArrayItem("movements", e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            const input = e.currentTarget.previousSibling as HTMLInputElement
                            if (input && input.value) {
                              handleAddArrayItem("movements", input.value)
                              input.value = ""
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Conditions</CardTitle>
                    <CardDescription>Related conditions and disorders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editedMuscle.conditions.map((condition, index) => (
                      <div key={index} className="space-y-2 p-3 border rounded-md relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 text-destructive"
                          onClick={() => handleRemoveCondition(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        <div className="grid gap-2">
                          <Label htmlFor={`condition-name-${index}`}>Condition Name</Label>
                          <Input
                            id={`condition-name-${index}`}
                            value={condition.name}
                            onChange={(e) => handleUpdateCondition(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`condition-description-${index}`}>Description</Label>
                          <Textarea
                            id={`condition-description-${index}`}
                            value={condition.description}
                            onChange={(e) => handleUpdateCondition(index, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Condition
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Condition</DialogTitle>
                          <DialogDescription>
                            Add a new related condition or disorder for this muscle.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="new-condition-name">Condition Name</Label>
                            <Input id="new-condition-name" placeholder="e.g., Muscle Strain" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="new-condition-description">Description</Label>
                            <Textarea
                              id="new-condition-description"
                              placeholder="Describe the condition and its relationship to this muscle..."
                              rows={4}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            onClick={() => {
                              const nameInput = document.getElementById("new-condition-name") as HTMLInputElement
                              const descInput = document.getElementById(
                                "new-condition-description",
                              ) as HTMLTextAreaElement

                              if (nameInput && descInput && nameInput.value && descInput.value) {
                                handleAddCondition({
                                  name: nameInput.value,
                                  description: descInput.value,
                                })
                                nameInput.value = ""
                                descInput.value = ""
                                // Close dialog
                                const closeButton = document.querySelector(
                                  '[data-state="open"] button[aria-label="Close"]',
                                )
                                if (closeButton) {
                                  ;(closeButton as HTMLButtonElement).click()
                                }
                              }
                            }}
                          >
                            Add Condition
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Media Assets</CardTitle>
                    <CardDescription>Images and other media for this muscle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="image">Main Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="image"
                          value={editedMuscle.image}
                          onChange={(e) => handleChange("image", e.target.value)}
                        />
                        <Button variant="outline">
                          <FileUp className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>Image Preview</Label>
                      <div className="mt-2 border rounded-md p-2 bg-muted/20">
                        <img
                          src={editedMuscle.image || "/placeholder.svg?height=200&width=400"}
                          alt={editedMuscle.name}
                          className="max-h-[300px] w-full object-contain rounded-md"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Storage Configuration</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <h4 className="font-medium">Local Storage</h4>
                            <p className="text-sm text-muted-foreground">
                              Store files in the application's file system
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <h4 className="font-medium">Vercel Blob</h4>
                            <p className="text-sm text-muted-foreground">
                              Store files in Vercel's edge-optimized storage
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <h4 className="font-medium">Supabase Storage</h4>
                            <p className="text-sm text-muted-foreground">Store files in your Supabase bucket</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <h4 className="font-medium">S3 Compatible</h4>
                            <p className="text-sm text-muted-foreground">
                              Store files in Amazon S3 or compatible service
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

