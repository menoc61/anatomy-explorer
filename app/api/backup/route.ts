// app/api/backup/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { dump } from "js-yaml"
import { glob } from "glob"
import path from "path"
import fs from "fs/promises"
import { fileURLToPath } from "url"

export const maxDuration = 300 // This function can take up to 5 minutes

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const projectRoot = path.join(__dirname, "..", "..", "..", "..") // Adjust based on your project structure
    const dataDir = path.join(projectRoot, "data")

    // Define the files/directories to backup
    const backupPaths = [
      { src: path.join(dataDir, "prompts"), dest: "prompts" },
      { src: path.join(dataDir, "settings.json"), dest: "settings.json" },
      { src: path.join(dataDir, "custom_commands.json"), dest: "custom_commands.json" },
      { src: path.join(dataDir, "custom_functions.json"), dest: "custom_functions.json" },
    ]

    const backupData: { [key: string]: any } = {}

    for (const backupPath of backupPaths) {
      if (!backupPath.src) {
        console.warn(`Skipping backup for ${backupPath.dest} due to missing source path.`)
        continue
      }

      try {
        const stats = await fs.stat(backupPath.src)

        if (stats.isDirectory()) {
          // Backup all YAML files in the directory
          const yamlFiles = await glob(path.join(backupPath.src, "*.yaml"))
          const dirData: { [key: string]: any } = {}

          for (const yamlFile of yamlFiles) {
            const fileName = path.basename(yamlFile, ".yaml")
            const fileContent = await fs.readFile(yamlFile, "utf-8")
            dirData[fileName] = fileContent
          }

          backupData[backupPath.dest] = dirData
        } else {
          // Backup the single file
          const fileContent = await fs.readFile(backupPath.src, "utf-8")
          backupData[backupPath.dest] = fileContent
        }
      } catch (error: any) {
        console.error(`Error backing up ${backupPath.src}: ${error.message}`)
      }
    }

    // Convert backup data to YAML format
    const yamlOutput = dump(backupData)

    // Return the YAML data as a downloadable file
    const response = new NextResponse(yamlOutput, {
      status: 200,
      headers: {
        "Content-Type": "text/yaml",
        "Content-Disposition": 'attachment; filename="backup.yaml"',
      },
    })

    return response
  } catch (error: any) {
    console.error("Backup failed:", error)
    return NextResponse.json({ error: "Backup failed" }, { status: 500 })
  }
}

