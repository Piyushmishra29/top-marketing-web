import { STAR_PATH, STAR_VIEWBOX } from "@/lib/star";

export default function Star({
  className,
  style,
  title,
}: {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox={STAR_VIEWBOX}
      className={className}
      style={style}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      <path d={STAR_PATH} />
    </svg>
  );
}
