"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Loader2, Download } from "lucide-react"
import {AdminSidebar} from "@/components/admin/admin-sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for user growth prediction
const userGrowthData = [
  { month: "Jan", actual: 120, predicted: 125 },
  { month: "Feb", actual: 145, predicted: 150 },
  { month: "Mar", actual: 180, predicted: 185 },
  { month: "Apr", actual: 210, predicted: 220 },
  { month: "May", actual: 250, predicted: 260 },
  { month: "Jun", actual: 290, predicted: 310 },
  { month: "Jul", actual: 320, predicted: 350 },
  { month: "Aug", actual: 340, predicted: 380 },
  { month: "Sep", actual: null, predicted: 410 },
  { month: "Oct", actual: null, predicted: 450 },
  { month: "Nov", actual: null, predicted: 490 },
  { month: "Dec", actual: null, predicted: 530 },
]

// Mock data for content engagement prediction
const contentEngagementData = [
  { category: "Upper Body", actual: 85, predicted: 90 },
  { category: "Lower Body", actual: 70, predicted: 75 },
  { category: "Core", actual: 60, predicted: 65 },
  { category: "Head & Neck", actual: 40, predicted: 45 },
]

// Mock data for prediction logs
const predictionLogs = [
  {
    id: "pred_1",
    type: "User Growth",
    timestamp: "2023-07-15 14:30:22",
    accuracy: "92%",
    status: "success",
  },
  {
    id: "pred_2",
    type: "Content Engagement",
    timestamp: "2023-07-14 09:15:45",
    accuracy: "88%",
    status: "success",
  },
  {
    id: "pred_3",
    type: "Revenue Forecast",
    timestamp: "2023-07-13 16:45:10",
    accuracy: "78%",
    status: "warning",
  },
  {
    id: "pred_4",
    type: "User Retention",
    timestamp: "2023-07-12 11:20:33",
    accuracy: "85%",
    status: "success",
  },
  {
    id: "pred_5",
    type: "Feature Usage",
    timestamp: "2023-07-11 13:55:27",
    accuracy: "65%",
    status: "error",
  },
]

export default function PredictionsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [timeRange, setTimeRange] = useState("year")
  const [predictionType, setPredictionType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter prediction logs based on search term and filters
  const filteredLogs = predictionLogs.filter(
    (log) =>
      (log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (predictionType === "all" || log.type.toLowerCase().includes(predictionType.toLowerCase())),
  )

  const handleRunPrediction = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Prediction completed",
        description: "The prediction model has been run successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run prediction model. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data is being exported. It will be downloaded as a CSV file shortly.",
    })

    // In a real app, this would trigger an actual download
    setTimeout(() => {
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent("Prediction data"))
      element.setAttribute("download", "prediction_data.csv")
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }, 1000)
  }

  return (
    <AdminSidebar>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Predictions & Analytics</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleRunPrediction} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Prediction Model"
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="logs">Prediction Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Prediction</CardTitle>
                  <CardDescription>Actual vs. predicted user growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        actual: {
                          label: "Actual Users",
                          color: "hsl(var(--chart-1))",
                        },
                        predicted: {
                          label: "Predicted Users",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="var(--color-actual)"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="var(--color-predicted)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Engagement Prediction</CardTitle>
                  <CardDescription>Actual vs. predicted engagement by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        actual: {
                          label: "Actual Engagement",
                          color: "hsl(var(--chart-1))",
                        },
                        predicted: {
                          label: "Predicted Engagement",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contentEngagementData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="actual" fill="var(--color-actual)" />
                          <Bar dataKey="predicted" fill="var(--color-predicted)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Summary</CardTitle>
                <CardDescription>Key insights from the prediction model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">User Growth</h3>
                    <p className="text-muted-foreground">
                      Based on current trends, we predict a{" "}
                      <span className="font-medium text-green-600">35% increase</span> in user base over the next
                      quarter. The model suggests focusing on content for upper body anatomy to maximize growth.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Content Engagement</h3>
                    <p className="text-muted-foreground">
                      Upper body content continues to be the most engaging category. We recommend{" "}
                      <span className="font-medium">expanding the core muscles section</span> as it shows the highest
                      potential for growth.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Revenue Forecast</h3>
                    <p className="text-muted-foreground">
                      With the projected user growth, revenue is expected to increase by{" "}
                      <span className="font-medium text-green-600">28%</span> in the next quarter. Premium subscription
                      conversion rate is predicted to improve with the addition of new content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Detailed Analysis</CardTitle>
                    <CardDescription>In-depth prediction metrics and analysis</CardDescription>
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">User Demographics</h3>
                    <p className="text-muted-foreground mb-4">Predicted changes in user demographics over time</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">65%</div>
                        <div className="text-sm text-muted-foreground">Medical Students</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">25%</div>
                        <div className="text-sm text-muted-foreground">Healthcare Professionals</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="text-2xl font-bold">10%</div>
                        <div className="text-sm text-muted-foreground">Fitness Enthusiasts</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Feature Usage Prediction</h3>
                    <p className="text-muted-foreground mb-4">Predicted usage of key features in the next quarter</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-32">3D Models</div>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full progress-bar-85"></div>
                        </div>
                        <div className="w-12 text-right">85%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32">Videos</div>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full progress-bar-70"></div>
                        </div>
                        <div className="w-12 text-right">70%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32">Comments</div>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full progress-bar-45"></div>
                        </div>
                        <div className="w-12 text-right">45%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32">Downloads</div>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full progress-bar-60"></div>
                        </div>
                        <div className="w-12 text-right">60%</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Retention Analysis</h3>
                    <p className="text-muted-foreground mb-4">Predicted user retention rates by subscription type</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Basic Plan</div>
                        <div className="text-2xl font-bold text-amber-500">65%</div>
                        <div className="text-xs text-muted-foreground">30-day retention</div>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Professional Plan</div>
                        <div className="text-2xl font-bold text-green-500">82%</div>
                        <div className="text-xs text-muted-foreground">30-day retention</div>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Educational Plan</div>
                        <div className="text-2xl font-bold text-blue-500">94%</div>
                        <div className="text-xs text-muted-foreground">30-day retention</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Prediction Logs</CardTitle>
                    <CardDescription>History of prediction model runs and their results</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-[200px]"
                    />
                    <Select value={predictionType} onValueChange={setPredictionType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="user">User Growth</SelectItem>
                        <SelectItem value="content">Content Engagement</SelectItem>
                        <SelectItem value="revenue">Revenue Forecast</SelectItem>
                        <SelectItem value="retention">User Retention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.id}</TableCell>
                          <TableCell>{log.type}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.accuracy}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.status === "success"
                                  ? "default"
                                  : log.status === "warning"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No prediction logs found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminSidebar>
  )
}

