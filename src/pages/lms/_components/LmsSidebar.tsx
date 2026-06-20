import { cn } from "@/lib/utils.ts";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { BookOpen } from "lucide-react";
import { LAB_MODULES, CLASS_LEVELS } from "./lms-constants.ts";

type Props = {
  selectedLab: string;
  selectedClass: number;
  onSelectLab: (lab: string) => void;
  onSelectClass: (cls: number) => void;
  className?: string;
};

export default function LmsSidebar({ selectedLab, selectedClass, onSelectLab, onSelectClass, className }: Props) {
  return (
    <aside className={cn("flex flex-col bg-sidebar text-sidebar-foreground h-full", className)}>
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <Link to="/lms" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-sm leading-none">NITAI LMS</p>
            <p className="text-xs text-sidebar-foreground/60 mt-0.5">Learning Platform</p>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-5">
          {/* Class Filter */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-2 mb-2">
              Class Level
            </p>
            <div className="flex flex-wrap gap-1.5 px-1">
              {CLASS_LEVELS.map((cls) => (
                <button
                  key={cls.value}
                  onClick={() => onSelectClass(cls.value)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
                    selectedClass === cls.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-sidebar-accent text-sidebar-foreground/70 hover:bg-sidebar-accent/80"
                  )}
                >
                  {cls.value === 0 ? "All" : cls.value}
                </button>
              ))}
            </div>
          </div>

          {/* Lab Filter */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-2 mb-1">
              Lab Modules
            </p>
            {LAB_MODULES.map((lab) => {
              const Icon = lab.icon;
              const active = selectedLab === lab.id;
              return (
                <button
                  key={lab.id}
                  onClick={() => onSelectLab(lab.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-sidebar-primary-foreground" : lab.color)} />
                  <span className="truncate">{lab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
