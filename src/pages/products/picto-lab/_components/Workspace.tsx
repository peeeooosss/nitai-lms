import { type PlacedBlock, getBlockDef } from "../_lib/blocks.ts";
import { Trash2 } from "lucide-react";

type WorkspaceProps = {
  blocks: PlacedBlock[];
  onDrop: (blockId: string) => void;
  onRemove: (instanceId: string) => void;
  onParamChange: (instanceId: string, paramName: string, value: number | string) => void;
  isRunning: boolean;
};

export default function Workspace({ blocks, onDrop, onRemove, onParamChange, isRunning }: WorkspaceProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData("application/picto-block");
    if (blockId) {
      onDrop(blockId);
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-card rounded-xl border overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="px-4 py-3 border-b bg-muted/50">
        <h3 className="text-sm font-semibold text-foreground">My Program</h3>
        <p className="text-xs text-muted-foreground">Drag blocks here to build your code!</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {blocks.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <p className="text-4xl mb-3">🎯</p>
              <p className="text-sm text-muted-foreground font-medium">
                Drag blocks from the left panel and drop them here!
              </p>
            </div>
          </div>
        ) : (
          blocks.map((placed, index) => {
            const def = getBlockDef(placed.blockId);
            if (!def) return null;
            return (
              <div
                key={placed.instanceId}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-white text-sm font-medium shadow-sm group transition-all"
                style={{ backgroundColor: def.color }}
              >
                <span className="text-xs font-bold bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-lg">{def.icon}</span>
                <span className="flex-1">{def.label}</span>

                {/* Inline param editing */}
                {def.params?.map((param) => (
                  <div key={param.name} className="flex items-center gap-1">
                    {param.type === "number" ? (
                      <input
                        type="number"
                        value={placed.params[param.name] as number}
                        onChange={(e) =>
                          onParamChange(placed.instanceId, param.name, Number(e.target.value))
                        }
                        className="w-12 px-1.5 py-0.5 rounded-md bg-white/20 text-white text-xs text-center border-none outline-none focus:bg-white/30"
                        disabled={isRunning}
                      />
                    ) : param.type === "select" ? (
                      <select
                        value={placed.params[param.name] as string}
                        onChange={(e) =>
                          onParamChange(placed.instanceId, param.name, e.target.value)
                        }
                        className="px-1.5 py-0.5 rounded-md bg-white/20 text-white text-xs border-none outline-none cursor-pointer"
                        disabled={isRunning}
                      >
                        {param.options?.map((opt) => (
                          <option key={opt} value={opt} className="text-black">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}

                <button
                  onClick={() => onRemove(placed.instanceId)}
                  className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/20"
                  disabled={isRunning}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
