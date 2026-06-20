import { useState } from "react";
import { BLOCKS, BLOCK_CATEGORIES, type BlockCategory, type BlockDefinition } from "../_lib/blocks.ts";

type BlockPaletteProps = {
  onBlockDragStart: (block: BlockDefinition) => void;
};

export default function BlockPalette({ onBlockDragStart }: BlockPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>("motion");

  const filteredBlocks = BLOCKS.filter((b) => b.category === activeCategory);

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border overflow-hidden">
      {/* Category tabs */}
      <div className="grid grid-cols-2 gap-1 p-2 border-b bg-muted/50">
        {BLOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`cursor-pointer flex items-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? "text-white shadow-md"
                : "bg-transparent text-muted-foreground hover:bg-muted"
            }`}
            style={
              activeCategory === cat.id
                ? { backgroundColor: cat.color }
                : undefined
            }
          >
            <span className="text-sm">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Blocks list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredBlocks.map((block) => (
          <div
            key={block.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/picto-block", block.id);
              onBlockDragStart(block);
            }}
            className="cursor-grab active:cursor-grabbing flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] select-none"
            style={{ backgroundColor: block.color }}
          >
            <span className="text-xl">{block.icon}</span>
            <span>{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
