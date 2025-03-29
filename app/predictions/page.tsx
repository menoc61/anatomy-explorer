"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, BarChart3, LineChart, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart"

const chartConfig = {
  predictions: {
    label: "Predictions",
    color: "#3b82f6"
  },
  accuracy: {
    label: "Accuracy (%)", 
    color: "#10b981"
  },
  users: {
    label: "Users",
    color: "#8b5cf6"
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B', '#4FD1C5', '#F687B3'];

export default function PredictionsPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [dateRange, setDateRange] = useState("30")
  const [chartType, setChartType] = useState("line")

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="container max-w-6xl py-10">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground mb-4">You need admin access to view this page.</p>
          <Button asChild>
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Sample data for charts
  const usageData = [
    { date: "Jan", users: 120, predictions: 450, accuracy: 78 },
    { date: "Feb", users: 150, predictions: 520, accuracy: 82 },
    { date: "Mar", users: 180, predictions: 610, accuracy: 85 },
    { date: "Apr", users: 220, predictions: 680, accuracy: 83 },
    { date: "May", users: 280, predictions: 720, accuracy: 87 },
    { date: "Jun", users: 310, predictions: 790, accuracy: 89 },
    { date: "Jul", users: 350, predictions: 850, accuracy: 91 },
    { date: "Aug", users: 370, predictions: 920, accuracy: 90 },
    { date: "Sep", users: 390, predictions: 980, accuracy: 92 },
    { date: "Oct", users: 410, predictions: 1050, accuracy: 93 },
    { date: "Nov", users: 430, predictions: 1120, accuracy: 94 },
    { date: "Dec", users: 450, predictions: 1200, accuracy: 95 },
  ]

  const muscleData = [
    { name: "Biceps", value: 25 },
    { name: "Quadriceps", value: 20 },
    { name: "Deltoids", value: 15 },
    { name: "Pectorals", value: 12 },
    { name: "Latissimus", value: 10 },
    { name: "Hamstrings", value: 8 },
    { name: "Triceps", value: 6 },
    { name: "Other", value: 4 },
  ]

  const accuracyByMuscle = [
    { muscle: "Biceps", accuracy: 95 },
    { muscle: "Quadriceps", accuracy: 92 },
    { muscle: "Deltoids", accuracy: 88 },
    { muscle: "Pectorals", accuracy: 91 },
    { muscle: "Latissimus", accuracy: 87 },
    { muscle: "Hamstrings", accuracy: 89 },
    { muscle: "Triceps", accuracy: 93 },
    { muscle: "Abdominals", accuracy: 90 },
  ]

  // Filter data based on date range
  const getFilteredData = () => {
    const days = Number.parseInt(dateRange)
    if (days === 365) {
      return usageData
    } else {
      const months = Math.ceil(days / 30)
      return usageData.slice(-months)
    }
  }

  const filteredData = getFilteredData()

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Prediction Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">Total Predictions</p>
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">12,450</span>
              </div>
              <p className="text-xs text-green-500">+12.5% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">Average Accuracy</p>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">92.3%</span>
              </div>
              <p className="text-xs text-green-500">+2.1% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">4,320</span>
              </div>
              <p className="text-xs text-green-500">+8.3% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">Predictions Per User</p>
              <div className="flex items-center">
                <LineChart className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">2.8</span>
              </div>
              <p className="text-xs text-green-500">+0.3 from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Prediction Trends</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="180">Last 6 months</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>Prediction volume and accuracy over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "line" ? (
                      <RechartsLineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend content={<ChartLegend />} />
                        <Line
                          type="monotone"
                          dataKey="predictions"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#10b981"
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    ) : (
                      <RechartsBarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend content={<ChartLegend />} />
                        <Bar dataKey="predictions" fill="#3b82f6" />
                        <Bar dataKey="accuracy" fill="#10b981" />
                      </RechartsBarChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Predictions by Muscle</CardTitle>
              <CardDescription>Distribution of predictions across muscle groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={muscleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {muscleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy by Muscle</CardTitle>
          <CardDescription>Accuracy rates for different muscle groups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={accuracyByMuscle}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="muscle" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend content={<ChartLegend />} />
                  <Bar dataKey="accuracy" fill="#3b82f6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
