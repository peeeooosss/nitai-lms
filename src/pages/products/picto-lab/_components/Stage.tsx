import type { SpriteState } from "../_lib/engine.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../_lib/engine.ts";

type StageProps = {
  sprite: SpriteState;
};

export default function Stage({ sprite }: StageProps) {
  return (
    <div className="flex flex-col h-full bg-card rounded-xl border overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/50">
        <h3 className="text-sm font-semibold text-foreground">Stage</h3>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="relative rounded-xl border-2 border-dashed border-border overflow-hidden"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)",
          }}
        >
          {/* Grid lines for fun */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Speech bubble */}
          {sprite.message && (
            <div
              className="absolute z-20 bg-white rounded-xl px-3 py-1.5 shadow-lg text-sm font-medium text-foreground border"
              style={{
                left: sprite.x + 20,
                top: sprite.y - 50,
                transform: "translateX(-50%)",
              }}
            >
              {sprite.message}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r rotate-45" />
            </div>
          )}

          {/* Sprite character */}
          <div
            className="absolute z-10 transition-all duration-300 ease-out"
            style={{
              left: sprite.x,
              top: sprite.y,
              transform: `translate(-50%, -50%) rotate(${sprite.rotation}deg) scale(${sprite.scale}) ${sprite.isJumping ? "translateY(-30px)" : ""}`,
            }}
          >
            <div
              className={`relative ${sprite.isSpinning ? "animate-spin" : ""}`}
            >
              {/* Cat body */}
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Body */}
                <ellipse cx="25" cy="30" rx="15" ry="14" fill={sprite.color} />
                {/* Head */}
                <circle cx="25" cy="16" r="11" fill={sprite.color} />
                {/* Ears */}
                <polygon points="16,8 14,0 21,6" fill={sprite.color} />
                <polygon points="34,8 36,0 29,6" fill={sprite.color} />
                {/* Eyes */}
                <circle cx="21" cy="14" r="3" fill="white" />
                <circle cx="29" cy="14" r="3" fill="white" />
                <circle cx="22" cy="14" r="1.5" fill="#333" />
                <circle cx="30" cy="14" r="1.5" fill="#333" />
                {/* Nose */}
                <ellipse cx="25" cy="18" rx="1.5" ry="1" fill="#FF8C8C" />
                {/* Whiskers */}
                <line x1="12" y1="17" x2="19" y2="18" stroke="#333" strokeWidth="0.5" />
                <line x1="12" y1="20" x2="19" y2="19" stroke="#333" strokeWidth="0.5" />
                <line x1="38" y1="17" x2="31" y2="18" stroke="#333" strokeWidth="0.5" />
                <line x1="38" y1="20" x2="31" y2="19" stroke="#333" strokeWidth="0.5" />
                {/* Tail */}
                <path d="M38 35 Q45 30 42 22" stroke={sprite.color} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Ground line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-400/30" />
        </div>
      </div>
    </div>
  );
}
