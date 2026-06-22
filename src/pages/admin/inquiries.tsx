import { useState } from "react";
import { motion } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { useAuth } from "@/lib/auth.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import Navbar from "@/pages/_components/Navbar.tsx";
import Footer from "@/pages/_components/Footer.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "sonner";
import {
  Inbox, CheckCheck, MessageSquareReply, Building2, GraduationCap,
  BarChart3, Search, Filter, Mail, Phone, Calendar, ShieldCheck, Landmark, Users
} from "lucide-react";
import { format } from "date-fns";

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

function formatTs(iso: string) {
  try { return format(new Date(iso), "MMM d, yyyy · h:mm a"); } catch { return ""; }
}

function AdminDashboardInner() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const makeAdminMutation = useMutation({
    mutationFn: () => api.post("/api/inquiries/make-admin"),
    onSuccess: () => toast.success("You are now an admin!"),
    onError: () => toast.error("Could not grant admin access"),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => api.patch(`/api/inquiries/${id}/status`, { status }),
    onSuccess: (_data, vars) => {
      toast.success(`Marked as ${vars.status}`);
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["inquiry-stats"] });
    },
    onError: () => toast.error("Failed to update status"),
  });

  const { data: inquiries } = useQuery({
    queryKey: ["inquiries", statusFilter, orgFilter],
    queryFn: () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (orgFilter !== "all") params.set("organizationType", orgFilter);
      return api.get<any[]>(`/api/inquiries/admin?${params}`);
    },
  });

  const { data: statsData } = useQuery({
    queryKey: ["inquiry-stats"],
    queryFn: () => api.get<any>("/api/inquiries/stats"),
  });

  const handleMakeAdmin = async () => {
    makeAdminMutation.mutate();
  };

  const handleStatus = (id: string, status: string) => {
    statusMutation.mutate({ id, status });
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
          Signed in as: <strong>{user?.email ?? user?.name ?? "Unknown"}</strong>
        </p>
        <Button size="lg" className="font-semibold" onClick={handleMakeAdmin}>
          Grant Admin Access to Myself
        </Button>
      </div>
    );
  }

  const filtered = (inquiries ?? []).filter((inq: any) => {
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

  const selected = filtered.find((i: any) => i.id === selectedId) ?? null;

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
                key={inq.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <button
                  onClick={() => { setSelectedId(inq.id); handleStatus(inq.id, inq.status === "new" ? "read" : inq.status); }}
                  className={`w-full text-left bg-card border rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer ${selectedId === inq.id ? "border-primary/50 ring-1 ring-primary/20" : "border-border"}`}
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
                        <Calendar className="w-3 h-3" /> {formatTs(inq.createdAt)}
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
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_STYLES[selected.status] ?? ""}`}>
                  {selected.status}
                </span>
                <span className="text-xs text-muted-foreground">{formatTs(selected.createdAt)}</span>
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
                      onClick={() => handleStatus(selected.id, s)}
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
  const { user, isLoading } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
          </div>
        </div>
      ) : !user ? (
        <div className="max-w-xl mx-auto px-4 py-32 text-center">
          <ShieldCheck className="w-14 h-14 text-primary mx-auto mb-5" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Admin Access Required</h1>
          <p className="text-muted-foreground mb-8">Please sign in to access the admin dashboard.</p>
          <SignInButton />
        </div>
      ) : (
        <AdminDashboardInner />
      )}
      <Footer />
    </div>
  );
}
