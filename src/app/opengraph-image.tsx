import { ImageResponse } from "next/og";

export const alt = "Pranoti Varpe, Full-Stack Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview shown on LinkedIn, WhatsApp, X, etc. Matches the night transit map.
export default function Image() {
  const lines: { color: string; y: number; stations: number[] }[] = [
    { color: "#5b8dff", y: 480, stations: [140, 420, 760, 1050] },
    { color: "#34d399", y: 540, stations: [220, 540, 880] },
    { color: "#ff6b5e", y: 90, stations: [180, 460, 900, 1120] },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #10141f 0%, #0c111c 100%)",
          color: "#e7ebf3",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {lines.map((line) => (
            <g key={line.y}>
              <line x1={0} y1={line.y} x2={1200} y2={line.y} stroke={line.color} strokeWidth={5} opacity={0.7} />
              {line.stations.map((x) => (
                <circle key={x} cx={x} cy={line.y} r={9} fill="#0c111c" stroke={line.color} strokeWidth={4} />
              ))}
            </g>
          ))}
          <circle cx={600} cy={480} r={13} fill="#ffb020" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3 }}>Pranoti Varpe</div>
          <div style={{ fontSize: 38, marginTop: 12, color: "#5b8dff" }}>
            Full-Stack Software Developer
          </div>
          <div style={{ fontSize: 26, marginTop: 28, color: "#8b95ab" }}>
            React, Node.js, Java Spring Boot, PostgreSQL. Pune, India
          </div>
        </div>
      </div>
    ),
    size
  );
}
