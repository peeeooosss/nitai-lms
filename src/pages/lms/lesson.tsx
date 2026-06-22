import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { useAuth } from "@/lib/auth.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import Navbar from "../_components/Navbar.tsx";

function LessonContent({ content }: { content: string }) {
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
  const queryClient = useQueryClient();

  const { data: course } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => api.get<any>(`/api/courses/${slug}`),
  });

  const { data: lesson } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => api.get<any>(`/api/lessons/${lessonId}`),
    enabled: !!lessonId,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", course?.id],
    queryFn: () => api.get<any[]>(`/api/lessons/course/${course!.id}`),
    enabled: !!course,
  });

  const { data: progress } = useQuery({
    queryKey: ["progress", course?.id],
    queryFn: () => api.get<any>(`/api/enrollments/progress/${course!.id}`),
    enabled: !!course,
  });

  const completeMutation = useMutation({
    mutationFn: () => api.post("/api/enrollments/complete-lesson", { lessonId, courseId: course!.id }),
    onSuccess: () => {
      toast.success("Lesson marked as complete!");
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      if (nextLesson) navigate(`/lms/courses/${slug}/lessons/${nextLesson.id}`);
    },
    onError: () => toast.error("Failed to mark complete"),
  });

  const completedIds = new Set(progress?.lessons?.filter((l: any) => l.completed).map((l: any) => l.id) ?? []);
  const isCompleted = lesson ? completedIds.has(lesson.id) : false;
  const currentIndex = lessons.findIndex((l: any) => l.id === lessonId);
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

  if (!lesson || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Lesson not found</h2>
        <Link to="/lms"><Button variant="secondary">Back to LMS</Button></Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto min-h-[calc(100vh-64px)]">
      <aside className="hidden md:flex flex-col w-72 border-r border-border overflow-y-auto">
        <div className="p-4 border-b">
          <Link to={`/lms/courses/${slug}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium truncate">{course.title}</span>
          </Link>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${lessons.length > 0 ? (completedIds.size / lessons.length) * 100 : 0}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{completedIds.size}/{lessons.length} lessons</p>
        </div>
        <div className="flex-1 p-2 space-y-0.5">
          {lessons.map((l: any, idx: number) => {
            const done = completedIds.has(l.id);
            const active = l.id === lessonId;
            return (
              <button
                key={l.id}
                onClick={() => navigate(`/lms/courses/${slug}/lessons/${l.id}`)}
                className={cn(
                  "w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer",
                  active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                  done && !active && "text-muted-foreground"
                )}
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px] font-bold text-muted-foreground">{idx + 1}</span>
                  )}
                </div>
                <span className="truncate">{l.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Lesson {currentIndex + 1} of {lessons.length}</span>
              <span>·</span>
              <span className="capitalize">{lesson.type}</span>
              {lesson.duration && <><span>·</span><span>{lesson.duration} min</span></>}
            </div>
            <h1 className="font-display font-bold text-2xl">{lesson.title}</h1>
          </div>

          {lesson.videoUrl && (
            <div className="rounded-xl overflow-hidden bg-black aspect-video">
              <iframe src={lesson.videoUrl} className="w-full h-full" allowFullScreen title={lesson.title} />
            </div>
          )}

          {!lesson.videoUrl && lesson.type === "video" && (
            <div className="rounded-xl bg-muted flex flex-col items-center justify-center aspect-video gap-3 text-muted-foreground">
              <PlayCircle className="w-16 h-16" />
              <p className="text-sm">Video coming soon</p>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-5 md:p-8">
            <LessonContent content={lesson.content} />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="secondary"
              onClick={() => prevLesson && navigate(`/lms/courses/${slug}/lessons/${prevLesson.id}`)}
              disabled={!prevLesson}
              className="flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            {!isCompleted ? (
              <Button onClick={() => completeMutation.mutate()} disabled={completeMutation.isPending} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Mark Complete{nextLesson ? " & Next" : ""}
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => nextLesson && navigate(`/lms/courses/${slug}/lessons/${nextLesson.id}`)}
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
  const { user, isLoading } = useAuth();

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : !user ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-xl font-semibold">Sign in to view lessons</h2>
          <SignInButton />
        </div>
      ) : (
        <LessonViewerInner slug={slug ?? ""} lessonId={lessonId ?? ""} />
      )}
    </>
  );
}
