import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Weekly Brief" },
  { path: "/pipeline", label: "Pipeline Preview" },
  { path: "/phase", label: "Phase Map" },
  { path: "/weekly", label: "Weekly Check-ins" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="px-8 py-10">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          illuminate<span className="text-primary">.</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "block px-4 py-3 text-sm transition-colors duration-200",
                    isActive
                      ? "text-foreground bg-sidebar-accent"
                      : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-8 py-8">
        <p className="label-tracked text-muted-foreground">Executive Console</p>
      </div>
    </aside>
  );
}
