// app/api/comments/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

const postSchema = z.object({
  text: z.string().min(1),
  postId: z.string().min(1),
})

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const postId = url.searchParams.get("postId")

    if (!postId) {
      return new NextResponse("Missing postId", { status: 400 })
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { text, postId } = postSchema.parse(body)

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request", { status: 400 })
    }

    return new NextResponse("Something went wrong", { status: 500 })
  }
}

