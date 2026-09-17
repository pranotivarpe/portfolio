import { generateSprites } from "@/lib/ambience";

/** Signal lights scattered the length of the page, drifting gently in place */
export default function CityLights({ count = 50 }: { count?: number }) {
  const sprites = generateSprites(count);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {sprites.map((s) => (
        <span
          key={s.id}
          className="ambient-sprite rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${3 + s.size * 4}px`,
            height: `${3 + s.size * 4}px`,
            background: "var(--signal)",
            boxShadow: "0 0 9px 2px var(--signal)",
            ["--sprite-duration" as string]: `${s.duration}s`,
            ["--sprite-delay" as string]: `${s.delay}s`,
            ["--sprite-drift" as string]: `${s.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
