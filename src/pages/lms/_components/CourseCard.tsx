import { cn } from "@/lib/utils.ts";
import { Clock, BookOpen, GraduationCap, Signal, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth.tsx";
import { LAB_MODULES } from "./lms-constants.ts";

type Props = {
  course: any;
  enrolled?: boolean;
  progressPercent?: number;
};

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function CourseCard({ course, enrolled, progressPercent }: Props) {
  const lab = LAB_MODULES.find((l) => l.id === course.labModule);
  const Icon = lab?.icon ?? BookOpen;
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const enrollMutation = useMutation({
    mutationFn: () => api.post(`/api/enrollments/enroll/${course.id}`),
    onSuccess: () => {
      toast.success("Enrolled! Start learning now.");
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    },
    onError: () => toast.error("Failed to enroll"),
  });

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Sign in to enroll");
      return;
    }
    enrollMutation.mutate();
  };

  return (
    <Link
      to={`/lms/courses/${course.slug}`}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-200"
    >
      <div className="relative h-36 overflow-hidden flex-shrink-0">
        {course.coverImage ? (
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20">
            <Icon className={cn("w-14 h-14", lab?.color ?? "text-primary")} />
          </div>
        )}
        {enrolled && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> Enrolled
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="text-xs font-semibold">
            Class {course.classLevel}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 space-y-2">
        <div className="flex-1 space-y-1.5">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            {course.duration && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {course.duration}
              </span>
            )}
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium capitalize", DIFFICULTY_COLOR[course.difficulty] ?? "bg-muted text-muted-foreground")}>
              {course.difficulty}
            </span>
          </div>
        </div>

        {enrolled && progressPercent !== undefined && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span className="flex items-center gap-1"><Signal className="w-3 h-3" /> Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {!enrolled && (
          <Button
            size="sm"
            className="w-full mt-1 text-xs h-7"
            onClick={handleEnroll}
            disabled={enrollMutation.isPending}
          >
            <GraduationCap className="w-3 h-3 mr-1" /> Enroll Free
          </Button>
        )}

        {enrolled && progressPercent === 100 && (
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </div>
        )}
      </div>
    </Link>
  );
}
