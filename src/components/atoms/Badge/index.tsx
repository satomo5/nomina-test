import "./style.scss";

type BadgeProps = {
  variant?: "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
};

function Badge({ variant = "info", children }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export default Badge;
