import { useState } from "react";
import { motion } from "motion/react";
import { useQuery, useMutation } from "convex/react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  Inbox, CheckCheck, MessageSquareReply, Building2, GraduationCap,
  BarChart3, Search, Filter, Mail, Phone, Calendar, ShieldCheck, Landmark, Users
} from "lucide-react";
import { format } from "date-fns";
import type { Id } from "@/convex/_generated/dataModel.d.ts";

const STATUS_OPTIONS = ["all", "new", "read", "replied"];
const ORG_OPTIONS = ["all", "school", "college", "university", "other"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  read: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  replied: "bg-green-500/10 text-green-600 border-green-500/20",
};

const ORG_ICONS: Record<string, React.ReactNode> = {
  school: <Building2 className="w-4 h-4" />,
  college: <GraduationCap className="w-4 h-4" />,
  university: <Landmark className="w-4 h-4" />,
  other: <Users className="w-4 h-4" />,
};

function formatTs(ms: number) {
  try { return format(new Date(ms), "MMM d, yyyy · h:mm a"); } catch { return ""; }
}

function AdminDashboardInner() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<Id<"inquiries"> | null>(null);

  const makeAdmin = useMutation(api.inquiries.makeAdmin);
  const updateStatus = useMutation(api.inquiries.updateStatus);

  const inquiries = useQuery(api.inquiries.listAdmin, {
    status: statusFilter !== "all" ? statusFilter : undefined,
    organizationType: orgFilter !== "all" ? orgFilter : undefined,
  });
  const statsData = useQuery(api.inquiries.stats, {});

  const handleMakeAdmin = async () => {
    if (!user?.profile.sub) return;
    try {
      // tokenIdentifier is not directly available from useAuth, we use the Convex identity
      await makeAdmin({ tokenIdentifier: user.profile.sub });
      toast.success("You are now an admin!");
    } catch (err) {
      if (err instanceof ConvexError) {
        const d = err.data as { message: string };
        // Try via window prompt workaround — user's tokenIdentifier is the sub with issuer prefix
        toast.error(d.message);
      } else {
        toast.error("Could not grant admin access. Please check the Convex dashboard.");
      }
    }
  };

  const handleStatus = async (id: Id<"inquiries">, status: string) => {
    try {
      await updateStatus({ id, status });
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Not admin — show setup prompt
  if (inquiries === null) {
    return (
      <div className="max-w-2xl mx-auto py-32 px-4 text-center">
        <ShieldCheck className="w-14 h-14 text-primary mx-auto mb-5" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">Admin Access Required</h1>
        <p className="text-muted-foreground mb-6">
          You must be an admin to view this dashboard. If you are the site owner, click the button below to grant yourself admin access.
        </p>
        <p className="text-sm text-muted-foreground mb-8 bg-muted/40 rounded-xl px-4 py-3">
          Signed in as: <strong>{user?.profile.email ?? user?.profile.name ?? "Unknown"}</strong>
        </p>
        <Button size="lg" className="font-semibold" onClick={handleMakeAdmin}>
          Grant Admin Access to Myself
        </Button>
      </div>
    );
  }

  const filtered = (inquiries ?? []).filter((inq) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.organization.toLowerCase().includes(q) ||
      inq.subject.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q)
    );
  });

  const selected = filtered.find((i) => i._id === selectedId) ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Inbox className="w-6 h-6 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Inquiries Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Manage all contact form submissions from schools, colleges, and universities.</p>
      </div>

      {/* Stats */}
      {statsData === undefined ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
      ) : statsData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Inquiries", value: statsData.total, icon: <Inbox className="w-5 h-5" />, color: "from-primary to-cyan-500" },
            { label: "New", value: statsData.byStatus.new, icon: <Inbox className="w-5 h-5" />, color: "from-blue-500 to-blue-400" },
            { label: "Read", value: statsData.byStatus.read, icon: <CheckCheck className="w-5 h-5" />, color: "from-yellow-500 to-amber-400" },
            { label: "Replied", value: statsData.byStatus.replied, icon: <MessageSquareReply className="w-5 h-5" />, color: "from-green-500 to-emerald-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center flex-shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Breakdown by type */}
      {statsData && statsData.total > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(statsData.byType).map(([type, count]) => (
            <div key={type} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-full border border-border text-xs font-medium text-muted-foreground capitalize">
              {ORG_ICONS[type] ?? <Building2 className="w-4 h-4" />}
              {type}: {count}
            </div>
          ))}
        </div>
      )}

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, org, subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Status:</span>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer capitalize ${statusFilter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/30"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Type:</span>
          {ORG_OPTIONS.map((o) => (
            <button
              key={o}
              onClick={() => setOrgFilter(o)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer capitalize ${orgFilter === o ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/30"}`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Table + Detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {inquiries === undefined ? (
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No inquiries match your filters.</p>
            </div>
          ) : (
            filtered.map((inq, i) => (
              <motion.div
                key={inq._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <button
                  onClick={() => { setSelectedId(inq._id); handleStatus(inq._id, inq.status === "new" ? "read" : inq.status); }}
                  className={`w-full text-left bg-card border rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer ${selectedId === inq._id ? "border-primary/50 ring-1 ring-primary/20" : "border-border"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-foreground text-sm truncate">{inq.name}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[inq.status] ?? ""}`}>
                          {inq.status}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                          {ORG_ICONS[inq.organizationType]}
                          {inq.organizationType}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-foreground/80 mb-1 truncate">{inq.subject}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {inq.email}
                        <span>·</span>
                        <Calendar className="w-3 h-3" /> {formatTs(inq._creationTime)}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_STYLES[selected.status] ?? ""}`}>
                  {selected.status}
                </span>
                <span className="text-xs text-muted-foreground">{formatTs(selected._creationTime)}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">{selected.name}</h3>
              <p className="text-sm text-primary font-medium mb-4">{selected.organization} <span className="text-muted-foreground capitalize">({selected.organizationType})</span></p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4 text-primary" />{selected.email}</div>
                {selected.phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4 text-primary" />{selected.phone}</div>}
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Subject</div>
                <div className="text-sm font-medium text-foreground">{selected.subject}</div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Message</div>
                <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 rounded-xl p-3">{selected.message}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {["new", "read", "replied"].map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selected.status === s ? "default" : "ghost"}
                      className={`capitalize text-xs border ${selected.status !== s ? "border-border" : ""}`}
                      onClick={() => handleStatus(selected._id, s)}
                    >
                      {s === "new" && <Inbox className="w-3 h-3 mr-1" />}
                      {s === "read" && <CheckCheck className="w-3 h-3 mr-1" />}
                      {s === "replied" && <MessageSquareReply className="w-3 h-3 mr-1" />}
                      {s}
                    </Button>
                  ))}
                </div>
                <Button size="sm" className="w-full mt-3" asChild>
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}>
                    <Mail className="w-4 h-4 mr-2" /> Reply via Email
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
              <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AuthLoading>
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
          </div>
        </div>
      </AuthLoading>
      <Unauthenticated>
        <div className="max-w-xl mx-auto px-4 py-32 text-center">
          <ShieldCheck className="w-14 h-14 text-primary mx-auto mb-5" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Admin Access Required</h1>
          <p className="text-muted-foreground mb-8">Please sign in to access the admin dashboard.</p>
          <SignInButton />
        </div>
      </Unauthenticated>
      <Authenticated>
        <AdminDashboardInner />
      </Authenticated>
      <Footer />
    </div>
  );
}
