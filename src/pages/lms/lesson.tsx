import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";
import Navbar from "../_components/Navbar.tsx";

function LessonContent({ content }: { content: string }) {
  // Simple markdown-like rendering
  const lines = content.split("\n");
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold font-display">{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold font-display">{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold">{line.slice(4)}</h3>;
        if (line.startsWith("- ")) return <li key={i} className="ml-4 text-sm list-disc">{line.slice(2)}</li>;
        if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold">{line.slice(2, -2)}</p>;
        if (line.trim() === "") return <br key={i} />;
        return <p key={i} className="text-sm leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

function LessonViewerInner({ slug, lessonId }: { slug: string; lessonId: string }) {
  const navigate = useNavigate();
  const course = useQuery(api.lms.courses.getBySlug, { slug });
  const lesson = useQuery(api.lms.lessons.getById, { id: lessonId as Id<"lessons"> });
  const lessons = useQuery(
    api.lms.lessons.listByCourse,
    course ? { courseId: course._id } : "skip"
  ) ?? [];

  const progress = useQuery(
    api.lms.enrollments.myProgress,
    course ? { courseId: course._id } : "skip"
  ) ?? [];

  const markComplete = useMutation(api.lms.enrollments.markLessonComplete);
  const completedIds = new Set(progress.map((p) => p.lessonId));
  const isCompleted = completedIds.has(lessonId as Id<"lessons">);

  const currentIndex = lessons.findIndex((l: Doc<"lessons">) => l._id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (lesson === undefined || course === undefined) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (lesson === null || course === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Lesson not found</h2>
        <Link to="/lms"><Button variant="secondary">Back to LMS</Button></Link>
      </div>
    );
  }

  const handleMarkComplete = async () => {
    try {
      await markComplete({ lessonId: lesson._id, courseId: course._id });
      toast.success("Lesson marked as complete!");
      if (nextLesson) navigate(`/lms/courses/${slug}/lessons/${nextLesson._id}`);
    } catch {
      toast.error("Failed to mark complete");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto min-h-[calc(100vh-64px)]">
      {/* Lesson list sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border overflow-y-auto">
        <div className="p-4 border-b">
          <Link to={`/lms/courses/${slug}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium truncate">{course.title}</span>
          </Link>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${lessons.length > 0 ? (completedIds.size / lessons.length) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{completedIds.size}/{lessons.length} lessons</p>
        </div>
        <div className="flex-1 p-2 space-y-0.5">
          {lessons.map((l: Doc<"lessons">, idx: number) => {
            const done = completedIds.has(l._id);
            const active = l._id === lessonId;
            return (
              <button
                key={l._id}
                onClick={() => navigate(`/lms/courses/${slug}/lessons/${l._id}`)}
                className={cn(
                  "w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer",
                  active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                  done && !active && "text-muted-foreground"
                )}
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  {done ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px] font-bold text-muted-foreground">{idx + 1}</span>}
                </div>
                <span className="truncate">{l.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
          {/* Lesson header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Lesson {currentIndex + 1} of {lessons.length}</span>
              <span>·</span>
              <span className="capitalize">{lesson.type}</span>
              {lesson.duration && <><span>·</span><span>{lesson.duration} min</span></>}
            </div>
            <h1 className="font-display font-bold text-2xl">{lesson.title}</h1>
          </div>

          {/* Video */}
          {lesson.videoUrl && (
            <div className="rounded-xl overflow-hidden bg-black aspect-video">
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          )}

          {!lesson.videoUrl && lesson.type === "video" && (
            <div className="rounded-xl bg-muted flex flex-col items-center justify-center aspect-video gap-3 text-muted-foreground">
              <PlayCircle className="w-16 h-16" />
              <p className="text-sm">Video coming soon</p>
            </div>
          )}

          {/* Content */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-8">
            <LessonContent content={lesson.content} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="secondary"
              onClick={() => prevLesson && navigate(`/lms/courses/${slug}/lessons/${prevLesson._id}`)}
              disabled={!prevLesson}
              className="flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            {!isCompleted ? (
              <Button onClick={handleMarkComplete} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Mark Complete
                {nextLesson && " & Next"}
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => nextLesson && navigate(`/lms/courses/${slug}/lessons/${nextLesson._id}`)}
                disabled={!nextLesson}
                className="flex items-center gap-1.5"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LessonViewerPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  return (
    <>
      <Navbar />
      <AuthLoading>
        <div className="max-w-4xl mx-auto p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AuthLoading>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-xl font-semibold">Sign in to view lessons</h2>
          <SignInButton />
        </div>
      </Unauthenticated>
      <Authenticated>
        <LessonViewerInner slug={slug ?? ""} lessonId={lessonId ?? ""} />
      </Authenticated>
    </>
  );
}
