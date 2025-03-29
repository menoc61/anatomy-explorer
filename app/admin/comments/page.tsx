"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  MessageSquare,
  Flag,
  CheckCircle2,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  ThumbsUp,
  Reply,
  MoreHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Mock comment data
const mockComments = [
  {
    id: "comment-1",
    content:
      "The 3D model is incredibly helpful for understanding the relationship between different muscle groups. I've been using this to study for my anatomy exams!",
    user: {
      id: "user-1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "https://avatar.vercel.sh/sarah@ example.com",
      role: "Medical Student",
    },
    status: "approved",
    likes: 24,
    replies: 3,
    createdAt: "2023-10-15T14:30:00Z",
    reportCount: 0,
    reportReason: null,
    muscle: "Biceps Brachii",
    page: "/muscles/biceps-brachii",
  },
  {
    id: "comment-2",
    content:
      "As a physiotherapist, I find this tool extremely valuable for explaining muscle functions to my patients. The visual representation makes it much easier for them to understand their conditions and treatment plans.",
    user: {
      id: "user-2",
      name: "Dr. Michael Chen",
      email: "drchen@example.com",
      avatar: "https://avatar.vercel.sh/drchen@example.com",
      role: "Physiotherapist",
    },
    status: "approved",
    likes: 42,
    replies: 5,
    createdAt: "2023-10-10T09:15:00Z",
    reportCount: 0,
    reportReason: null,
    muscle: "Quadriceps",
    page: "/muscles/quadriceps",
  },
  {
    id: "comment-3",
    content:
      "I've been using this with my clients to show them which muscles they're targeting during different exercises. It's been a game-changer for helping them understand proper form and muscle engagement!",
    user: {
      id: "user-3",
      name: "Emma Rodriguez",
      email: "emma@example.com",
      avatar: "https://avatar.vercel.sh/emma@example.com",
      role: "Fitness Trainer",
    },
    status: "approved",
    likes: 18,
    replies: 2,
    createdAt: "2023-10-05T16:45:00Z",
    reportCount: 0,
    reportReason: null,
    muscle: "Abdominal Muscles",
    page: "/muscles/abdominals",
  },
  {
    id: "comment-4",
    content:
      "This is completely wrong information. The biceps doesn't attach there at all. This site is spreading misinformation.",
    user: {
      id: "user-4",
      name: "Anonymous User",
      email: "anon123@example.com",
      avatar: "https://avatar.vercel.sh/anon123@example.com",
      role: "User",
    },
    status: "flagged",
    likes: 2,
    replies: 1,
    createdAt: "2023-10-16T11:20:00Z",
    reportCount: 3,
    reportReason: "Inaccurate or misleading information",
    muscle: "Biceps Brachii",
    page: "/muscles/biceps-brachii",
  },
  {
    id: "comment-5",
    content:
      "Check out my website for supplements that will help you build these muscles faster! [link removed]",
    user: {
      id: "user-5",
      name: "John Smith",
      email: "john@example.com",
      avatar: "https://avatar.vercel.sh/john@example.com",
      role: "User",
    },
    status: "flagged",
    likes: 0,
    replies: 0,
    createdAt: "2023-10-17T08:10:00Z",
    reportCount: 5,
    reportReason: "Spam or advertising",
    muscle: "Deltoid Muscle",
    page: "/muscles/deltoids",
  },
  {
    id: "comment-6",
    content:
      "I think there's a small error in the description of the origin of this muscle. According to Gray's Anatomy, it should be slightly different.",
    user: {
      id: "user-6",
      name: "Dr. Lisa Wong",
      email: "lisa@example.com",
      avatar: "https://avatar.vercel.sh/lisa@example.com",
      role: "Anatomist",
    },
    status: "pending",
    likes: 0,
    replies: 0,
    createdAt: "2023-10-18T10:05:00Z",
    reportCount: 0,
    reportReason: null,
    muscle: "Pectoralis Major",
    page: "/muscles/pectoralis-major",
  },
  {
    id: "comment-7",
    content:
      "The animation for this muscle's movement isn't working properly on my iPad. Can you please fix it?",
    user: {
      id: "user-7",
      name: "Alex Thompson",
      email: "alex@example.com",
      avatar: "https://avatar.vercel.sh/alex@example.com",
      role: "Student",
    },
    status: "pending",
    likes: 1,
    replies: 0,
    createdAt: "2023-10-18T14:22:00Z",
    reportCount: 0,
    reportReason: null,
    muscle: "Latissimus Dorsi",
    page: "/muscles/latissimus-dorsi",
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState(mockComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter comments based on search query and filters
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.muscle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;
    const matchesMuscle =
      muscleFilter === "all" ||
      comment.muscle.toLowerCase().includes(muscleFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesMuscle;
  });

  const handleApproveComment = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              status: "approved",
              reportCount: 0,
              reportReason: null,
            }
          : comment
      )
    );

    toast({
      title: "Comment approved",
      description: "The comment has been approved and is now visible to users.",
    });
  };

  const handleRejectComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId));

    toast({
      title: "Comment removed",
      description: "The comment has been permanently removed.",
    });
  };

  const handleReplyToComment = (commentId: string) => {
    if (!replyContent.trim()) return;

    // In a real app, this would add a reply to the comment
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies + 1,
          };
        }
        return comment;
      })
    );

    setReplyContent("");
    setSelectedComment(null);
    setIsDialogOpen(false);

    toast({
      title: "Reply added",
      description: "Your reply has been added to the comment.",
    });
  };

  const toggleExpandComment = (commentId: string) => {
    if (expandedComment === commentId) {
      setExpandedComment(null);
    } else {
      setExpandedComment(commentId);
    }
  };

  const openReplyDialog = (comment: any) => {
    setSelectedComment(comment);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600"
          >
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Flag className="h-3 w-3" />
            Flagged
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Reply Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reply to comment</DialogTitle>
            <DialogDescription>
              Replying to comment by {selectedComment?.user.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm">{selectedComment?.content}</p>
            </div>
            <Textarea
              placeholder="Enter your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => handleReplyToComment(selectedComment?.id)}
              disabled={!replyContent.trim()}
            >
              Post Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Community Comments
          </h1>
          <p className="text-muted-foreground">
            Manage and moderate user comments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Comment Management</CardTitle>
          <CardDescription>
            Review, approve, and moderate community comments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="flagged"
                  className="flex items-center gap-1"
                >
                  <Flag className="h-4 w-4" />
                  Flagged
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="flex items-center gap-1"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Pending
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search comments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select value={muscleFilter} onValueChange={setMuscleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Muscle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Muscles</SelectItem>
                    <SelectItem value="biceps">Biceps</SelectItem>
                    <SelectItem value="quadriceps">Quadriceps</SelectItem>
                    <SelectItem value="abdominals">Abdominals</SelectItem>
                    <SelectItem value="deltoids">Deltoids</SelectItem>
                    <SelectItem value="pectoralis">Pectoralis</SelectItem>
                    <SelectItem value="latissimus">Latissimus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredComments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No comments found matching your filters
                  </div>
                ) : (
                  filteredComments.map((comment) => (
                    <Card
                      key={comment.id}
                      className={`border ${
                        comment.status === "flagged"
                          ? "border-red-200 bg-red-50"
                          : comment.status === "pending"
                            ? "border-amber-200 bg-amber-50"
                            : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.user.avatar} />
                                <AvatarFallback>
                                  {comment.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="font-medium">
                                    {comment.user.name}
                                  </h4>
                                  <Badge variant="outline">
                                    {comment.user.role}
                                  </Badge>
                                  {getStatusBadge(comment.status)}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      {new Date(
                                        comment.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{comment.likes}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Reply className="h-3 w-3" />
                                    <span>{comment.replies}</span>
                                  </div>
                                  <span>•</span>
                                  <Link
                                    href={comment.page}
                                    className="hover:underline"
                                  >
                                    {comment.muscle}
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleExpandComment(comment.id)}
                              >
                                {expandedComment === comment.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => openReplyDialog(comment)}
                                  >
                                    <Reply className="mr-2 h-4 w-4" />
                                    Reply
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/admin/users?id=${comment.user.id}`}
                                    >
                                      <User className="mr-2 h-4 w-4" />
                                      View User
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {comment.status !== "approved" && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleApproveComment(comment.id)
                                      }
                                    >
                                      <CheckCircle2 className="mr-2 h-4 w-4" />
                                      Approve
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                      handleRejectComment(comment.id)
                                    }
                                  >
                                    <X className="mr-2 h-4 w-4" />
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div
                            className={
                              expandedComment === comment.id
                                ? ""
                                : "line-clamp-2"
                            }
                          >
                            {comment.content}
                          </div>

                          {comment.status === "flagged" && (
                            <div className="bg-red-100 p-3 rounded-md text-sm">
                              <div className="font-medium flex items-center gap-1">
                                <Flag className="h-4 w-4" />
                                Reported {comment.reportCount} times
                              </div>
                              <p className="mt-1">
                                Reason: {comment.reportReason}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {comment.status === "flagged" ||
                            comment.status === "pending" ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleApproveComment(comment.id)
                                  }
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleRejectComment(comment.id)
                                  }
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Remove
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openReplyDialog(comment)}
                              >
                                <Reply className="mr-2 h-4 w-4" />
                                Reply
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="flagged">
              <div className="space-y-4">
                {filteredComments.filter((c) => c.status === "flagged")
                  .length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No flagged comments found
                  </div>
                ) : (
                  filteredComments
                    .filter((c) => c.status === "flagged")
                    .map((comment) => (
                      <Card
                        key="comment.id"
                        className="border border-red-200 bg-red-50"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={comment.user.avatar} />
                                  <AvatarFallback>
                                    {comment.user.name.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="font-medium">
                                      {comment.user.name}
                                    </h4>
                                    <Badge variant="outline">
                                      {comment.user.role}
                                    </Badge>
                                    {getStatusBadge(comment.status)}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>
                                        {new Date(
                                          comment.createdAt
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <span>•</span>
                                    <Link
                                      href={comment.page}
                                      className="hover:underline"
                                    >
                                      {comment.muscle}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>{comment.content}</div>

                            <div className="bg-red-100 p-3 rounded-md text-sm">
                              <div className="font-medium flex items-center gap-1">
                                <Flag className="h-4 w-4" />
                                Reported {comment.reportCount} times
                              </div>

                              <p className="mt-1">
                                Reason: {comment.reportReason}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApproveComment(comment.id)}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectComment(comment.id)}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
