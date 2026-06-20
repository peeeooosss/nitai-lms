import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import {
  Clock, BookOpen, GraduationCap, ChevronLeft, PlayCircle,
  FileText, Zap, Wrench, CheckCircle2, Lock
} from "lucide-react";
import { LAB_MODULES } from "./_components/lms-constants.ts";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";
import Navbar from "../_components/Navbar.tsx";

const LESSON_TYPE_ICON: Record<string, React.ReactNode> = {
  video: <PlayCircle className="w-4 h-4 text-blue-500" />,
  reading: <FileText className="w-4 h-4 text-green-500" />,
  quiz: <Zap className="w-4 h-4 text-yellow-500" />,
  activity: <Wrench className="w-4 h-4 text-orange-500" />,
};

function CourseDetailInner({ slug }: { slug: string }) {
  const course = useQuery(api.lms.courses.getBySlug, { slug });
  const navigate = useNavigate();

  const lessons = useQuery(
    api.lms.lessons.listByCourse,
    course ? { courseId: course._id } : "skip"
  ) ?? [];

  const isEnrolled = useQuery(
    api.lms.enrollments.isEnrolled,
    course ? { courseId: course._id } : "skip"
  );

  const progress = useQuery(
    api.lms.enrollments.myProgress,
    course ? { courseId: course._id } : "skip"
  ) ?? [];

  const enroll = useMutation(api.lms.enrollments.enroll);
  const unenroll = useMutation(api.lms.enrollments.unenroll);

  if (course === undefined) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (course === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Course not found</h2>
        <Link to="/lms">
          <Button variant="secondary">Back to LMS</Button>
        </Link>
      </div>
    );
  }

  const lab = LAB_MODULES.find((l) => l.id === course.labModule);
  const completedLessonIds = new Set(progress.map((p) => p.lessonId));
  const progressPercent = lessons.length > 0 ? (completedLessonIds.size / lessons.length) * 100 : 0;

  const handleEnroll = async () => {
    try {
      await enroll({ courseId: course._id });
      toast.success("Enrolled successfully!");
    } catch {
      toast.error("Failed to enroll");
    }
  };

  const handleUnenroll = async () => {
    try {
      await unenroll({ courseId: course._id });
      toast.success("Unenrolled from course");
    } catch {
      toast.error("Failed to unenroll");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Back */}
      <Link to="/lms" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to LMS
      </Link>

      {/* Hero */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center">
          {course.coverImage ? (
            <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            lab && <lab.icon className={cn("w-24 h-24", lab.color)} />
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary">Class {course.classLevel}</Badge>
            {lab && (
              <Badge variant="outline" className="bg-background/80">
                {lab.label}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-2xl leading-tight">{course.title}</h1>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{course.description}</p>
            </div>
            <div className="flex gap-2 items-center flex-shrink-0">
              {isEnrolled ? (
                <Button variant="secondary" size="sm" onClick={handleUnenroll}>
                  Unenroll
                </Button>
              ) : (
                <Button size="sm" onClick={handleEnroll}>
                  <GraduationCap className="w-4 h-4 mr-1.5" /> Enroll Now
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {course.duration && (
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
            )}
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{lessons.length} lessons</span>
            <span className="capitalize font-medium text-foreground">{course.difficulty}</span>
          </div>

          {/* Progress bar */}
          {isEnrolled && lessons.length > 0 && (
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{completedLessonIds.size}/{lessons.length} completed ({Math.round(progressPercent)}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lessons */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-3">Lessons</h2>
        <div className="space-y-2">
          {lessons.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No lessons yet.</p>
          ) : (
            lessons.map((lesson: Doc<"lessons">, idx: number) => {
              const isCompleted = completedLessonIds.has(lesson._id);
              const canAccess = isEnrolled;
              return (
                <div key={lesson._id}>
                  {idx > 0 && <Separator />}
                  <div
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      canAccess
                        ? "hover:bg-muted cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                    )}
                    onClick={() => canAccess && navigate(`/lms/courses/${slug}/lessons/${lesson._id}`)}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : canAccess ? (
                        LESSON_TYPE_ICON[lesson.type] ?? <BookOpen className="w-4 h-4" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium truncate", isCompleted && "line-through text-muted-foreground")}>
                        {idx + 1}. {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{lesson.type}{lesson.duration ? ` · ${lesson.duration} min` : ""}</p>
                    </div>
                    {isCompleted && (
                      <Badge variant="secondary" className="text-xs shrink-0">Done</Badge>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <>
      <Navbar />
      <AuthLoading>
        <div className="max-w-4xl mx-auto p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </AuthLoading>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-xl font-semibold">Sign in to view this course</h2>
          <SignInButton />
        </div>
      </Unauthenticated>
      <Authenticated>
        <CourseDetailInner slug={slug ?? ""} />
      </Authenticated>
    </>
  );
}
