/** A simple side-view train — reused wherever something needs to ride the tracks */
export default function TrainIcon({
  className = "",
  bodyColor = "currentColor",
  windowColor = "var(--background)",
}: {
  className?: string;
  bodyColor?: string;
  windowColor?: string;
}) {
  return (
    <svg viewBox="0 0 64 36" width="64" height="36" className={className} aria-hidden="true">
      <rect x="2" y="12" width="42" height="16" rx="6" fill={bodyColor} />
      <rect x="36" y="4" width="22" height="24" rx="7" fill={bodyColor} />
      <rect x="43" y="9" width="10" height="9" rx="2" fill={windowColor} />
      <rect x="10" y="17" width="11" height="7" rx="1.5" fill={windowColor} />
      <circle cx="57.5" cy="15" r="2.4" fill="var(--signal)" />
      <circle cx="14" cy="30" r="5" fill={bodyColor} />
      <circle cx="34" cy="30" r="5" fill={bodyColor} />
      <circle cx="52" cy="30" r="5" fill={bodyColor} />
      <circle cx="14" cy="30" r="1.6" fill={windowColor} />
      <circle cx="34" cy="30" r="1.6" fill={windowColor} />
      <circle cx="52" cy="30" r="1.6" fill={windowColor} />
    </svg>
  );
}
