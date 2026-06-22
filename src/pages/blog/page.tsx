import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api.ts";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Clock, Calendar, ChevronRight, Search, Newspaper } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { format } from "date-fns";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty.tsx";

const CATEGORIES = ["All", "Lab Launches", "Teacher Training", "Student Achievements", "Industry News"];

const CATEGORY_COLORS: Record<string, string> = {
  "Lab Launches": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Teacher Training": "bg-green-500/10 text-green-500 border-green-500/20",
  "Student Achievements": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Industry News": "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

function formatDate(iso: string) {
  try {
    return format(new Date(iso), "MMM d, yyyy");
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const seedMutation = useMutation({
    mutationFn: () => api.post("/api/posts/seed"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", activeCategory],
    queryFn: () => {
      const params = activeCategory !== "All" ? `?category=${encodeURIComponent(activeCategory)}` : "";
      return api.get<any[]>(`/api/posts${params}`);
    },
  });

  useEffect(() => {
    seedMutation.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = posts.filter((p: any) =>
    search.trim() === "" ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    (p.tags || []).some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: "40px 40px" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6 uppercase tracking-widest">
              Blog & News
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Stories from the{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                AI Lab
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Lab launches, teacher spotlights, student innovations, and the latest in AI education.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-80 w-full rounded-3xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon"><Newspaper /></EmptyMedia>
                <EmptyTitle>No articles found</EmptyTitle>
                <EmptyDescription>
                  {search ? "Try a different search term." : "No articles in this category yet."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <>
              {featured && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                  <Link to={`/blog/${featured.slug}`} className="group block">
                    <div className="relative bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                      {featured.coverImage && (
                        <div className="relative h-64 md:h-80 overflow-hidden">
                          <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-card/90 backdrop-blur-sm text-foreground">Featured</span>
                          </div>
                        </div>
                      )}
                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLORS[featured.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                            {featured.category}
                          </span>
                          {featured.publishedAt && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featured.publishedAt)}</span>
                          )}
                          {featured.readingTime && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readingTime} min read</span>
                          )}
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{featured.author}</span>
                          <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ChevronRight className="w-4 h-4" /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post: any, i: number) => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                      <Link to={`/blog/${post.slug}`} className="group block h-full">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col">
                          {post.coverImage && (
                            <div className="h-44 overflow-hidden">
                              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                          )}
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                                {post.category}
                              </span>
                              {post.readingTime && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
                              )}
                            </div>
                            <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                              <span className="text-xs text-muted-foreground">{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Read <ChevronRight className="w-3 h-3" /></span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-3xl p-10"
          >
            <Newspaper className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-6">Get the latest AI education news, lab launches, and student stories delivered to your inbox.</p>
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Subscribe to Updates</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
