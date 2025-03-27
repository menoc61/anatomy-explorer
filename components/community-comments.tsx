"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, MessageSquare, Flag, MoreHorizontal, Send, AlertTriangle, Check } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock community comments
const initialComments = [
  {
    id: "comment-1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://avatar.vercel.sh/sarah@example.com",
      role: "Medical Student",
    },
    content:
      "The 3D model is incredibly helpful for understanding the relationship between different muscle groups. I've been using this to study for my anatomy exams!",
    likes: 24,
    isLiked: false,
    replies: 3,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reported: false,
  },
  {
    id: "comment-2",
    user: {
      name: "Dr. Michael Chen",
      avatar: "https://avatar.vercel.sh/drchen@example.com",
      role: "Physiotherapist",
    },
    content:
      "As a physiotherapist, I find this tool extremely valuable for explaining muscle functions to my patients. The visual representation makes it much easier for them to understand their conditions and treatment plans.",
    likes: 42,
    isLiked: true,
    replies: 5,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    reported: false,
  },
  {
    id: "comment-3",
    user: {
      name: "Emma Rodriguez",
      avatar: "https://avatar.vercel.sh/emma@example.com",
      role: "Fitness Trainer",
    },
    content:
      "I've been using this with my clients to show them which muscles they're targeting during different exercises. It's been a game-changer for helping them understand proper form and muscle engagement!",
    likes: 18,
    isLiked: false,
    replies: 2,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    reported: false,
  },
]

export default function CommunityComments() {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportedComment, setReportedComment] = useState<string | null>(null)
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const isLiked = !comment.isLiked
          return {
            ...comment,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1,
            isLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to add a comment",
        variant: "destructive",
      })
      return
    }

    const newCommentObj = {
      id: `comment-${Date.now()}`,
      user: {
        name: user.name,
        avatar: `https://avatar.vercel.sh/${user.email}`,
        role: user.role === "admin" ? "Administrator" : "Member",
      },
      content: newComment,
      likes: 0,
      isLiked: false,
      replies: 0,
      createdAt: new Date().toISOString(),
      reported: false,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been added to the community discussion",
    })
  }

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to reply to comments",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would add a reply to the comment
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies + 1,
          }
        }
        return comment
      }),
    )

    setReplyContent("")
    setReplyingTo(null)

    toast({
      title: "Reply added",
      description: "Your reply has been added to the comment",
    })
  }

  const handleReport = () => {
    if (!reportReason.trim() || !reportedComment) return

    setComments(
      comments.map((comment) => {
        if (comment.id === reportedComment) {
          return {
            ...comment,
            reported: true,
          }
        }
        return comment
      }),
    )

    setReportReason("")
    setReportedComment(null)

    toast({
      title: "Comment reported",
      description: "Thank you for helping keep our community safe. We'll review this comment.",
    })
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId))

    toast({
      title: "Comment deleted",
      description: "The comment has been removed from the discussion",
    })
  }

  const handleApproveComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            reported: false,
          }
        }
        return comment
      }),
    )

    toast({
      title: "Comment approved",
      description: "The comment has been approved and will remain visible",
    })
  }

  // Filter reported comments for admin view
  const reportedComments = comments.filter((comment) => comment.reported)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Community Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdmin && (
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Comments</TabsTrigger>
              <TabsTrigger value="reported" className="relative">
                Reported
                {reportedComments.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {reportedComments.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">{/* Regular comments view */}</TabsContent>

            <TabsContent value="reported">
              {reportedComments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No reported comments to review</div>
              ) : (
                <div className="space-y-6">
                  {reportedComments.map((comment) => (
                    <div key={comment.id} className="border border-red-200 bg-red-50 rounded-md p-4">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.user.avatar} />
                          <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{comment.user.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{comment.user.role}</span>
                                <span>•</span>
                                <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                              </div>
                            </div>
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Reported
                            </Badge>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleApproveComment(comment.id)}>
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                              <Flag className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Add comment form */}
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user ? `https://avatar.vercel.sh/${user.email}` : undefined} />
            <AvatarFallback>{user ? user.name.charAt(0).toUpperCase() : "G"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Share your thoughts with the community..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-6">
          {(!isAdmin || (isAdmin && !reportedComments.length)) &&
            comments
              .filter((c) => !c.reported || isAdmin)
              .map((comment) => (
                <div
                  key={comment.id}
                  className={`border-b pb-6 last:border-0 last:pb-0 ${comment.reported ? "bg-red-50 p-4 rounded-md border border-red-200" : ""}`}
                >
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{comment.user.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{comment.user.role}</span>
                            <span>•</span>
                            <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {isAdmin ? (
                              <>
                                <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)}>
                                  <Flag className="h-4 w-4 mr-2" />
                                  Delete Comment
                                </DropdownMenuItem>
                              </>
                            ) : (
                              <>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setReportedComment(comment.id)
                                    setReportReason("")
                                  }}
                                >
                                  <Flag className="h-4 w-4 mr-2" />
                                  Report
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                      <div className="mt-3 flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1 ${comment.isLiked ? "text-primary" : ""}`}
                          onClick={() => handleLike(comment.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{comment.replies}</span>
                        </Button>
                      </div>

                      {replyingTo === comment.id && (
                        <div className="mt-4 flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user ? `https://avatar.vercel.sh/${user.email}` : undefined} />
                            <AvatarFallback>{user ? user.name.charAt(0).toUpperCase() : "G"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder={`Reply to ${comment.user.name}...`}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-[60px] resize-none"
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                Cancel
                              </Button>
                              <Button size="sm" onClick={() => handleReply(comment.id)} disabled={!replyContent.trim()}>
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>

      {/* Report Dialog */}
      <Dialog open={reportedComment !== null} onOpenChange={(open) => !open && setReportedComment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Comment</DialogTitle>
            <DialogDescription>
              Please let us know why you're reporting this comment. This will help our moderators review it
              appropriately.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            placeholder="Reason for reporting..."
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="min-h-[100px]"
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setReportedComment(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReport} disabled={!reportReason.trim()}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

