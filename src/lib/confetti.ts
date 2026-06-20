type ConfettiOptions = {
  count?: number;
  spread?: number;
  colors?: string[];
};

const DEFAULT_COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#EF4444", "#6366F1"];

export function fireConfetti({ count = 50, spread = 120, colors = DEFAULT_COLORS }: ConfettiOptions = {}) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
  }[] = [];

  const angle = (Math.PI / 180) * spread;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < count; i++) {
    const randomAngle = -angle / 2 + Math.random() * angle;
    const power = Math.random() * 8 + 2;
    particles.push({
      x: centerX + (Math.random() - 0.5) * 200,
      y: centerY - 100 + Math.random() * 100,
      vx: Math.cos(randomAngle) * power * (Math.random() * 0.5 + 0.5),
      vy: Math.sin(randomAngle) * power * (Math.random() * 0.5 + 0.5) - 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  let frame = 0;
  const maxFrames = 120;

  function animate() {
    frame++;
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

    let alive = false;
    for (const p of particles) {
      if (p.opacity <= 0) continue;
      alive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - frame / maxFrames);

      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate((p.rotation * Math.PI) / 180);
      ctx!.globalAlpha = p.opacity;
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx!.restore();
    }

    if (alive && frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas!);
    }
  }

  animate();
}
