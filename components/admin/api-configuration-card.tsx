"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { useEnvironmentStore, type ApiConfig } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface ApiConfigurationCardProps {
  apiName: string
  title: string
  description: string
  fields: {
    key: string
    label: string
    type: "text" | "password" | "url"
    placeholder?: string
    required?: boolean
  }[]
  testConnection?: (config: ApiConfig) => Promise<boolean>
}

export function ApiConfigurationCard({
  apiName,
  title,
  description,
  fields,
  testConnection,
}: ApiConfigurationCardProps) {
  const { getApiConfig, updateApiConfig, resetApiConfig } = useEnvironmentStore()
  const config = getApiConfig(apiName)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<boolean | null>(null)
  const { toast } = useToast()

  const handleToggle = (enabled: boolean) => {
    updateApiConfig(apiName, { enabled })
    if (!enabled) {
      setTestResult(null)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    if (key.includes(".")) {
      // Handle nested properties (e.g., additionalConfig.modelId)
      const [parent, child] = key.split(".")
      updateApiConfig(apiName, {
        [parent]: {
          ...(config[parent as keyof ApiConfig] as Record<string, any>),
          [child]: value,
        },
      })
    } else {
      // Handle top-level properties
      updateApiConfig(apiName, { [key]: value })
    }
    // Reset test result when configuration changes
    setTestResult(null)
  }

  const handleTestConnection = async () => {
    if (!testConnection) return

    setIsTesting(true)
    setTestResult(null)

    try {
      const result = await testConnection(config)
      setTestResult(result)
      toast({
        title: result ? "Connection successful" : "Connection failed",
        description: result
          ? `Successfully connected to ${title} API`
          : `Failed to connect to ${title} API. Please check your configuration.`,
        variant: result ? "default" : "destructive",
      })
    } catch (error) {
      console.error(`Error testing ${apiName} connection:`, error)
      setTestResult(false)
      toast({
        title: "Connection failed",
        description: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsTesting(false)
    }
  }

  const handleReset = () => {
    resetApiConfig(apiName)
    setTestResult(null)
    toast({
      title: "Configuration reset",
      description: `${title} API configuration has been reset to default values.`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Switch checked={config.enabled} onCheckedChange={handleToggle} aria-label={`Enable ${title} API`} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={`${apiName}-${field.key}`}>{field.label}</Label>
            <Input
              id={`${apiName}-${field.key}`}
              type={field.type}
              placeholder={field.placeholder}
              value={
                field.key.includes(".")
                  ? (config as any)[field.key.split(".")[0]]?.[field.key.split(".")[1]] || ""
                  : (config as any)[field.key] || ""
              }
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              disabled={!config.enabled}
              required={field.required}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          {testConnection && (
            <Button variant="outline" onClick={handleTestConnection} disabled={!config.enabled || isTesting}>
              {isTesting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
          )}
          {testResult !== null && (
            <span className="flex items-center">
              {testResult ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">Connected</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">Failed</span>
                </>
              )}
            </span>
          )}
        </div>
        <Button variant="ghost" onClick={handleReset} disabled={!config.enabled}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}

