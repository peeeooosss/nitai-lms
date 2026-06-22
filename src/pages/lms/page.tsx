import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { useAuth } from "@/lib/auth.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty.tsx";
import { Button } from "@/components/ui/button.tsx";
import { BookOpen, Menu, Search, SlidersHorizontal, Database } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import LmsSidebar from "./_components/LmsSidebar.tsx";
import { LAB_MODULES } from "./_components/lms-constants.ts";
import CourseCard from "./_components/CourseCard.tsx";
import Navbar from "../_components/Navbar.tsx";
import { toast } from "sonner";
import { cn } from "@/lib/utils.ts";

type SortOption = "default" | "class-asc" | "class-desc" | "title";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  labModule: string;
  classLevel: number;
  coverImage?: string;
  duration?: string;
  difficulty: string;
  published: boolean;
  order: number;
}

interface Enrollment {
  id: string;
  courseId: string;
  course: Course;
  enrolledAt: string;
}

function LabBanner({ labId }: { labId: string }) {
  const lab = LAB_MODULES.find((l) => l.id === labId);
  if (!lab || labId === "all") return null;
  const Icon = lab.icon;
  return (
    <div className="rounded-xl border border-border bg-gradient-to-r from-primary/5 via-accent/5 to-transparent p-5 flex items-center gap-4 mb-2">
      <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
        <Icon className={cn("w-6 h-6", lab.color)} />
      </div>
      <div>
        <h2 className="font-display font-bold text-xl">{lab.label}</h2>
        <p className="text-sm text-muted-foreground">Browse courses available for all class levels</p>
      </div>
    </div>
  );
}

function AdminSeedBanner() {
  const queryClient = useQueryClient();
  const seedMutation = useMutation({
    mutationFn: () => api.post<{ created: number }>("/api/courses/seed"),
    onSuccess: (data) => {
      toast.success(`Seeded ${data.created} sample courses!`);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => toast.error("Must be admin to seed courses"),
  });

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-sm">
      <Database className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
      <span className="flex-1 text-amber-800 dark:text-amber-300">No courses yet. Seed sample courses to get started.</span>
      <Button size="sm" variant="secondary" onClick={() => seedMutation.mutate()} disabled={seedMutation.isPending} className="shrink-0">
        {seedMutation.isPending ? "Seeding..." : "Seed Courses"}
      </Button>
    </div>
  );
}

function sortCourses(courses: Course[], sort: SortOption): Course[] {
  const copy = [...courses];
  if (sort === "class-asc") return copy.sort((a, b) => a.classLevel - b.classLevel || a.order - b.order);
  if (sort === "class-desc") return copy.sort((a, b) => b.classLevel - a.classLevel || a.order - b.order);
  if (sort === "title") return copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy.sort((a, b) => a.classLevel - b.classLevel || a.order - b.order);
}

function groupByClass(courses: Course[]): Map<number, Course[]> {
  const map = new Map<number, Course[]>();
  for (const c of courses) {
    const existing = map.get(c.classLevel) ?? [];
    existing.push(c);
    map.set(c.classLevel, existing);
  }
  return map;
}

function DashboardInner() {
  const [selectedLab, setSelectedLab] = useState("all");
  const [selectedClass, setSelectedClass] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const { data: allCourses = [], isLoading } = useQuery({
    queryKey: ["courses", selectedLab, selectedClass],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedLab !== "all") params.set("labModule", selectedLab);
      if (selectedClass !== 0) params.set("classLevel", String(selectedClass));
      return api.get<Course[]>(`/api/courses?${params}`);
    },
  });

  const { data: myEnrollments = [] } = useQuery({
    queryKey: ["myEnrollments"],
    queryFn: () => api.get<Enrollment[]>("/api/enrollments/my"),
    enabled: !!user,
  });

  const enrolledCourseIds = new Set(myEnrollments.map((e: Enrollment) => e.courseId));

  const filtered = allCourses.filter((c: Course) =>
    search.trim() === "" ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = sortCourses(filtered, sort);
  const classGroups = groupByClass(sorted);
  const groupedView = selectedClass === 0 && classGroups.size > 1 && search.trim() === "";

  const enrolledCourses = myEnrollments
    .filter((e: Enrollment) => e.course)
    .map((e: Enrollment) => e.course);

  const showSeedBanner = !isLoading && allCourses.length === 0;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200",
          "md:relative md:translate-x-0 md:w-64 md:flex-shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <LmsSidebar
          selectedLab={selectedLab}
          selectedClass={selectedClass}
          onSelectLab={(l) => { setSelectedLab(l); setSidebarOpen(false); }}
          onSelectClass={(c) => { setSelectedClass(c); setSidebarOpen(false); }}
          className="h-full"
        />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b bg-background">
          <button
            className="md:hidden p-1.5 rounded-md hover:bg-muted cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-40 h-9 text-sm hidden sm:flex">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="class-asc">Class: Low → High</SelectItem>
                <SelectItem value="class-desc">Class: High → Low</SelectItem>
                <SelectItem value="title">Title A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
          {showSeedBanner && <AdminSeedBanner />}

          {enrolledCourses.length > 0 && !search && selectedLab === "all" && selectedClass === 0 && (
            <section>
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> My Courses
                <span className="text-sm font-normal text-muted-foreground ml-1">({enrolledCourses.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {enrolledCourses.map((course: Course) => (
                  <CourseCard key={course.id} course={course} enrolled={true} />
                ))}
              </div>
            </section>
          )}

          <LabBanner labId={selectedLab} />

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg">
                {selectedLab === "all" ? "All Courses" : LAB_MODULES.find(l => l.id === selectedLab)?.label ?? "Courses"}
                {selectedClass !== 0 && ` — Class ${selectedClass}`}
              </h2>
              <span className="text-sm text-muted-foreground">{filtered.length} course{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 && !showSeedBanner ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon"><BookOpen /></EmptyMedia>
                  <EmptyTitle>No courses found</EmptyTitle>
                  <EmptyDescription>
                    {search ? "Try a different search term." : "No courses available for this filter yet."}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : groupedView ? (
              <div className="space-y-8">
                {Array.from(classGroups.entries())
                  .sort(([a], [b]) => a - b)
                  .map(([classLevel, courses]) => (
                    <div key={classLevel}>
                      <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {classLevel}
                        </span>
                        Class {classLevel}
                        <span className="text-xs text-muted-foreground font-normal">({courses.length} courses)</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {courses.map((course: Course) => (
                          <CourseCard
                            key={course.id}
                            course={course}
                            enrolled={enrolledCourseIds.has(course.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sorted.map((course: Course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrolled={enrolledCourseIds.has(course.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function LmsDashboard() {
  const { user, isLoading } = useAuth();

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-16 w-64" />
        </div>
      ) : !user ? (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-center">NITAI Learning Management System</h1>
          <p className="text-muted-foreground text-center max-w-sm">
            Sign in to access class-wise lab courses and track your learning progress.
          </p>
          <SignInButton />
        </div>
      ) : (
        <DashboardInner />
      )}
    </>
  );
}
