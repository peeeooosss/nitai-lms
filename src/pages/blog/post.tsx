import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { motion } from "motion/react";
import { api } from "@/convex/_generated/api.js";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Clock, Calendar, ArrowLeft, Tag, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const CATEGORY_COLORS: Record<string, string> = {
  "Lab Launches": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Teacher Training": "bg-green-500/10 text-green-500 border-green-500/20",
  "Student Achievements": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Industry News": "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

function formatDate(iso: string) {
  try {
    return format(new Date(iso), "MMMM d, yyyy");
  } catch {
    return iso;
  }
}

// Very simple markdown renderer for headings, bold, italic, lists, and paragraphs
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseInline = (text: string): React.ReactNode => {
    // Handle links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const italicRegex = /\*([^*]+)\*/g;

    let result = text;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const combined = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let match;

    while ((match = combined.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      if (match[1] && match[2]) {
        // Link
        const href = match[2];
        if (href.startsWith("/")) {
          parts.push(<Link key={match.index} to={href} className="text-primary hover:underline">{match[1]}</Link>);
        } else {
          parts.push(<a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{match[1]}</a>);
        }
      } else if (match[3]) {
        parts.push(<strong key={match.index} className="font-semibold text-foreground">{match[3]}</strong>);
      } else if (match[4]) {
        parts.push(<em key={match.index}>{match[4]}</em>);
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Suppress unused variable warnings
    void result;
    void linkRegex;
    void boldRegex;
    void italicRegex;

    return parts.length > 0 ? parts : text;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{parseInline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{parseInline(line.slice(3))}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="font-display text-3xl font-bold text-foreground mt-10 mb-4">{parseInline(line.slice(2))}</h1>);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-primary pl-5 py-1 my-6 italic text-muted-foreground bg-primary/5 rounded-r-lg pr-5">
          {parseInline(line.slice(2))}
        </blockquote>
      );
    } else if (line.match(/^[*-] /)) {
      // Collect consecutive list items
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[*-] /)) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">
          {listItems.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      // Ordered list
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1.5 my-4 text-muted-foreground">
          {listItems.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      // Skip blank lines
    } else {
      elements.push(<p key={i} className="text-muted-foreground leading-relaxed mb-4">{parseInline(line)}</p>);
    }
    i++;
  }

  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const seedPosts = useMutation(api.posts.seed);
  const post = useQuery(api.posts.getBySlug, slug ? { slug } : "skip");
  const allPosts = useQuery(api.posts.list, {});

  useEffect(() => {
    seedPosts().catch(() => {/* silently ignore */});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Related posts (same category, excluding current)
  const related = allPosts?.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3) ?? [];

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-20 space-y-6">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">This article may have been moved or removed.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-0">
        {post.coverImage && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}
      </section>

      {/* Article */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                {post.category}
              </span>
              {post.publishedAt && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.readingTime && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pb-8 mb-8 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{post.author}</div>
                {post.authorRole && <div className="text-xs text-muted-foreground">{post.authorRole}</div>}
              </div>
            </div>

            {/* Content */}
            <div className="prose-custom">
              {renderMarkdown(post.content)}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={`/blog/${p.slug}`} className="group block">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                      {p.coverImage && (
                        <div className="h-40 overflow-hidden">
                          <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                        <span className="text-xs text-primary flex items-center gap-1 font-semibold">
                          Read more <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Ready to Bring AI to Your School?</h2>
          <p className="text-muted-foreground mb-6">Partner with NITAI AI Lab and transform your institution's future.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="ghost" className="font-semibold border border-border" asChild>
              <Link to="/blog">More Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
