import { cn } from "@/lib/utils";

interface MetricGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  clickable?: boolean;
}

export function MetricGroup({ title, children, className, onClick, clickable }: MetricGroupProps) {
  return (
    <section 
      className={cn(
        "space-y-8 p-8 bg-card border border-border transition-colors duration-200",
        clickable && "cursor-pointer hover:border-primary/30",
        className
      )}
      onClick={onClick}
    >
      <h3 className="label-tracked">{title}</h3>
      <div className="grid grid-cols-3 gap-8">
        {children}
      </div>
    </section>
  );
}
